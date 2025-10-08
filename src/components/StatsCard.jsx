import { TrendingUp } from "lucide-react";
import React from "react";

export default function StatsCard() {
  return (
    <div className="border border-neutral-500 w-1/4 bg-neutral-100 p-4 py-8 rounded-md mt-4">
      <div className="flex items-center justify-between mb-4">
        <span>
          {" "}
          <p className="text-neutral-600 text-sm font-medium">Total Revenue</p>
          <h3 className="text-3xl font-semibold ">$1,250.00</h3>
        </span>
        <span className="flex items-center gap-1 text-sm bg-green-600 text-white rounded p-1 font-medium">
          <TrendingUp size={17} />
          +20%
        </span>
      </div>
      <div>
        <p className="flex items-center gap-1 text-sm font-medium text-neutral-600 mb-1">
          Trending up this month <TrendingUp size={17} />
        </p>
        <p>Visitors for the last 6 months</p>
      </div>
    </div>
  );
}
