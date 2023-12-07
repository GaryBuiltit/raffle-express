import { StrictMode } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import CreatePage from "./routes/Create";
import JoinPage from "./routes/Join";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "create/",
        element: <CreatePage />,
      },
      {
        path: "join/",
        element: <JoinPage />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
