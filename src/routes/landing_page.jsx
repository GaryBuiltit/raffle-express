import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/home");
    }
  }, [isLoaded]);

  return (
    <div className="bg-black flex flex-col min-h-[100dvh]">
      <Nav />
      <main className="flex flex-1 flex-col min-h-0">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
