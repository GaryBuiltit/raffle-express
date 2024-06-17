import { SignIn, SignUp } from "@clerk/clerk-react";
import Nav from "../components/Nav";

export default function SignInPage() {
  return (
    <div className="bg-gradient-to-r from-btn-gold to-btn-orange h-screen">
      <Nav />
      <div className="flex justify-center items-center pt-10">
        <SignIn path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
