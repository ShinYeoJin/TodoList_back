-- CreateTable
CREATE TABLE "subtasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    "position" INTEGER DEFAULT 0,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subtasks_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "todos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    "position" INTEGER DEFAULT 0,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "idx_subtasks_position" ON "subtasks"("position");

-- CreateIndex
CREATE INDEX "idx_todos_position" ON "todos"("position");
