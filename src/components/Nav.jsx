import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignedInNav from "./signedin_nav";
import SignedOutNav from "./signedout_nav";
import "../styles.css";

const Nav = () => {
  return (
    <div>
      <SignedOut>
        <SignedOutNav />
      </SignedOut>
      <SignedIn>
        <SignedInNav />
      </SignedIn>
    </div>
  );
};
export default Nav;
