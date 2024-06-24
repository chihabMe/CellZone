-- CreateTable
CREATE TABLE "_LikedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikedBy_AB_unique" ON "_LikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedBy_B_index" ON "_LikedBy"("B");
