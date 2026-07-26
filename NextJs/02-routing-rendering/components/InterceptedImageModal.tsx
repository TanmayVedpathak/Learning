"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { News } from "@/types";

type InterceptedImageModalProps = {
  newsItem: News;
};

export default function InterceptedImageModal({ newsItem }: InterceptedImageModalProps) {
  const router = useRouter();

  return (
    <>
      <div className="modal-backdrop" onClick={() => router.back()} />

      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={150} height={150} />
        </div>
      </dialog>
    </>
  );
}
