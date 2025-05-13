-- CreateEnum
CREATE TYPE "IssuePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "priority" "IssuePriority" NOT NULL DEFAULT 'MEDIUM';
