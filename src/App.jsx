// import "./dist/output.css";
import "./styles.css";
import React, { createContext, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReduxAuthListener from "./components/ReduxAuthListener";

const clerkKey = "pk_test_Y2xpbWJpbmcta2lsbGRlZXItNy5jbGVyay5hY2NvdW50cy5kZXYk";

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
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/home"
      signUpFallbackRedirectUrl="/home"
      signInForceRedirectUrl="/home"
    >
      <Provider store={store}>
        <ReduxAuthListener />
        <main>
          <navContext.Provider value={{ navSelected, setNavSelected }}>
            <Outlet />
          </navContext.Provider>
        </main>
      </Provider>
    </ClerkProvider>
  );
}
