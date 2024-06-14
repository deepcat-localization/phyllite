import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FindReplace from "./examples/find-replace/index.tsx";
import HighlightSingleTerm from "./examples/highlight-single-term/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/examples",
    children: [
      { path: "find-replace", element: <FindReplace /> },
      { path: "highlight-single-term", element: <HighlightSingleTerm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
