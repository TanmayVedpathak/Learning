import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopQuotes from "./components/TopQuotes";
import UpdateQuotes from "./components/UpdateQuotes";
import PaginatedQuotes from "./components/PaginatedQuotes";
import InfiniteScrollQuotes from "./components/InfiniteScrollQuotes";
import QueryCancellationWithAbortSignal from "./components/QueryCancellationWithAbortSignal";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {/* <TopQuotes /> */}
        <UpdateQuotes />
        <QueryCancellationWithAbortSignal />
        <PaginatedQuotes />
        <InfiniteScrollQuotes />
      </QueryClientProvider>
    </>
  );
}

export default App;
