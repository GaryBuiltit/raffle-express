import "./dist/output.css";
import React, { createContext, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkKey =
  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ||
  "pk_test_Y2xpbWJpbmcta2lsbGRlZXItNy5jbGVyay5hY2NvdW50cy5kZXYk";

export const navContext = createContext();

if (clerkKey === null) {
  throw new Error("Missing Clerk Publishable Key");
}

export default function App() {
  const [navSelected, setNavSelected] = useState("home");
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={clerkKey}
      signInForceRedirectUrl="/home"
    >
      <main>
        <navContext.Provider value={{ navSelected, setNavSelected }}>
          <Outlet />
        </navContext.Provider>
      </main>
    </ClerkProvider>
  );
}
