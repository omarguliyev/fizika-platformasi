export function parseRfoFiles(value: unknown): string | null | undefined {
  if (value === undefined) return undefined

  try {
    const files = typeof value === "string" ? JSON.parse(value) : value
    return Array.isArray(files) ? JSON.stringify(files) : null
  } catch {
    return null
  }
}
