-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "phone" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitedBy" TEXT NOT NULL,
    "hasCompanion" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL DEFAULT 'Amigos'
);
INSERT INTO "new_Guest" ("confirmed", "confirmedAt", "createdAt", "hasCompanion", "id", "invitedBy", "name", "phone", "surname") SELECT "confirmed", "confirmedAt", "createdAt", "hasCompanion", "id", "invitedBy", "name", "phone", "surname" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_phone_key" ON "Guest"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
