import api from "./api";

export const fetchTopQuotes = (config = {}) => api.get("/api/top_quotes", config).then((res) => res.quotes);

export const postQuote = (quote) => api.post("/api", quote);

export const resetQuotes = () => api.post("/api/reset", {});

export const fetchQuotesByPage = (page) => {
  const searchParams = new URLSearchParams({
    page,
  });

  return api.get(`/api?${searchParams}`).then((res) => res);
};

export const fetchQuotesByCursor = (cursor) => {
  const searchParams = new URLSearchParams({
    cursor,
  });

  return api.get(`/api?${searchParams}`).then((res) => res);
};
