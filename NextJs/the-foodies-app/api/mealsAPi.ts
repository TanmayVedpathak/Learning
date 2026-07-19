import { Meal, MealApiResponse, MealToSave } from "@/types";

const baseURL = "http://localhost:8080";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getMeals = async (): Promise<Meal[]> => {
  try {
    const res = await fetch(`${baseURL}/meals`);

    if (!res.ok) {
      throw new Error(`Failed to fetch meals. Status: ${res.status}`);
    }

    await delay(2000);

    const response: MealApiResponse = await res.json();

    if (!response.success || !response.data) {
      throw new Error(response.message || "Meal not found");
    }

    return response.data;
  } catch (error) {
    console.error("getMeals error:", error);
    return [];
  }
};

export const getSingleMeal = async (slug: string): Promise<Meal | null> => {
  try {
    const res = await fetch(`${baseURL}/meals/${slug}`);

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch meal. Status: ${res.status}`);
    }

    await delay(2000);

    const response = await res.json();

    return response.data;
  } catch (error) {
    console.error("getSingleMeal error:", error);
    throw error;
  }
};

export const postMeal = async (meal: MealToSave): Promise<MealApiResponse> => {
  try {
    const res = await fetch(`${baseURL}/meals`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });

    if (res.status === 409) {
      return res.json();
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch meal. Status: ${res.status}`);
    }

    await delay(2000);

    const response = await res.json();

    return response.data;
  } catch (error) {
    console.error("getSingleMeal error:", error);
    throw error;
  }
};

// const meal: Meal = {
//   id: 1,
//   title: "Creamy Garlic Pasta",
//   slug: "creamy-garlic-pasta",
//   image: "/images/creamy-garlic-pasta.jpg",
//   summary: "A rich and creamy pasta tossed with garlic, herbs, parmesan cheese, and a smooth white sauce.",
//   instructions: `
//     1. Boil the pasta:
//        Cook 200g of pasta in salted boiling water until al dente. Drain and keep aside.

//     2. Prepare the garlic:
//        Heat 1 tablespoon of butter in a pan. Add chopped garlic and sauté for 30 seconds until fragrant.

//     3. Make the sauce:
//        Add 1 tablespoon of flour and stir for a minute. Slowly pour in 1 cup of milk while stirring continuously.

//     4. Add cheese and seasoning:
//        Add grated parmesan cheese, salt, black pepper, and mixed herbs. Stir until the sauce becomes smooth and creamy.

//     5. Combine pasta and sauce:
//        Add the cooked pasta to the sauce and mix well until every piece is coated.

//     6. Serve:
//        Garnish with parsley and extra cheese. Serve hot.
//   `,
//   creator: "Aarav Mehta",
//   creator_email: "aarav.mehta@example.com",
// };
