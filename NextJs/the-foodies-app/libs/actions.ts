"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MealInput } from "@/types";

import { saveMeal } from "./meals";

type ShareMealState = {
  message: string | null;
};

const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${key} is required`);
  }

  return value;
};

const getFileValue = (formData: FormData, key: string): File => {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    throw new Error(`${key} is required`);
  }

  return value;
};

export async function shareMeal(prevState: ShareMealState, formData: FormData): Promise<ShareMealState> {
  try {
    const meal: MealInput = {
      title: getStringValue(formData, "title"),
      summary: getStringValue(formData, "summary"),
      instructions: getStringValue(formData, "instructions"),
      creator: getStringValue(formData, "name"),
      creator_email: getStringValue(formData, "email"),
      image: getFileValue(formData, "image"),
    };

    const result = await saveMeal(meal);

    console.log("postMeal result:", result);

    // revalidatePath("/meals", "layout");
    revalidatePath("/meals");
    redirect("/meals");
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Invalid input. Please try again.",
    };
  }
}
