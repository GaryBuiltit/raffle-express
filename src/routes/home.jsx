import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import RaffleCard from "../components/raffleCard";
import Footer from "../components/footer";
import { useAuth, useSignUp } from "@clerk/clerk-react";

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const raffles = [
    {
      "raffle-name": "free site raffle",
      "end-date": "2024-3-24",
      "end-time": "",
      "signup-fields": ["name", "phone", "email"],
      contestants: [],
    },
    {
      "raffle-name": "free site raffle",
      "end-date": "2024-7-23",
      "end-time": "",
      "signup-fields": ["name", "phone", "email"],
      contestants: [],
    },
    {
      "raffle-name": "free site raffle",
      "end-date": "2024-7-23",
      "end-time": "",
      "signup-fields": ["name", "phone", "email"],
      contestants: [],
    },
    {
      "raffle-name": "free site raffle",
      "end-date": "2024-7-23",
      "end-time": "",
      "signup-fields": ["name", "phone", "email"],
      contestants: [],
    },
  ];

  useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  return (
    <div className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div className="flex flex-col h-full page-bg">
        <Nav />
        <div className="flex md:mx-32 bg-white rounded-t-3xl h-full mt-10">
          <div
            id="raffles-section"
            className="flex overflow-x-auto flex-col py-4 px-6"
          >
            <h2 className="text-3xl font-bold">
              {" "}
              My Raffles - {raffles.length}
            </h2>
            <div className="carousel rounded-box space-x-6 py-3">
              {raffles.map((raffle, index) => {
                return (
                  <div className="carousel-item">
                    <RaffleCard
                      raffleName={raffle["raffle-name"]}
                      raffleDate={raffle["end-date"]}
                      contestantCount={raffle.contestants.length}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
