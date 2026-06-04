import { z } from "zod";

const url = "https://www.course-api.com/react-tours-project";

export const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  info: z.string(),
  price: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;

export const fetchTours = async (): Promise<Tour[]> => {
  const response = await fetch(url);
  const result = tourSchema.array().safeParse(await response.json());

  if (!result.success) {
    throw new Error("Parsing failed");
  }

  return result.data;
};
