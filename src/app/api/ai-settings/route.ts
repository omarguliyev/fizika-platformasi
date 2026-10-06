import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"

const DEFAULT_GOOGLE_MODEL = "gemini-3.1-flash-lite"

function isGoogleApiKeyConfigured() {
  return Boolean(process.env.GOOGLE_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim())
}

// GET /api/ai-settings - get active AI settings
export async function GET() {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }
  try {
    const settings = await prisma.aISettings.findFirst({
      where: { isActive: true },
    })

    if (!settings) {
      return NextResponse.json({
        provider: "google",
        model: process.env.GOOGLE_AI_MODEL || DEFAULT_GOOGLE_MODEL,
        temperature: 0.7,
        maxTokens: 1000,
        systemPrompt: "",
        googleApiKeyConfigured: isGoogleApiKeyConfigured(),
      })
    }

    return NextResponse.json({
      ...settings,
      googleApiKeyConfigured: isGoogleApiKeyConfigured(),
    })
  } catch (error) {
    console.error("Error fetching AI settings:", error)
    return NextResponse.json({ error: "Failed to fetch AI settings" }, { status: 500 })
  }
}

// PUT /api/ai-settings - update AI settings
export async function PUT(request: NextRequest) {
  const session = await getAuthSession()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 })
  }
  try {
    const body = await request.json()
    const { provider, model, temperature, maxTokens, systemPrompt } = body

    if (
      provider !== "google" ||
      typeof model !== "string" ||
      model !== "gemini-3.1-flash-lite" ||
      !Number.isFinite(Number(temperature)) ||
      Number(temperature) < 0 ||
      Number(temperature) > 2 ||
      !Number.isInteger(Number(maxTokens)) ||
      Number(maxTokens) < 1 ||
      Number(maxTokens) > 32768 ||
      typeof systemPrompt !== "string"
    ) {
      return NextResponse.json(
        { error: "AI parametrləri düzgün deyil." },
        { status: 400 }
      )
    }

    // Deactivate any existing active settings
    const settings = await prisma.$transaction(async (transaction) => {
      await transaction.aISettings.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })
      return transaction.aISettings.create({
        data: {
          provider: "google",
          model,
          temperature: Number(temperature),
          maxTokens: Number(maxTokens),
          systemPrompt,
          isActive: true,
        },
      })
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error updating AI settings:", error)
    return NextResponse.json(
      { error: "AI ayarlarını yadda saxlamaq olmadı. Serverdəki verilənlər bazası migration-larını və Prisma client-i yoxlayıb tətbiqi yenidən başladın." },
      { status: 500 }
    )
  }
}