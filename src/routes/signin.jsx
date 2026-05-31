import { SignIn } from "@clerk/clerk-react";
import Nav from "../components/Nav";
import Footer from "../components/footer";

export default function SignInPage() {
  return (
    <div className="bg-gradient-to-r from-btn-gold to-btn-orange min-h-screen">
      <Nav />
      <div className="flex justify-center items-center py-6">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
      <Footer />
    </div>
  );
}
