import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

const GOOGLE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
const DEFAULT_MODEL = "gemini-3.1-flash-lite"
const SUPPORTED_MODELS = new Set(["gemini-3.1-flash-lite"])

type GoogleResponse = {
  error?: { message?: string }
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
}

export async function POST(request: NextRequest) {
  const session = await getAuthSession()
  if (session?.user?.role !== "user" && session?.user?.role !== "admin") {
    return NextResponse.json({ error: "AI köməkçisindən istifadə etmək üçün daxil olun." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Sorğu formatı düzgün deyil." }, { status: 400 })
  }

  const message = typeof (body as { message?: unknown })?.message === "string"
    ? (body as { message: string }).message.trim()
    : ""
  if (!message || message.length > 12000) {
    return NextResponse.json(
      { error: "Mesaj boş ola bilməz və 12000 simvoldan uzun olmamalıdır." },
      { status: 400 }
    )
  }

  let settings
  try {
    settings = await prisma.aISettings.findFirst({ where: { isActive: true } })
  } catch (error) {
    console.error("AI settings lookup failed:", error)
    return NextResponse.json(
      { error: "AI ayarlarını oxumaq olmadı. Verilənlər bazası migration-larını tətbiq edin və tətbiqi yenidən başladın." },
      { status: 503 }
    )
  }

  const model = settings?.model || process.env.GOOGLE_AI_MODEL || DEFAULT_MODEL
  const temperature = settings?.temperature ?? Number(process.env.AI_TEMPERATURE || 0.7)
  const maxTokens = settings?.maxTokens ?? Number(process.env.AI_MAX_TOKENS || 1000)
  const systemPrompt = settings?.systemPrompt || process.env.AI_SYSTEM_PROMPT ||
    "Siz RFO Fizika Olimpiadasına hazırlıq köməkçisisiniz. Cavabları Azərbaycan dilində, aydın və mərhələli verin."

  if (!SUPPORTED_MODELS.has(model)) {
    console.error("Unsupported Gemini model configured", { model })
    return NextResponse.json(
      { error: "Dəstəklənməyən model seçilib. Admin AI ayarlarında Gemini 3.1 Flash-Lite seçin." },
      { status: 500 }
    )
  }
  if (
    !Number.isFinite(temperature) ||
    temperature < 0 ||
    temperature > 2 ||
    !Number.isInteger(maxTokens) ||
    maxTokens < 1 ||
    maxTokens > 32768
  ) {
    console.error("Invalid AI settings", { model, temperature, maxTokens })
    return NextResponse.json({ error: "AI parametrləri düzgün konfiqurasiya edilməyib." }, { status: 500 })
  }

  const apiKey = process.env.GOOGLE_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    console.error("Google AI Studio API key is not configured")
    return NextResponse.json(
      { error: "Google AI Studio API açarı serverdə yoxdur. Düzgün Google Cloud layihəsi üçün API açarı yaradıb .env faylında GOOGLE_API_KEY kimi qeyd edin." },
      { status: 503 }
    )
  }

  try {
    const upstream = await fetch(`${GOOGLE_URL}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: message }] }],
        generationConfig: { temperature, maxOutputTokens: maxTokens },
      }),
      signal: AbortSignal.timeout(30000),
    })

    const responseText = await upstream.text()
    let data: GoogleResponse
    try {
      data = JSON.parse(responseText)
    } catch {
      console.error("Google returned malformed JSON", { status: upstream.status, model })
      return NextResponse.json({ error: "Google AI xidmətindən səhv cavab gəldi." }, { status: 502 })
    }

    if (!upstream.ok) {
      const detail = data.error?.message || upstream.statusText || "Naməlum Google API xətası"
      console.error("Google request failed", { status: upstream.status, model, detail: detail.slice(0, 500) })
      const status = upstream.status === 429 || upstream.status === 503
        ? upstream.status
        : upstream.status >= 500 ? 502 : upstream.status
      const error = upstream.status === 401
        ? "Google API açarı etibarsızdır. Açarın Google AI Studio layihəniz üçün yaradıldığını yoxlayın."
        : upstream.status === 403
          ? "Google bu layihə və ya açar üçün sorğunu qadağan etdi. Gemini API icazəsini və layihənin quota/billing statusunu yoxlayın."
          : upstream.status === 429
            ? "Google Gemini layihəsinin sorğu limiti/quota həddi dolub. Bir az sonra yenidən cəhd edin."
            : upstream.status === 404 || upstream.status === 410
              ? "Google Gemini modeli artıq mövcud deyil. Admin AI ayarlarında Gemini 3.1 Flash-Lite seçin."
              : `Google AI sorğusu uğursuz oldu (${upstream.status}): ${detail.slice(0, 250)}`
      return NextResponse.json({ error }, { status })
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim()
    if (!answer) {
      console.error("Google response did not contain an answer", { status: upstream.status, model })
      return NextResponse.json({ error: "AI xidmətindən düzgün cavab alınmadı." }, { status: 502 })
    }

    return NextResponse.json({ message: answer })
  } catch (error) {
    console.error("Google request failed before response:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ error: "Google AI xidmətinə qoşulmaq olmadı." }, { status: 503 })
  }
}
