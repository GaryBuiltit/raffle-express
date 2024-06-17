import React from "react";
import { Link } from "react-router-dom";
export default function RaffleCard(props) {
  return (
    <div className="card border w-48 bg-base-100 shadow-lg my-2 h-auto">
      <div className="card-body px-4">
        <h2 className="card-title text-btn-orange">{props.raffleName}</h2>
        <div className="flex space-x-1">
          <span className="font-semibold">End Date:</span>
          <p>{props.raffleDate}</p>
        </div>
        <div className="flex space-x-1">
          <span className="font-semibold">Contestants:</span>
          <p>{props.contestantCount}</p>
        </div>

        <div className="card-actions justify-center">
          <Link to={"/join"} className="btn btn-primary">
            view
          </Link>
        </div>
      </div>
    </div>
  );
}
