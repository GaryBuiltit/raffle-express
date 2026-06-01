import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { navContext } from "../App";
import { logo } from "../assets/images.js";

const NAV_LINKS = [
  { to: "/home", label: "Home", key: "home" },
  { to: "/contestants", label: "Contestants", key: "contestants" },
];

const userButtonAppearance = {
  elements: {
    avatarBox: "h-20 w-20",
  },
};

function NavLink({ to, label, navKey, navSelected, onNavigate }) {
  const isActive = navSelected === navKey;

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`${
        isActive ? "text-3xl" : "text-xl hover:text-3xl"
      } hover:text-btn-gold transition-all`}
    >
      <h2
        className={`font-libreFranklin ${
          isActive ? "text-btn-gold" : "text-white"
        }`}
      >
        {label}
      </h2>
    </Link>
  );
}

export default function SignedInNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navSelected, setNavSelected } = useContext(navContext);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    setNavSelected(location.pathname.split("/")[1]);
    closeMenu();
  }, [location.pathname, setNavSelected]);

  return (
    <nav className="relative z-50 w-full bg-black py-2">
      <div className="px-4 flex justify-between items-center">
        <div className="pt-2">
          <Link to="/home" onClick={closeMenu}>
            <img src={logo} alt="Raffle Express Logo" className="h-16" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center text-2xl">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.key}
              to={link.to}
              label={link.label}
              navKey={link.key}
              navSelected={navSelected}
            />
          ))}
        </div>

        <div className="hidden md:block">
          <UserButton appearance={userButtonAppearance} />
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="signed-in-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`block hambuger mr-2 md:hidden focus:outline-none ${
            menuOpen ? "open" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="hamburger-top" />
          <span className="hamburger-middle" />
          <span className="hamburger-bottom" />
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <div
            id="signed-in-mobile-menu"
            className="absolute left-0 right-0 top-full z-50 flex flex-col border-t border-white/20 bg-black shadow-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 px-6 font-bold">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.to}
                  label={link.label}
                  navKey={link.key}
                  navSelected={navSelected}
                  onNavigate={closeMenu}
                />
              ))}
              <div className="pt-2 border-t border-white/20 w-full flex justify-center">
                <UserButton appearance={userButtonAppearance} />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
