export type MealInput = {
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
  image: File;
};

export type MealToSave = Omit<MealInput, "image"> & {
  slug: string;
  image: string;
};

export type Meal = MealToSave & {
  id: number;
};

export type MealApiResponse = {
  success: boolean;
  message: string;
  data?: Meal[];
};
