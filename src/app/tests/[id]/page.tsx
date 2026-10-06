"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BrandLogo } from "@/components/BrandLogo"

type Question = {
  id: string
  text: string
  questionType: string
  points: number
  options: { id: string; text: string }[]
}

type Test = {
  resource: { title: string }
  instructions: string | null
  questions: Question[]
}

export default function TestPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [test, setTest] = useState<Test | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [result, setResult] = useState<{ score: number; maxScore: number; percentage: number; correctCount: number; incorrectCount: number } | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/tests/${id}`).then(async (response) => {
      const data = await response.json()
      if (response.status === 401) {
        router.push(`/login?callbackUrl=${encodeURIComponent(`/tests/${id}`)}`)
        return
      }
      if (!response.ok) throw new Error(data.error || "Testi yükləmək olmadı.")
      setTest(data)
    }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Xəta baş verdi."))
  }, [id, router])

  function updateAnswer(question: Question, value: string) {
    setAnswers((current) => {
      if (question.questionType !== "MULTIPLE_CHOICE") return { ...current, [question.id]: value }
      const selected = Array.isArray(current[question.id]) ? current[question.id] as string[] : []
      return { ...current, [question.id]: selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value] }
    })
  }

  async function submit() {
    const response = await fetch(`/api/tests/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
    const data = await response.json()
    if (!response.ok) {
      setError(data.error || "Cavabları göndərmək olmadı.")
      return
    }
    setResult(data)
  }

  if (error) return <main className="mx-auto max-w-3xl p-8 text-red-700">{error}</main>
  if (!test) return <main className="mx-auto max-w-3xl p-8">Yüklənir...</main>

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <BrandLogo showName imageClassName="h-10 w-10" />
      <div>
        <h1 className="text-3xl font-bold">{test.resource.title}</h1>
        {test.instructions && <p className="mt-2 text-gray-600">{test.instructions}</p>}
      </div>
      {result ? (
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Nəticə</h2>
          <p className="mt-3">{result.score}/{result.maxScore} bal · {result.percentage.toFixed(1)}%</p>
          <p className="text-gray-600">{result.correctCount} düzgün, {result.incorrectCount} səhv cavab</p>
          <a className="mt-4 inline-block text-blue-600 hover:underline" href="/profile">Tərəqqimə bax</a>
        </section>
      ) : (
        <>
          {test.questions.map((question, index) => (
            <section key={question.id} className="rounded-xl bg-white p-6 shadow">
              <h2 className="font-semibold">{index + 1}. {question.text} <span className="text-sm text-gray-500">({question.points} bal)</span></h2>
              {question.questionType === "OPEN_ANSWER" ? (
                <input className="mt-4 w-full rounded border p-3" onChange={(event) => updateAnswer(question, event.target.value)} />
              ) : (
                <div className="mt-4 space-y-2">
                  {question.options.map((option) => (
                    <label key={option.id} className="flex items-center gap-2">
                      <input
                        type={question.questionType === "MULTIPLE_CHOICE" ? "checkbox" : "radio"}
                        name={question.id}
                        checked={Array.isArray(answers[question.id]) ? (answers[question.id] as string[]).includes(option.id) : answers[question.id] === option.id}
                        onChange={() => updateAnswer(question, option.id)}
                      />
                      {option.text}
                    </label>
                  ))}
                </div>
              )}
            </section>
          ))}
          <button type="button" onClick={submit} className="rounded bg-blue-600 px-5 py-3 font-medium text-white">Göndər</button>
        </>
      )}
    </main>
  )
}
