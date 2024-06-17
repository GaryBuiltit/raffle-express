import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { navContext } from "../App";

export default function SignedInNav() {
  const logo =
    "https://firebasestorage.googleapis.com/v0/b/raffle-express.appspot.com/o/Raffle%20Express%20landing%20nav%20strip.png?alt=media&token=fa7db83a-b69f-42cb-9129-14ea8024f4b7";

  const hamMenuBtn = document.getElementById("menu-btn");
  const hamMenu = document.getElementById("menu");
  const { navSelected, setNavSelected } = useContext(navContext);

  const menuHandler = () => {
    hamMenuBtn.classList.toggle("open");
    hamMenu.classList.toggle("hidden");
    hamMenu.classList.toggle("flex");
  };

  const navClickHandler = (selection) => {
    setNavSelected(selection);
  };

  return (
    <nav className="relative container mx-auto">
      <div id="nav" className="px-2 flex items-center justify-between">
        <div className="pt-2">
          <Link to={"/home"}>
            <img src={logo} alt="Raffle Express Logo" className="h-16" />
          </Link>
        </div>

        {/* menu */}
        <div className="hidden md:flex space-x-4 items-center text-2xl">
          <Link
            to={"/home"}
            onClick={() => {
              navClickHandler("home");
            }}
            className={`${
              navSelected == "home" ? "text-3xl" : "text-xl hover:text-3xl"
            } hover:text-btn-gold transition-all`}
          >
            <h2
              id="nav-home"
              className={`font-libreFranklin ${
                navSelected == "home" ? "text-btn-gold" : "text-white"
              }`}
            >
              Home
            </h2>
          </Link>
          <Link
            to={"/contestants"}
            onClick={() => {
              navClickHandler("contestants");
            }}
            className={`${
              navSelected == "contestants"
                ? "text-3xl"
                : "text-xl hover:text-3xl"
            } hover:text-btn-gold transition-all`}
          >
            <h2
              id="nav-home"
              className={`font-libreFranklin ${
                navSelected == "contestants" ? "text-btn-gold" : "text-white"
              }`}
            >
              Contestants
            </h2>
          </Link>
          <Link
            to={"/create"}
            onClick={() => {
              navClickHandler("new raffle");
            }}
            className={`${
              navSelected == "new raffle"
                ? "text-3xl"
                : "text-xl hover:text-3xl"
            } hover:text-btn-gold transition-all`}
          >
            <h2
              id="nav-new-raffle"
              className={`font-libreFranklin ${
                navSelected == "new raffle" ? "text-btn-gold" : "text-white"
              }`}
            >
              New Raffle
            </h2>
          </Link>
        </div>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-16 w-16",
            },
          }}
        />

        <button
          id="menu-btn"
          className="block hambuger mr-2 md:hidden focus:outline-none"
          onClick={menuHandler}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="md:hidden">
        <div
          id="menu"
          className="absolute rounded-md flex-col hidden items-center self-end py-8 mt-6 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
        >
          <a href="#">Pricing</a>
          <a href="#">Product</a>
        </div>
      </div>
    </nav>
  );
}
