import { notFound } from "next/navigation";

import { InterceptedImageModal } from "@/components";

import { getNewsItem } from "@/lib/news";

type InterceptedImagePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterceptedImagePage({ params }: InterceptedImagePageProps) {
  const { id } = await params;

  const newsItem = await getNewsItem(id);

  if (!newsItem) {
    notFound();
  }

  return <InterceptedImageModal newsItem={newsItem} />;
}
