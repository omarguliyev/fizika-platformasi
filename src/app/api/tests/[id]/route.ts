import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("az-AZ").replace(/\s+/g, " ")
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (session?.user?.role !== "user") {
    return NextResponse.json({ error: "Testə başlamaq üçün daxil olun." }, { status: 401 })
  }
  const { id } = await params
  const test = await prisma.test.findFirst({
    where: { resourceId: id, resource: { isActive: true, resourceType: "TEST" } },
    select: { id: true, instructions: true, timeLimit: true, resource: { select: { id: true, title: true } }, questions: { orderBy: { order: "asc" }, select: { id: true, text: true, questionType: true, points: true, order: true, options: { orderBy: { order: "asc" }, select: { id: true, text: true, order: true } } } } },
  })
  if (!test) return NextResponse.json({ error: "Test tapılmadı." }, { status: 404 })
  return NextResponse.json(test)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession()
  if (session?.user?.role !== "user") return NextResponse.json({ error: "Testi göndərmək üçün daxil olun." }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const submitted = body.answers as Record<string, unknown>
  if (!submitted || typeof submitted !== "object") return NextResponse.json({ error: "Cavablar düzgün göndərilməyib." }, { status: 400 })

  const test = await prisma.test.findFirst({ where: { resourceId: id, resource: { isActive: true } }, include: { questions: { include: { options: true }, orderBy: { order: "asc" } } } })
  if (!test) return NextResponse.json({ error: "Test tapılmadı." }, { status: 404 })

  let score = 0
  let correctCount = 0
  const answers = test.questions.map((question) => {
    const raw = submitted[question.id]
    let isCorrect = false
    if (question.questionType === "SINGLE_CHOICE") {
      isCorrect = typeof raw === "string" && question.options.filter((option) => option.isCorrect).map((option) => option.id).length === 1 && question.options.find((option) => option.id === raw)?.isCorrect === true
    } else if (question.questionType === "MULTIPLE_CHOICE") {
      const selected = Array.isArray(raw) ? raw.filter((value): value is string => typeof value === "string").sort() : []
      const correct = question.options.filter((option) => option.isCorrect).map((option) => option.id).sort()
      isCorrect = selected.length === correct.length && selected.every((value, index) => value === correct[index])
    } else if (typeof raw === "string") {
      const accepted = (question.acceptedAnswers || "").split("\n").map(normalize).filter(Boolean)
      const normalized = normalize(raw)
      const numeric = Number(raw)
      isCorrect = accepted.includes(normalized) || (Number.isFinite(numeric) && question.tolerance != null && accepted.some((answer) => Math.abs(Number(answer) - numeric) <= question.tolerance!))
    }
    if (isCorrect) { score += question.points; correctCount += 1 }
    return { questionId: question.id, answer: Array.isArray(raw) ? raw.join(",") : String(raw ?? ""), isCorrect, points: isCorrect ? question.points : 0 }
  })
  const maxScore = test.questions.reduce((total, question) => total + question.points, 0)
  const attempt = await prisma.testAttempt.create({ data: { userId: session.user.id, testId: test.id, score, maxScore, percentage: maxScore ? (score / maxScore) * 100 : 0, correctCount, incorrectCount: test.questions.length - correctCount, answers: { create: answers } }, select: { id: true, score: true, maxScore: true, percentage: true, correctCount: true, incorrectCount: true, completedAt: true } })
  await prisma.user.update({ where: { id: session.user.id }, data: { lastActivityAt: new Date() } })
  return NextResponse.json(attempt, { status: 201 })
}
