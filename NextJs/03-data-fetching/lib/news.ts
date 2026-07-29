import sql from "better-sqlite3";

import type { News } from "@/types";

const db = sql("data.db");

type YearRow = {
  year: string;
};

type MonthRow = {
  month: string;
};

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getAllNews(): Promise<News[]> {
  const news = db.prepare("SELECT * FROM news").all() as News[];

  await delay(2000);

  return news;
}

export async function getNewsItem(slug: string): Promise<News | undefined> {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug) as News | undefined;

  await delay(2000);

  return newsItem;
}

export async function getLatestNews(): Promise<News[]> {
  const latestNews = db.prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3").all() as News[];

  await delay(2000);

  return latestNews;
}

export async function getAvailableNewsYears(): Promise<number[]> {
  const years = (db.prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news").all() as YearRow[]).map((row) => Number(row.year));

  await delay(2000);

  return years;
}

export async function getAvailableNewsMonths(year: string | number): Promise<number[]> {
  const months = (db.prepare("SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?").all(String(year)) as MonthRow[]).map((row) => Number(row.month));

  await delay(2000);

  return months;
}

export async function getNewsForYear(year: string | number): Promise<News[]> {
  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(String(year)) as News[];

  await delay(2000);

  return news;
}

export async function getNewsForYearAndMonth(year: string | number, month: string | number): Promise<News[]> {
  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC").all(String(year), String(month).padStart(2, "0")) as News[];

  await delay(2000);

  return news;
}
