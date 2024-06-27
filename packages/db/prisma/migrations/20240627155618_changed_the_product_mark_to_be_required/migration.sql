/*
  Warnings:

  - Made the column `productMarkId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "batteryCapacity" INTEGER NOT NULL DEFAULT 1000,
    "screenType" TEXT NOT NULL DEFAULT 'LCD',
    "screenSize" INTEGER NOT NULL DEFAULT 6,
    "memory" INTEGER NOT NULL DEFAULT 4,
    "capacity" INTEGER NOT NULL DEFAULT 64,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isBestseller" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cartId" TEXT,
    "productMarkId" TEXT NOT NULL,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_productMarkId_fkey" FOREIGN KEY ("productMarkId") REFERENCES "ProductMark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("batteryCapacity", "capacity", "cartId", "categoryId", "createdAt", "description", "id", "image", "isBestseller", "isFeatured", "isPopular", "memory", "name", "price", "productMarkId", "quantity", "screenSize", "screenType", "slug", "updatedAt", "userId") SELECT "batteryCapacity", "capacity", "cartId", "categoryId", "createdAt", "description", "id", "image", "isBestseller", "isFeatured", "isPopular", "memory", "name", "price", "productMarkId", "quantity", "screenSize", "screenType", "slug", "updatedAt", "userId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
