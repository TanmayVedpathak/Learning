import { notFound } from "next/navigation";

import { InterceptedImageModal } from "@/components";

import { DUMMY_NEWS } from "@/dummy-news";

type InterceptedImagePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterceptedImagePage({ params }: InterceptedImagePageProps) {
  const { id } = await params;

  const newsItem = DUMMY_NEWS.find((newItem) => newItem.slug === id);

  if (!newsItem) {
    notFound();
  }

  return <InterceptedImageModal newsItem={newsItem} />;
}
