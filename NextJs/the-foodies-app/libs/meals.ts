import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";
import xss from "xss";

import { postMeal } from "@/api/mealsAPi";

import { MealInput, MealToSave } from "@/types";

export async function saveMeal(meal: MealInput) {
  let imagePath = "";

  try {
    const slug = slugify(meal.title, { lower: true });
    const instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();

    if (!extension) {
      throw new Error("Invalid image file extension.");
    }

    const fileName = `${slug}.${extension}`;
    imagePath = path.join(process.cwd(), "public", "images", fileName);

    const arrayBuffer = await meal.image.arrayBuffer();
    const bufferedImage = Buffer.from(arrayBuffer);

    await fs.writeFile(imagePath, bufferedImage);

    const mealToSave: MealToSave = {
      title: meal.title,
      slug,
      image: `/images/${fileName}`,
      summary: meal.summary,
      instructions,
      creator: meal.creator,
      creator_email: meal.creator_email,
    };

    const result = await postMeal(mealToSave);

    return result;
  } catch (error) {
    if (imagePath) {
      try {
        await fs.unlink(imagePath);
      } catch {
        // Ignore cleanup error
      }
    }

    console.error("saveMeal error:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Failed to save meal.");
  }
}
