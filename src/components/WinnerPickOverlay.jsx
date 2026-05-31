import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import avatars from "../avatars";
import Contestant from "./contestant";
import { getContestantDisplayName, pickRandomWinner } from "../utils/pickRandomWinner";
import { buildSpinStrip, getSpinScrollOffset } from "../utils/buildSpinStrip";

const SPIN_DURATION_MS = 4200;
const ENTER_DURATION_MS = 450;

function WinnerPickOverlayContent({ contestants, onClose }) {
  const [phase, setPhase] = useState("entering");
  const [strip, setStrip] = useState([]);
  const [winner, setWinner] = useState(null);
  const [stopIndex, setStopIndex] = useState(0);

  const viewportRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const picked = pickRandomWinner(contestants);
    if (!picked) {
      onClose();
      return;
    }

    const { strip: nextStrip, stopIndex: nextStop } = buildSpinStrip(
      contestants,
      picked,
    );
    setWinner(picked);
    setStrip(nextStrip);
    setStopIndex(nextStop);

    const enterTimer = setTimeout(() => setPhase("spinning"), ENTER_DURATION_MS);
    return () => clearTimeout(enterTimer);
  }, [contestants, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useLayoutEffect(() => {
    if (phase !== "spinning" || !stripRef.current || !viewportRef.current) {
      return;
    }

    const firstItem = stripRef.current.children[0];
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth + 24;
    const target = getSpinScrollOffset(stopIndex, itemWidth);
    const el = stripRef.current;

    el.style.paddingLeft = `calc(50% - ${firstItem.offsetWidth / 2}px)`;
    el.style.transform = "translate3d(0, 0, 0)";
    el.style.transition = "none";

    let endTimer;

    const startSpin = () => {
      el.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.08, 0.82, 0.17, 1)`;
      el.style.transform = `translate3d(-${target}px, 0, 0)`;
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(startSpin);
    });

    const onTransitionEnd = (e) => {
      if (e.propertyName !== "transform") return;
      setPhase("revealed");
    };

    endTimer = setTimeout(() => setPhase("revealed"), SPIN_DURATION_MS + 150);
    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(endTimer);
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [phase, stopIndex, strip]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="winner-pick-title"
    >
      <div
        className="absolute inset-0 bg-black/75 transition-opacity duration-300"
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex w-full max-w-4xl flex-col items-center transition-all duration-500 ease-out ${
          phase === "entering"
            ? "translate-y-6 opacity-90"
            : "translate-y-0 opacity-100"
        }`}
      >
        <h2
          id="winner-pick-title"
          className="mb-6 text-center text-3xl font-trocchi font-bold text-white md:text-4xl"
        >
          {phase === "revealed" ? "We have a winner!" : "Picking a winner…"}
        </h2>

        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden rounded-2xl border-2 border-white/30 bg-black/40 py-6 shadow-2xl"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[7.5rem] -translate-x-1/2 rounded-xl border-4 border-btn-orange shadow-[0_0_24px_rgba(252,203,49,0.45)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-16 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 bg-gradient-to-l from-black/50 to-transparent" />

          <div ref={stripRef} className="flex gap-6 will-change-transform">
            {strip.map(({ contestant, key }) => (
              <div
                key={key}
                className="carousel-item flex w-[7.5rem] shrink-0 justify-center"
              >
                <Contestant
                  avatar={avatars[contestant?.avatar]}
                  name={getContestantDisplayName(contestant)}
                />
              </div>
            ))}
          </div>
        </div>

        {phase === "revealed" && winner && (
          <div className="mt-8 flex flex-col items-center">
            <div className="flex flex-col items-center rounded-2xl bg-white px-10 py-6 shadow-xl">
              <p className="mb-2 text-sm font-libre-franklin uppercase tracking-wide text-gray-500">
                Winner
              </p>
              <img
                src={avatars[winner.avatar]}
                alt=""
                className="mb-3 h-28 w-28 rounded-full ring-4 ring-btn-gold"
              />
              <p className="text-3xl font-trocchi font-bold text-gray-900">
                {getContestantDisplayName(winner)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-2 rounded-full border-2 border-white bg-black/50 text-xl text-white font-trocchi hover:bg-opacity-75 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WinnerPickOverlay({ open, contestants, onClose }) {
  if (!open) return null;
  return (
    <WinnerPickOverlayContent contestants={contestants} onClose={onClose} />
  );
}
