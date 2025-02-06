-- CreateTable
CREATE TABLE "_AllowedUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AllowedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AllowedUsers_B_index" ON "_AllowedUsers"("B");

-- AddForeignKey
ALTER TABLE "_AllowedUsers" ADD CONSTRAINT "_AllowedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllowedUsers" ADD CONSTRAINT "_AllowedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
