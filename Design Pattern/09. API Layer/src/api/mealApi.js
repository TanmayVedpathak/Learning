import api from "./api";

const URLS = {
  getMeal: "search.php",
};

export const searchMeals = (query, config = {}) => {
  const searchParams = new URLSearchParams({
    s: query,
  });

  return api
    .get(`${URLS.getMeal}?${searchParams}`, {
      baseURL: "https://www.themealdb.com/api/json/v1/1/",
      ...config,
    })
    .then((res) => res.meals);
};
