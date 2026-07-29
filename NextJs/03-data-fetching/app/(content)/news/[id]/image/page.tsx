import Image from "next/image";
import { notFound } from "next/navigation";

import { News } from "@/types";

import { DUMMY_NEWS } from "@/dummy-news";

export default async function ImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem: News | undefined = DUMMY_NEWS.find((newItem) => newItem.slug === id);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="fullscreen-image">
        <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width="150" height="150" />
      </div>
    </>
  );
}
