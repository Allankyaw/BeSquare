-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "post_body" TEXT NOT NULL,
    "created_on" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "is_anonymous" SMALLINT DEFAULT 0,
    "tag_id" TEXT,
    "user_id" INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
