import { redirect } from "next/navigation"
import Link from "next/link"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { BrandLogo } from "@/components/BrandLogo"

export default async function ProfilePage() {
  const session = await getAuthSession()

  if (!session?.user || session.user.role !== "user") {
    redirect("/login?callbackUrl=%2Fprofile")
  }

  const attempts = await prisma.testAttempt.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: "desc" },
    take: 20,
    select: {
      id: true,
      score: true,
      maxScore: true,
      percentage: true,
      correctCount: true,
      incorrectCount: true,
      completedAt: true,
      test: {
        select: {
          resource: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })

  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-6 bg-gray-50 p-8">
      <BrandLogo showName imageClassName="h-10 w-10" />
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        ← Ana səhifəyə qayıt
      </Link>

      <h1 className="text-3xl font-bold">
        Hesabım
      </h1>

      <p className="text-gray-700">
        Xoş gəlmisiniz, {session.user.username || session.user.email}.
      </p>

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Tərəqqim
        </h2>

        {attempts.length === 0 ? (
          <p className="mt-2 text-gray-600">
            Hələ tamamlanmış testiniz yoxdur.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded border p-3"
              >
                <div>
                  <p className="font-medium">
                    {attempt.test.resource.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {attempt.completedAt.toLocaleDateString("az-AZ")} ·{" "}
                    {attempt.correctCount} düzgün,{" "}
                    {attempt.incorrectCount} səhv
                  </p>
                </div>

                <p className="font-semibold">
                  {attempt.score}/{attempt.maxScore} (
                  {attempt.percentage.toFixed(1)}%)
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}