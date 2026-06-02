import React, { useEffect, useMemo, useState } from "react";
import QrCode from "../components/QrCode";
import avatars from "../avatars";
import Contestant from "../components/contestant";
import AddContestantBtn from "../components/add_contestant_button";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { getRaffles } from "../redux/slices/raffles";
import { getAllContestants } from "../redux/slices/contestants";
import { IoMdArrowBack, IoMdRefresh, IoMdCreate } from "react-icons/io";
import RaffleFormDrawer from "../components/RaffleFormDrawer";
import { getContestantDisplayName } from "../utils/pickRandomWinner";
import WinnerPickOverlay from "../components/WinnerPickOverlay";
import Footer from "../components/footer";

export default function RafflePage() {
  const { id } = useParams();
  const raffles = useSelector((state) => state.raffles.raffles);
  const allContestants = useSelector((state) => state.contestants.contestants);
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isPickingWinner, setIsPickingWinner] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  const refreshContestants = async () => {
    if (!userId || refreshing) return;
    setRefreshing(true);
    try {
      await dispatch(getAllContestants(userId));
    } finally {
      setRefreshing(false);
    }
  };

  const raffle = useMemo(
    () => raffles?.find((r) => String(r?._id) === String(id)) ?? null,
    [raffles, id],
  );

  const contestants = useMemo(
    () =>
      allContestants?.filter((c) => String(c?.raffle) === String(id)) ?? [],
    [allContestants, id],
  );

  const handlePickWinner = () => {
    if (contestants.length === 0) return;
    setIsPickingWinner(true);
  };

  const isLoading = raffles === null || allContestants === null;
  const notFound = !isLoading && !raffle;

  useEffect(() => {
    if (!userId) return;
    if (!raffles) dispatch(getRaffles(userId));
    if (!allContestants) dispatch(getAllContestants(userId));
  }, [userId, dispatch, raffles, allContestants]);

  return (
    <div className="flex flex-col min-h-[100dvh] h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div id="confetti-bg-join" className="flex flex-col flex-1 min-h-0 page-bg">
        <div className="flex shrink-0 items-center justify-between px-4 py-2">
          <Link to="/home" className="">
            <span className="flex items-center space-x-2 text-white text-xl font-trocchi hover:text-black transition-all">
              <IoMdArrowBack className="text-2xl" />
              Back to Home
            </span>
          </Link>
          {!isLoading && !notFound && (
            <button
              type="button"
              onClick={() => setEditDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-white bg-black/50 text-white font-trocchi hover:bg-opacity-75 hover:scale-105 transition ease-in-out duration-300"
            >
              <IoMdCreate className="text-xl" />
              Edit raffle
            </button>
          )}
        </div>
        <main className="flex flex-1 flex-col min-h-0 overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <div className="flex flex-1 justify-center items-center w-full">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : notFound ? (
          <div className="flex flex-1 justify-center items-center w-full">
            <p className="text-white text-xl font-trocchi">Raffle not found.</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center mb-10">
              <h1 className="text-4xl font-trocchi font-bold text-white mb-4">
                {raffle.raffleName}
              </h1>
              <p className="text-white text-lg font-trocchi max-w-xs md:max-w-2xl text-center">
                {raffle.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-stretch md:min-h-72">
              {/* QR code signup div */}
              <div className="flex w-full flex-col items-center justify-center gap-3 py-4 md:w-1/2 md:py-0">
                <h1 className="text-3xl md:text-4xl font-trocchi font-bold text-white">
                  Scan to Join
                </h1>
                <div className="bg-white p-3 rounded-lg">
                  <QrCode
                    title={`Join Raffle ${raffle.raffleName}`}
                    value={`${import.meta.env.VITE_FRONTEND_URL}/joinraffle/${raffle.pin}`}
                  />
                </div>
              </div>

              {/* pin signup div */}
              <div className="flex w-full items-center justify-center px-4 py-4 md:w-1/2 md:py-0">
                <div className="flex flex-col items-center bg-black/75 rounded-lg px-6 py-4 space-y-4">
                  <h2 className="text-2xl text-white font-trocchi">
                    Share Pin With Contestants
                  </h2>
                  <p className="text-5xl text-btn-orange font-trocchi">
                    {raffle.pin}
                  </p>
                  <p className="text-white text-lg font-trocchi max-w-xs text-center">
                    Go to www.raffleexpress.alforddigital.com put in pin and submit form to join
                    raffle
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 mt-4">
              <p
                id="contestant-count"
                className="text-center text-white font-bold text-xl"
              >
                contestants: {contestants.length}
              </p>
              <div className="flex">
              <button
                type="button"
                onClick={refreshContestants}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 bg-black/50 rounded-full border-2 border-white text-white font-trocchi hover:bg-opacity-75 hover:scale-105 transition ease-in-out duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                <IoMdRefresh
                  className={`text-xl ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing…" : "Refresh list"}
              </button>
              <AddContestantBtn label="Add New Contestant" raffle={raffle} />
              </div>
            </div>

            <div
              id="contestants"
              className="carousel space-x-6 py-3 px-4 h-full"
            >
              {contestants.map((contestant) => (
                <div key={contestant._id} className="carousel-item">
                  <Contestant
                    avatar={avatars[contestant?.avatar]}
                    name={getContestantDisplayName(contestant)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handlePickWinner}
                disabled={contestants.length === 0 || isPickingWinner}
                className="px-4 py-2 bg-black/50 rounded-full mt-4 border-2 border-white hover:shadow-lg hover:bg-opacity-75 hover:scale-110 transition ease-in-out duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                <p className="text-2xl text-white">Pick Winner</p>
              </button>
            </div>

            <WinnerPickOverlay
              open={isPickingWinner}
              contestants={contestants}
              onClose={() => setIsPickingWinner(false)}
            />
          </div>
        )}
        </main>
        <Footer />
      </div>
      {raffle && (
        <RaffleFormDrawer
          open={editDrawerOpen}
          onClose={() => setEditDrawerOpen(false)}
          mode="edit"
          raffle={raffle}
          userId={userId}
        />
      )}
    </div>
  );
}
