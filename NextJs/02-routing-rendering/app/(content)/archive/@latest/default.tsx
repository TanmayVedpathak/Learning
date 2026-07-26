import { NewsList } from "@/components";

import { getLatestNews } from "@/lib/news";

export default function Page() {
  const latestNews = getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
