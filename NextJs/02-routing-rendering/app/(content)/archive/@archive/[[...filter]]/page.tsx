import Link from "next/link";

import { NewsList } from "@/components";

import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

import { News } from "@/types";

export default async function FilteredPage({ params }: { params: Promise<{ filter: string[] }> }) {
  const { filter } = await params;

  const year = filter?.[0];
  const month = filter?.[1];

  let news: News[] = [];
  let links: number[] = getAvailableNewsYears();

  if (year && !month) {
    news = getNewsForYear(year);
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    news = getNewsForYearAndMonth(year, month);
    links = [];
  }

  if ((year && !getAvailableNewsYears().includes(+year)) || (month && !getAvailableNewsMonths(year).includes(+month))) {
    throw new Error("Invalid filter.");
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links?.map((link) => {
              const url = year ? `/archive/${year}/${link}` : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={url}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {news.length > 0 && <NewsList news={news} />}
    </>
  );
}
