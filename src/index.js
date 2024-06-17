import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CreatePage from "./routes/Create.jsx";
import JoinPage from "./routes/Join.jsx";
import SignInPage from "./routes/signin.jsx";
import SignUpPage from "./routes/signup.jsx";
import LandingPage from "./routes/landing_page.jsx";
import Home from "./routes/home.jsx";
import ContestantsPage from "./routes/contestants_Page.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "create/",
        element: <CreatePage />,
      },
      {
        path: "join/",
        element: <JoinPage />,
      },
      {
        path: "sign-in/",
        element: <SignInPage />,
      },
      {
        path: "sign-up/",
        element: <SignUpPage />,
      },
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "contestants/",
        element: <ContestantsPage />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
