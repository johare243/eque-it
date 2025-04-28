-- CreateTable
CREATE TABLE "Healthcheck" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "msg" TEXT NOT NULL DEFAULT 'ok',

    CONSTRAINT "Healthcheck_pkey" PRIMARY KEY ("id")
);
