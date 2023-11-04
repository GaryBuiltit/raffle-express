import "./dist/output.css";
import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Nav />
      <Hero />
    </div>
  );
}
