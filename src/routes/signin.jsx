import { SignIn } from "@clerk/clerk-react";
import Nav from "../components/Nav";
import Footer from "../components/footer";

export default function SignInPage() {
  return (
    <div className="bg-gradient-to-r from-btn-gold to-btn-orange flex flex-col min-h-[100dvh]">
      <Nav />
      <main className="flex flex-1 flex-col justify-center items-center px-4 py-6 min-h-0">
        <div className="w-full max-w-md">
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
