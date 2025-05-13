/*
  Warnings:

  - You are about to drop the column `SubscriptionStatus` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "SubscriptionStatus",
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE';
