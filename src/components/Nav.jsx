import React from "react";
import "../styles.css";

const Nav = () => {
  const logo =
    "https://firebasestorage.googleapis.com/v0/b/raffle-express.appspot.com/o/Raffle%20Express%20landing%20nav%20strip.png?alt=media&token=fa7db83a-b69f-42cb-9129-14ea8024f4b7";

  return (
    <div id="nav" className="pt-2 px-2 flex items-center justify-between">
      <img src={logo} alt="RE Logo" className="h-16" />
      <div className="flex flex-row text-white space-x-4 items-center text-2xl">
        <a
          href=""
          className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
        >
          <h2 className="font-libreFranklin">How It Works</h2>
        </a>
        <a
          href=""
          className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
        >
          <h2 className="font-libreFranklin">Pricing</h2>
        </a>
        <a
          href=""
          className="text-xl hover:text-btn-gold hover:text-2xl transition-all"
        >
          <h2 className="font-libreFranklin">Login</h2>
        </a>

        <button
          id="signup-btn"
          type="button"
          className="rounded-full border-4 px-4 py-1 font-bold bg-gradient-to-r from-btn-gold to-btn-orange hover:scale-110 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Nav;
