import { NewsList } from "@/components";

import { getLatestNews } from "@/lib/news";

export default async function Page() {
  const latestNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
