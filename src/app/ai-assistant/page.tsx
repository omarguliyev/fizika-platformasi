"use client"

import { useState } from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"

type Message = {
  id: string
  content: string
  isUser: boolean
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Salam! Mən Fizika Dostunuzam.",
      isUser: false,
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requiresAccount, setRequiresAccount] = useState(false)

  const sendMessage = async () => {
    const trimmedInput = input.trim()

    if (!trimmedInput || loading) {
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedInput,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)
    setRequiresAccount(false)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
        }),
      })

      // Read text first so non-JSON server errors don't crash the frontend.
      const responseText = await response.text()

      let data: {
        message?: string
        error?: string
      } = {}

      try {
        data = JSON.parse(responseText)
      } catch {
        // Server returned something other than JSON.
      }

      if (!response.ok) {
        setRequiresAccount(response.status === 401)
        throw new Error(
          data.error ||
            `Server xətası (${response.status}). Zəhmət olmasa yenidən cəhd edin.`
        )
      }

      const aiContent = data.message

      if (!aiContent) {
        throw new Error("Süni intellektdən boş cavab alındı.")
      }

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        content: aiContent,
        isUser: false,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Naməlum xəta baş verdi."

      setError(errorMessage)
      console.error("AI frontend error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BrandLogo imageClassName="h-8 w-8" />
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-gray-600 transition-colors hover:text-gray-900"
                aria-label="Geri qayıt"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <h1 className="text-xl font-bold text-gray-800">
                Süni İntellekt Köməkçisi
              </h1>
            </div>

            <div className="hidden items-center space-x-6 text-gray-600 md:flex">
              <a
                href="/"
                className="transition-colors hover:text-gray-900"
              >
                Ana səhifə
              </a>

              <a
                href="/junior"
                className="transition-colors hover:text-gray-900"
              >
                Junior
              </a>

              <a
                href="/senior"
                className="transition-colors hover:text-gray-900"
              >
                Senior
              </a>

              <a
                href="/resources"
                className="transition-colors hover:text-gray-900"
              >
                Resurslar
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Page header */}
      <header className="bg-white pb-12 pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Süni İntellekt Köməkçisi
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Fizika problemlərində süni intellektdən yardım alın, anlayışları
            mənimsəyin və problem həlli üsullarını öyrənin.
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="p-8">
              {/* Chat header */}
              <div className="mb-8 border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="mb-1 text-xl font-semibold text-gray-900">
                      Fizika Dostunuz
                    </h2>

                    <p className="text-sm text-gray-500">
                      Fizika problemlərinin həllində sizə kömək edir
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="mb-6 h-[500px] space-y-4 overflow-y-auto pb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start space-x-4"
                  >
                    {msg.isUser ? (
                      <>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200">
                          <svg
                            className="h-6 w-6 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5z" />
                          </svg>
                        </div>

                        <div className="max-w-[80%] rounded-xl bg-blue-600 p-4 text-white">
                          <p className="whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
                            />
                          </svg>
                        </div>

                        <div className="max-w-[80%] rounded-xl bg-gray-50 p-4">
                          <p className="whitespace-pre-wrap text-gray-800">
                            {msg.content}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* Loading */}
                {loading && (
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                      <svg
                        className="h-6 w-6 animate-pulse text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
                        />
                      </svg>
                    </div>

                    <div className="max-w-[80%] rounded-xl bg-gray-50 p-4">
                      <p className="italic text-gray-800">
                        Fikirləşir...
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                        />
                      </svg>
                    </div>

                    <div className="max-w-[80%] rounded-xl bg-red-50 p-4 text-red-600">
                      <p className="text-sm">{error}</p>
                      {requiresAccount && (
                        <p className="mt-3 text-sm">
                          <Link className="font-medium underline" href="/login?callbackUrl=%2Fai-assistant">
                            Daxil olun
                          </Link>
                          {" və ya "}
                          <Link className="font-medium underline" href="/signup?callbackUrl=%2Fai-assistant">
                            hesab yaradın
                          </Link>
                          {" — AI köməkçisi hesab sahibləri üçündür."}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <textarea
                  placeholder="Fizika sualınızı yazın..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={3}
                  className="min-h-[80px] flex-1 resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-medium text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Göndərilir..." : "Göndər"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}