import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import RaffleCard from "../components/raffleCard";
import Footer from "../components/footer";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { getRaffles } from "../redux/slices/raffles";
import { getAllContestants } from "../redux/slices/contestants";
import { getUser } from "../redux/slices/user";
import { IoMdRefresh, IoMdAdd } from "react-icons/io";
import RaffleFormDrawer from "../components/RaffleFormDrawer";

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  const raffles = useSelector((state) => state.raffles.raffles);
  const contestants = useSelector((state) => state.contestants.contestants);
  const dbUser = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const refreshRaffles = async () => {
    if (!userId || refreshing) return;
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(getRaffles(userId)),
        dispatch(getAllContestants(userId)),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!userId || !clerkUser?.primaryEmailAddress?.emailAddress) return;
    if (dbUser?.userID === userId) return;

    const email = clerkUser.primaryEmailAddress.emailAddress;
    const name =
      clerkUser.fullName ||
      [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(" ") ||
      undefined;
    const userName = clerkUser.username || undefined;
    const firstName = clerkUser.first_name || undefined;
    const lastName = clerkUser.last_name || undefined;
    dispatch(getUser({ clerkId: userId, email, name, userName, firstName, lastName }));
  }, [userId, clerkUser, dispatch]);

  useEffect(() => {
    if (!userId || !dbUser) return;

    const needsRaffles = raffles === null;
    const needsContestants = contestants === null;

    if (!needsRaffles && !needsContestants) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetches = [];
    if (needsRaffles) fetches.push(dispatch(getRaffles(userId)));
    if (needsContestants) fetches.push(dispatch(getAllContestants(userId)));

    Promise.all(fetches).finally(() => setLoading(false));
  }, [userId, dbUser, dispatch]);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/");
    }
  }, [isLoaded]);

  return (
    <div className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div className="flex flex-col min-h-0 flex-1 h-full page-bg">
        <Nav />
        <div className="flex flex-1 min-h-0 flex-col mx-4 md:mx-32 bg-white rounded-t-3xl mt-10">
          <div
            id="raffles-section"
            className="flex flex-col flex-1 min-h-0 py-4 px-6 w-full"
          >
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 mb-4">
              <h2 className="text-3xl font-bold">
                My Raffles - {raffles?.length ?? 0}
              </h2>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCreateDrawerOpen(true)}
                  disabled={!userId || loading}
                  className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full border-2 border-btn-orange bg-btn-gold/40 text-gray-800 font-trocchi hover:bg-btn-gold/60 transition ease-in-out duration-300 disabled:opacity-50"
                >
                  <IoMdAdd className="text-xl" />
                  New raffle
                </button>
                <button
                  type="button"
                  onClick={refreshRaffles}
                  disabled={refreshing || !userId || loading}
                  className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full border-2 border-btn-orange text-gray-800 font-trocchi hover:bg-btn-gold/30 transition ease-in-out duration-300 disabled:opacity-50"
                >
                  <IoMdRefresh
                    className={`text-xl ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing…" : "Refresh list"}
                </button>
              </div>
            </div>
            {!loading ? (
              <div
                className="flex flex-1 min-h-0 flex-col items-center gap-4 overflow-y-auto py-3
                  md:flex-row md:flex-wrap md:items-start md:justify-start md:content-start md:gap-6"
              >
                {raffles?.length ? (
                  raffles.map((raffle) => {
                    const contestantCount =
                      contestants?.filter(
                        (c) => String(c.raffle) === String(raffle._id),
                      ).length ?? 0;
                    return (
                      <RaffleCard
                        key={raffle._id}
                        raffleName={raffle.raffleName}
                        raffleDate={raffle.endDate}
                        contestantCount={contestantCount}
                        winner={raffle.winner}
                        id={raffle._id}
                      />
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-lg">No raffles yet.</p>
                )}
              </div>
            ) : (
              <div className="flex space-x-2 items-center justify-center h-full w-full">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                <span className="loading loading-ring loading-xl"></span>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <RaffleFormDrawer
        open={createDrawerOpen}
        onClose={() => setCreateDrawerOpen(false)}
        mode="create"
        userId={userId}
      />
    </div>
  );
}
