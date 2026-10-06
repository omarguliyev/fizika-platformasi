CREATE TABLE "new_AISettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL DEFAULT 'google',
    "model" TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
    "temperature" REAL NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 1000,
    "systemPrompt" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_AISettings" (
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
    CASE WHEN "model" LIKE 'gemini-%' THEN "model" ELSE 'gemini-2.5-flash' END,
    "temperature",
    "maxTokens",
    "systemPrompt",
    "isActive",
    "updatedAt"
FROM "AISettings";

DROP TABLE "AISettings";
ALTER TABLE "new_AISettings" RENAME TO "AISettings";
CREATE INDEX "AISettings_isActive_idx" ON "AISettings"("isActive");
