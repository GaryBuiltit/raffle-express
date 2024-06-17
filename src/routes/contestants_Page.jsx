import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/footer";

export default function ContestantsPage() {
  const contestants = [
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 2,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 4,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 1,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 11,
    },
    {
      raffle: "324",
      name: "joe smotts",
      email: "joe@mail.com",
      phone: "777-888-9999",
      avatar: 8,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-r from-btn-gold to-btn-orange overflow-hidden">
      <div className="flex flex-col h-full page-bg">
        <Nav />
        <div className="flex md:mx-32 bg-white rounded-t-3xl h-full mt-10">
          <div
            id="raffles-section"
            className="flex overflow-x-auto flex-col py-4 px-6 w-full"
          >
            <h2 className="text-3xl font-bold">
              Contestants - {contestants.length}
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
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
                  {contestants.map((contestant, index) => {
                    return (
                      <tr className="hover:bg-btn-gold">
                        <th>{index + 1}</th>
                        <td>{contestant.name}</td>
                        <td>{contestant.email}</td>
                        <td>{contestant.phone}</td>
                        <td>{contestant.raffle}</td>
                      </tr>
                    );
                  })}
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
