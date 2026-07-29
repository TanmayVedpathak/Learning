import { NewsList } from "@/components";

import { getAllNews } from "@/lib/news";

import { News } from "@/types";

export default async function NewsPage() {
  // const response = await fetch("http://localhost:8080/news");

  // if (!response.ok) {
  //   throw new Error("Failed to fetch");
  // }

  // const data = await response.json();

  // const news: News[] = data.data;
  const news: News[] = await getAllNews();

  return (
    <>
      <div>
        <h1>News Page</h1>
        <NewsList news={news} />
      </div>
    </>
  );
}
