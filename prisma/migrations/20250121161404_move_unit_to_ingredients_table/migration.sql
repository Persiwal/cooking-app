/*
  Warnings:

  - You are about to drop the column `unit` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "unit";
