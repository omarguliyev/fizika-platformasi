ALTER TABLE "AISettings" RENAME TO "old_AISettings";
DROP INDEX IF EXISTS "AISettings_isActive_idx";

CREATE TABLE "AISettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL DEFAULT 'google',
    "model" TEXT NOT NULL DEFAULT 'gemini-3.8-flash',
    "temperature" REAL NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 1000,
    "systemPrompt" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "AISettings" (
    "id",
    "provider",
    "model",
    "temperature",
    "maxTokens",
    "systemPrompt",
    "isActive",
    "updatedAt"
)
SELECT
    "id",
    'google',
    'gemini-3.8-flash',
    "temperature",
    "maxTokens",
    "systemPrompt",
    "isActive",
    "updatedAt"
FROM "old_AISettings";

DROP TABLE "old_AISettings";
CREATE INDEX "AISettings_isActive_idx" ON "AISettings"("isActive");
