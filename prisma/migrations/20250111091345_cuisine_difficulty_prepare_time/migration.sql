-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cuisine" TEXT DEFAULT 'Unknown',
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "prepare_time" INTEGER NOT NULL DEFAULT 3600;
