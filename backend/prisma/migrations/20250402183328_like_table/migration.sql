-- CreateTable
CREATE TABLE "Post_Like" (
    "id" SERIAL NOT NULL,
    "like" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Post_Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post_Like" ADD CONSTRAINT "Post_Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
