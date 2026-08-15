import { cache } from "react";

import { unstable_cache } from "next/cache";

import sql from "better-sqlite3";

import { Message } from "@/types";

const db = new sql("messages.db");

function initDb(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )
  `);
}

initDb();

export function addMessage(message: string): void {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

// export const getMessages = cache(function getMessages(): Message[] {
//   console.log("Fetching messages from db");

//   return db.prepare("SELECT * FROM messages").all() as Message[];
// });

export const getMessages = unstable_cache(
  async (): Promise<Message[]> => {
    console.log("Fetching messages from db");

    return db.prepare("SELECT * FROM messages").all() as Message[];
  },
  ["messages"],
  {
    tags: ["messages"],
  },
);
