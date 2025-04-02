/*
  Warnings:

  - You are about to drop the column `like` on the `Post_Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Post_Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Post_Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post_Like" DROP COLUMN "like",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_Like_userId_postId_key" ON "Post_Like"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Post_Like" ADD CONSTRAINT "Post_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
