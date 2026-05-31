import React from "react";
import { Link } from "react-router-dom";

export default function RaffleCard(props) {
  const title = props.raffleName ?? "";

  return (
    <div className="card border w-48 shrink-0 bg-base-100 shadow-lg h-52">
      <div className="card-body flex flex-col px-4 py-4">
        <div
          className="tooltip tooltip-top w-full max-w-full before:max-w-xs before:text-wrap before:text-left"
          data-tip={title}
        >
          <h2 className="truncate text-lg font-bold leading-tight text-btn-orange">
            {title}
          </h2>
        </div>
        <div className="flex space-x-1">
          <span className="font-semibold">End Date:</span>
          <p>{props.raffleDate}</p>
        </div>
        <div className="flex space-x-1">
          <span className="font-semibold">Contestants:</span>
          <p>{props.contestantCount}</p>
        </div>
        <div className="flex space-x-1">
          <span className="font-semibold">Winner:</span>
          <p>{props.winner}</p>
        </div>

        <div className="card-actions mt-auto justify-center">
          <Link
            to={`/raffle/${props.id}`}
            className="btn btn-primary rounded-full w-24"
          >
            view
          </Link>
        </div>
      </div>
    </div>
  );
}
