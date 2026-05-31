import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/sign-in", label: "Login", key: "sign-in" },
  { to: "/sign-up", label: "Sign Up", key: "sign-up", isButton: true },
];

function NavLink({ to, label, isButton, onNavigate }) {
  if (isButton) {
    return (
      <Link
        to={to}
        onClick={onNavigate}
        className="rounded-full border-4 px-4 py-1 font-bold bg-gradient-to-r from-btn-gold to-btn-orange hover:scale-110 transition duration-300"
      >
        <span className="font-libreFranklin text-white">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="text-xl cursor-pointer font-bold hover:text-btn-gold hover:text-2xl transition-all"
    >
      <h2 className="font-libreFranklin text-white">{label}</h2>
    </Link>
  );
}

export default function SignedOutNav() {
  const logo = "/src/assets/logo.png";
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav className="relative z-50 w-full bg-black py-2">
      <div className="px-4 flex justify-between items-center">
        <div className="pt-2">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Raffle Express Logo" className="h-16" />
          </Link>
        </div>

        <div className="hidden md:flex text-white space-x-4 items-center text-2xl">
          <NavLink to="/sign-in" label="Login" />
          <Link
            to="/sign-up"
            className="rounded-full border-4 px-4 py-1 font-bold bg-gradient-to-r from-btn-gold to-btn-orange hover:scale-110 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="signed-out-mobile-menu"
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
            id="signed-out-mobile-menu"
            className="absolute left-0 right-0 top-full z-50 flex flex-col border-t border-white/20 bg-black shadow-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 px-6 font-bold">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.to}
                  label={link.label}
                  isButton={link.isButton}
                  onNavigate={closeMenu}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
