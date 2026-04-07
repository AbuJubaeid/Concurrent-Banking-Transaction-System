import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { SocketProvider } from "./context/SocketProvider";
import "./index.css";
import { router } from "./Routes/Route";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
    </QueryClientProvider>
  </StrictMode>
);