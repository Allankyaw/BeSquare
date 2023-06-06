-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "post_body" TEXT NOT NULL,
    "created_on" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "is_anonymous" SMALLINT DEFAULT 0,
    "tag_id" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "user_aboutme" TEXT DEFAULT 'write about yourself!',
    "is_admin" SMALLINT DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");
