import { Suspense } from "react";

import { Metadata } from "next";
import Link from "next/link";

import { Loader } from "@/components";
import MealsGrid from "@/components/meals/MealsGrid";

import { getMeals } from "@/api/mealsAPi";

import { Meal } from "@/types";

import style from "./page.module.css";

export const metadata: Metadata = {
  title: "All meals",
  description: "Browser meals share by our community",
};

const Meals = async () => {
  const meals: Meal[] = await getMeals();

  return <MealsGrid meals={meals} />;
};

export default function MealsPage() {
  return (
    <>
      <div className={style.header}>
        <h1>
          Delicious meals, created <span className={style.highlight}>by you</span>
        </h1>
        <p>Chose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={style.cta}>
          <Link href="/meal/share">Share Your Favorite Recipe</Link>
        </p>
      </div>
      <div className={style.main}>
        <Suspense fallback={<Loader text="Fetching Meals..." />}>
          <Meals />
        </Suspense>
      </div>
    </>
  );
}
