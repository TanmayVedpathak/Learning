import Image from "next/image";
import Link from "next/link";

import { News } from "@/types";

const NewsList = ({ news }: { news: News[] }) => {
  return (
    <>
      <ul className="news-list">
        {news?.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width="80" height="80" />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsList;
