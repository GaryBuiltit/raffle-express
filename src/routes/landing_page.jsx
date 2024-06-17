import Hero from "../components/Hero";
import Nav from "../components/Nav";
import { SignedIn, SignedOut, UserProfile } from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Nav />
      <Hero />
    </div>
  );
}
