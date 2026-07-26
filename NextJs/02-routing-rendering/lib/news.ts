import type { News } from "@/types";

import { DUMMY_NEWS } from "@/dummy-news";

export function getAllNews(): News[] {
  return DUMMY_NEWS;
}

export function getLatestNews(): News[] {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears(): number[] {
  return DUMMY_NEWS.reduce((years: number[], news: News) => {
    const year = new Date(news.date).getFullYear();

    if (!years.includes(year)) {
      years.push(year);
    }

    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: string | number): number[] {
  return DUMMY_NEWS.reduce((months: number[], news: News) => {
    const newsYear = new Date(news.date).getFullYear();

    if (newsYear === Number(year)) {
      const month = new Date(news.date).getMonth() + 1;

      if (!months.includes(month)) {
        months.push(month);
      }
    }

    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year: string | number): News[] {
  return DUMMY_NEWS.filter((news: News) => {
    return new Date(news.date).getFullYear() === Number(year);
  });
}

export function getNewsForYearAndMonth(year: string | number, month: string | number): News[] {
  return DUMMY_NEWS.filter((news: News) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;

    return newsYear === Number(year) && newsMonth === Number(month);
  });
}
