import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsItem } from "@/lib/news";

import { News } from "@/types";

type SingleNewProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: SingleNewProps) {
  const { id } = await params;
  const newsItem: News | undefined = await getNewsItem(id);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <article className="news-article">
        <div>
          <Link href={`/news/${id}/image`}>
            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width="150" height="150" />
          </Link>
          <h1>{newsItem.title}</h1>
          <time dateTime={newsItem.date}>{newsItem.date}</time>
        </div>
        <p>{newsItem.content}</p>
      </article>
    </>
  );
}
