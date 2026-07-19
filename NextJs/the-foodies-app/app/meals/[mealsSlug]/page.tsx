import Image from "next/image";
import { notFound } from "next/navigation";

import { getSingleMeal } from "@/api/mealsAPi";

import { Meal } from "@/types";

import style from "./page.module.css";

type MealDetailsPageProps = {
  params: Promise<{
    mealsSlug: string;
  }>;
};

export async function generateMetadata({ params }: MealDetailsPageProps) {
  const { mealsSlug } = await params;

  const meal: Meal | null = await getSingleMeal(mealsSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal?.title,
    description: meal?.summary,
  };
}

export default async function MealDetailsPage({ params }: MealDetailsPageProps) {
  const { mealsSlug } = await params;

  const meal: Meal | null = await getSingleMeal(mealsSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal?.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <div className={style.header}>
        <div className={style.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={style.headerText}>
          <h1>{meal.title}</h1>
          <p className={style.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={style.summary}>{meal.summary}</p>
        </div>
      </div>
      <div>
        <p
          className={style.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </div>
    </>
  );
}
