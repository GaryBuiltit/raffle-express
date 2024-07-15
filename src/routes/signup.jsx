import { SignUp, useAuth, useSignUp } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";

export default function SignUpPage() {
  return (
    <div className="bg-gradient-to-r from-btn-gold to-btn-orange h-screen">
      <Nav />
      <div className="flex justify-center items-center pt-6">
        <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/home" />
      </div>
    </div>
  );
}
