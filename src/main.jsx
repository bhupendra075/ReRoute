import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { getRouter } from "./router"
import "./styles.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={getRouter()} initialEntry="/">
    </RouterProvider>
  </React.StrictMode>,
)