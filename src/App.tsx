import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "features/router";
import { UserProvider } from "context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Suspense fallback={<>Ładowanie</>}>
            <Router />
          </Suspense>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
