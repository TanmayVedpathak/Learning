import http, { IncomingMessage, ServerResponse } from "http";

import { Meal } from "./types";

type CreateMealBody = Omit<Meal, "id">;
type UpdateMealBody = Partial<CreateMealBody>;

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const PORT = 8080;

let meals: Meal[] = [
  {
    id: 1,
    title: "Juicy Cheese Burger",
    slug: "juicy-cheese-burger",
    image: "/images/burger.jpg",
    summary: "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  {
    id: 2,
    title: "Spicy Curry",
    slug: "spicy-curry",
    image: "/images/curry.jpg",
    summary: "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
    instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
    creator: "Max Schwarz",
    creator_email: "max@example.com",
  },
  {
    id: 3,
    title: "Homemade Dumplings",
    slug: "homemade-dumplings",
    image: "/images/dumplings.jpg",
    summary: "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
    instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.
    `,
    creator: "Emily Chen",
    creator_email: "emilychen@example.com",
  },
  {
    id: 4,
    title: "Classic Mac n Cheese",
    slug: "classic-mac-n-cheese",
    image: "/images/macncheese.jpg",
    summary: "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    id: 5,
    title: "Authentic Pizza",
    slug: "authentic-pizza",
    image: "/images/pizza.jpg",
    summary: "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
    instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    id: 6,
    title: "Wiener Schnitzel",
    slug: "wiener-schnitzel",
    image: "/images/schnitzel.jpg",
    summary: "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
    instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
         Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
         Serve hot with a slice of lemon and a side of potato salad or greens.
    `,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
  },
  {
    id: 7,
    title: "Fresh Tomato Salad",
    slug: "fresh-tomato-salad",
    image: "/images/tomato-salad.jpg",
    summary: "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
    instructions: `
      1. Prepare the tomatoes:
         Slice fresh tomatoes and arrange them on a plate.

      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.

      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.

      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

function sendJson<T>(res: ServerResponse, statusCode: number, data: ApiResponse<T>): void {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

function getRequestBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function isCreateMealBody(body: Partial<CreateMealBody>): body is CreateMealBody {
  return Boolean(body.title && body.slug && body.image && body.summary && body.instructions && body.creator && body.creator_email);
}

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `http://${host}`);

  const method = req.method;
  const pathname = url.pathname;

  // GET /meals
  if (method === "GET" && pathname === "/meals") {
    return sendJson<Meal[]>(res, 200, {
      success: true,
      message: "All meals",
      data: meals,
    });
  }

  // GET /meals/:slug
  if (method === "GET" && pathname.startsWith("/meals/")) {
    const slug = pathname.split("/")[2];

    const meal = meals.find((item) => item.slug === slug);

    if (!meal) {
      return sendJson<null>(res, 404, {
        success: false,
        message: "Meal not found",
      });
    }

    return sendJson<Meal>(res, 200, {
      success: true,
      message: "Single meals",
      data: meal,
    });
  }

  // POST /meals
  if (method === "POST" && pathname === "/meals") {
    try {
      const body = await getRequestBody<Partial<CreateMealBody>>(req);

      if (!isCreateMealBody(body)) {
        return sendJson<null>(res, 400, {
          success: false,
          message: "All fields are required",
        });
      }

      const slugExists = meals.some((meal) => meal.slug === body.slug);

      if (slugExists) {
        return sendJson<null>(res, 409, {
          success: false,
          message: "Meal slug already exists",
        });
      }

      const newMeal: Meal = {
        id: meals.length ? meals[meals.length - 1].id + 1 : 1,
        ...body,
      };

      meals.push(newMeal);

      return sendJson<Meal>(res, 201, {
        success: true,
        message: "Meal created successfully",
        data: newMeal,
      });
    } catch {
      return sendJson<null>(res, 400, {
        success: false,
        message: "Invalid JSON body",
      });
    }
  }

  // PUT /meals/:slug
  if (method === "PUT" && pathname.startsWith("/meals/")) {
    try {
      const slug = pathname.split("/")[2];
      const body = await getRequestBody<UpdateMealBody>(req);

      const mealIndex = meals.findIndex((meal) => meal.slug === slug);

      if (mealIndex === -1) {
        return sendJson<null>(res, 404, {
          success: false,
          message: "Meal not found",
        });
      }

      const currentMeal = meals[mealIndex];

      const updatedMeal: Meal = {
        ...currentMeal,
        title: body.title ?? currentMeal.title,
        slug: body.slug ?? currentMeal.slug,
        image: body.image ?? currentMeal.image,
        summary: body.summary ?? currentMeal.summary,
        instructions: body.instructions ?? currentMeal.instructions,
        creator: body.creator ?? currentMeal.creator,
        creator_email: body.creator_email ?? currentMeal.creator_email,
      };

      meals[mealIndex] = updatedMeal;

      return sendJson<Meal>(res, 200, {
        success: true,
        message: "Meal updated successfully",
        data: updatedMeal,
      });
    } catch {
      return sendJson<null>(res, 400, {
        success: false,
        message: "Invalid JSON body",
      });
    }
  }

  // DELETE /meals/:slug
  if (method === "DELETE" && pathname.startsWith("/meals/")) {
    const slug = pathname.split("/")[2];

    const mealExists = meals.some((meal) => meal.slug === slug);

    if (!mealExists) {
      return sendJson<null>(res, 404, {
        success: false,
        message: "Meal not found",
      });
    }

    meals = meals.filter((meal) => meal.slug !== slug);

    return sendJson<null>(res, 200, {
      success: true,
      message: "Meal deleted successfully",
    });
  }

  return sendJson<null>(res, 404, {
    success: false,
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
