import { Suspense } from "react";

import Link from "next/link";

import { NewsList } from "@/components";

import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

import { News } from "@/types";

const FilteredHeader = async ({ year, month }: { year: string | undefined; month: string | undefined }) => {
  let links: (number | string)[] = await getAvailableNewsYears();

  if (year && !month) {
    links = await getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  return (
    <>
      {links?.map((link) => {
        const url = year ? `/archive/${year}/${link}` : `/archive/${link}`;
        return (
          <li key={link}>
            <Link href={url}>{link}</Link>
          </li>
        );
      })}
    </>
  );
};

const FilteredNews = async ({ year, month }: { year: string | undefined; month: string | undefined }) => {
  let news: News[] = [];

  if (year && !month) {
    news = await getNewsForYear(year);
  }

  if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  return <>{news.length > 0 && <NewsList news={news} />}</>;
};

export default async function FilteredPage({ params }: { params: Promise<{ filter: string[] }> }) {
  const { filter } = await params;

  const year = filter?.[0];
  const month = filter?.[1];

  const availableYears: (number | string)[] = await getAvailableNewsYears();
  const availableMonths: (number | string)[] = await getAvailableNewsMonths(year);

  if ((year && !availableYears.includes(+year)) || (month && !availableMonths.includes(+month))) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            <Suspense fallback={<p>Loading ....</p>}>
              <FilteredHeader year={year} month={month} />
            </Suspense>
          </ul>
        </nav>
      </header>

      <Suspense fallback={<p>Loading ....</p>}>
        <FilteredNews year={year} month={month} />
      </Suspense>
    </>
  );
}
