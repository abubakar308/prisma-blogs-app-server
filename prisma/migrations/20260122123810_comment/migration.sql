-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parrentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parrentId_fkey" FOREIGN KEY ("parrentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
