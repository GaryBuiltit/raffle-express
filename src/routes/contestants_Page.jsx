import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { getAllContestants } from "../redux/slices/contestants";
import { useAuth } from "@clerk/clerk-react";
import { IoMdRefresh } from "react-icons/io";

export default function ContestantsPage() {
  const contestants = useSelector((state) => state.contestants.contestants);
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refreshContestants = async () => {
    if (!userId || refreshing) return;
    setRefreshing(true);
    try {
      await dispatch(getAllContestants(userId));
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    if (contestants !== null) {
      setLoading(false);
      return;
    }

    setLoading(true);
    dispatch(getAllContestants(userId)).finally(() => setLoading(false));
  }, [userId, dispatch]);

  return (
    <div className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div className="flex flex-col min-h-0 flex-1 h-full page-bg">
        <Nav />
        <div className="flex flex-1 min-h-0 flex-col mx-4 md:mx-32 bg-white rounded-t-3xl mt-10">
          <div
            id="contestants-section"
            className="flex flex-col flex-1 min-h-0 py-4 px-6 w-full"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 mb-4">
              <h2 className="text-3xl font-bold">
                Contestants - {contestants?.length ?? 0}
              </h2>
              <button
                type="button"
                onClick={refreshContestants}
                disabled={refreshing || !userId}
                className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full border-2 border-btn-orange text-gray-800 font-trocchi hover:bg-btn-gold/30 transition ease-in-out duration-300 disabled:opacity-50"
              >
                <IoMdRefresh
                  className={`text-xl ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing…" : "Refresh list"}
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Raffle</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <span className="loading loading-ring loading-xs"></span>
                        <span className="loading loading-ring loading-sm"></span>
                        <span className="loading loading-ring loading-md"></span>
                        <span className="loading loading-ring loading-lg"></span>
                        <span className="loading loading-ring loading-xl"></span>
                      </td>
                    </tr>
                  ) : contestants?.length ? (
                    contestants.map((contestant, index) => (
                      <tr key={contestant._id ?? index} className="hover:bg-btn-gold">
                        <th>{index + 1}</th>
                        <td>
                          {contestant.fullName ||
                            `${contestant.firstName ?? ""} ${contestant.lastName ?? ""}`.trim() ||
                            contestant.name}
                        </td>
                        <td>{contestant.email}</td>
                        <td>{contestant.phone}</td>
                        <td>{contestant.raffleName || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500">
                        No contestants yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
