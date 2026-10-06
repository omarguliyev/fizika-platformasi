import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

const questionTypes = new Set(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "OPEN_ANSWER"])

export async function POST(request: NextRequest) {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  try {
    const body = await request.json()
    if (!body.title || !Array.isArray(body.questions) || body.questions.length === 0) {
      return NextResponse.json({ error: "Test adı və ən azı bir sual tələb olunur." }, { status: 400 })
    }
    const test = await prisma.$transaction(async (tx) => {
      const resource = await tx.resource.create({
        data: {
          title: String(body.title).trim(),
          description: body.description ? String(body.description) : null,
          fileUrl: null,
          category: String(body.category || "TEST"),
          topic: body.topic ? String(body.topic) : null,
          level: String(body.level || "BOTH"),
          resourceType: "TEST",
          year: body.year ? Number(body.year) : null,
          stage: body.stage ? String(body.stage) : null,
          tags: Array.isArray(body.tags) ? body.tags.join(",") : null,
          isActive: body.isActive !== false,
          uploadedById: session.user.id,
        },
      })
      return tx.test.create({
        data: {
          resourceId: resource.id,
          timeLimit: body.timeLimit ? Number(body.timeLimit) : null,
          instructions: body.instructions ? String(body.instructions) : null,
          questions: {
            create: body.questions.map((question: Record<string, unknown>, index: number) => {
              const type = String(question.questionType)
              if (!question.text || !questionTypes.has(type)) throw new Error("INVALID_QUESTION")
              const options = Array.isArray(question.options) ? question.options : []
              const correctOptions = options.filter((option): option is Record<string, unknown> => typeof option === "object" && option !== null && option.isCorrect === true)
              if (type === "SINGLE_CHOICE" && (options.length < 4 || options.length > 5 || correctOptions.length !== 1)) {
                throw new Error("INVALID_OPTIONS")
              }
              if (type === "MULTIPLE_CHOICE" && (options.length < 4 || correctOptions.length < 2 || correctOptions.length > 3)) {
                throw new Error("INVALID_OPTIONS")
              }
              return {
                text: String(question.text),
                questionType: type,
                points: Number(question.points) > 0 ? Number(question.points) : 1,
                acceptedAnswers: type === "OPEN_ANSWER" && Array.isArray(question.acceptedAnswers) ? question.acceptedAnswers.join("\n") : null,
                tolerance: type === "OPEN_ANSWER" && question.tolerance != null ? Number(question.tolerance) : null,
                order: index,
                options: type !== "OPEN_ANSWER" ? {
                  create: options.map((option: Record<string, unknown>, optionIndex: number) => ({
                    text: String(option.text || ""),
                    isCorrect: option.isCorrect === true,
                    order: optionIndex,
                  })),
                } : undefined,
              }
            }),
          },
        },
        include: { resource: true, questions: { include: { options: true } } },
      })
    })
    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_QUESTION") {
      return NextResponse.json({ error: "Sual tipi və mətni düzgün göstərilməyib." }, { status: 400 })
    }
    if (error instanceof Error && error.message === "INVALID_OPTIONS") {
      return NextResponse.json({ error: "Seçimli sualların variant və düzgün cavab sayı tələblərə uyğun deyil." }, { status: 400 })
    }
    console.error("Test creation failed:", error)
    return NextResponse.json({ error: "Test yaratmaq olmadı." }, { status: 500 })
  }
}
