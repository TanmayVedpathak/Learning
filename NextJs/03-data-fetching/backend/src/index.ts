import sqlite from "better-sqlite3";
import cors from "cors";
import express, { Request, Response } from "express";

type News = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

type NewsRow = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

type CountRow = {
  count: number;
};

const DUMMY_NEWS: News[] = [
  {
    id: "n1",
    slug: "will-ai-replace-humans",
    title: "Will AI Replace Humans?",
    image: "ai-robot.jpg",
    date: "2021-07-01",
    content:
      "Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.",
  },
  {
    id: "n2",
    slug: "beaver-plague",
    title: "A Plague of Beavers",
    image: "beaver.jpg",
    date: "2022-05-01",
    content: "Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?",
  },
  {
    id: "n3",
    slug: "couple-cooking",
    title: "Spend more time together!",
    image: "couple-cooking.jpg",
    date: "2024-03-01",
    content: "Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!",
  },
  {
    id: "n4",
    slug: "hiking",
    title: "Hiking is the best!",
    image: "hiking.jpg",
    date: "2024-01-01",
    content: "Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!",
  },
  {
    id: "n5",
    slug: "landscape",
    title: "The beauty of landscape",
    image: "landscape.jpg",
    date: "2022-07-01",
    content: "Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!",
  },
];

const PORT = 8080;

const db = sqlite("data.db");

function initDb(): void {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT NOT NULL
    )
    `,
  ).run();

  const row = db.prepare("SELECT COUNT(*) as count FROM news").get() as CountRow;

  if (row.count === 0) {
    const insert = db.prepare(`
      INSERT INTO news (slug, title, content, date, image)
      VALUES (?, ?, ?, ?, ?)
    `);

    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/news", (_req: Request, res: Response) => {
  const news = db.prepare("SELECT * FROM news").all() as NewsRow[];

  res.json({
    success: true,
    data: news,
  });
});

app.get("/news/:slug", (req: Request<{ slug: string }>, res: Response) => {
  const { slug } = req.params;

  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug) as NewsRow | undefined;

  if (!newsItem) {
    return res.status(404).json({
      success: false,
      message: "News item not found",
    });
  }

  return res.json({
    success: true,
    data: newsItem,
  });
});

initDb();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
