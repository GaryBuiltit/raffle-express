import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CreatePage from "./routes/Create.jsx";
import RafflePage from "./routes/RafflePage.jsx";
import SignInPage from "./routes/signin.jsx";
import SignUpPage from "./routes/signup.jsx";
import LandingPage from "./routes/landing_page.jsx";
import Home from "./routes/home.jsx";
import ContestantsPage from "./routes/contestants_Page.jsx";
import JoinRafflePage from "./routes/join_raffle_page.jsx";

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
        path: "joinraffle/:pin",
        element: <JoinRafflePage />,
      },
      {
        path: "raffle/:id",
        element: <RafflePage />,
      },
      {
        path: "sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "sign-up/*",
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
  </StrictMode>,
);
