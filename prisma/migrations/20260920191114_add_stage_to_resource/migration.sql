-- AlterTable
ALTER TABLE "Resource" ADD COLUMN "stage" TEXT;

-- CreateIndex
CREATE INDEX "Resource_stage_idx" ON "Resource"("stage");
