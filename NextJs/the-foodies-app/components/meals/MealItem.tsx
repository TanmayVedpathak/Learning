import Image from "next/image";
import Link from "next/link";

import { Meal } from "@/types";

import style from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }: Meal) {
  return (
    <>
      <article className={style.meal}>
        <div>
          <div className={style.image}>
            <Image src={image} alt={title} fill sizes="200px" />
          </div>
          <div className={style.headerText}>
            <h2>{title}</h2>
            <p>by {creator}</p>
          </div>
        </div>
        <div className={style.content}>
          <p className={style.summary}>{summary}</p>
          <div className={style.actions}>
            <Link href={`/meals/${slug}`}>View Details</Link>
          </div>
        </div>
      </article>
    </>
  );
}
