import { SignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/footer";

export default function SignUpPage() {
  return (
    <div className="bg-gradient-to-r from-btn-gold to-btn-orange min-h-[100dvh] md:overflow-y-hidden">
      <Nav />
      <div className="flex justify-center items-center py-6">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/home"
        />
      </div>
      <Footer />
    </div>
  );
}
