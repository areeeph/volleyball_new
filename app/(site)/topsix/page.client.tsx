"use client";
import { useState } from "react";

import { TopSix } from "@/lib/models";

type Props = {
  topsix: TopSix[];
};
export default function TopSixFrontPage({ topsix }: Props) {
  return (
    <div className=" flex items-center justify-center">
      <div>
        <div className="w-[1750] bg-[#fdf9f1] h-16 flex justify-between px-10 items-center rounded-2xl">
          {topsix.map((position) => (
            <div key={position.id} className="flex items-center space-x-1">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${position?.team?.logo}`}
                alt="Logo"
                className="h-10 rounded-lg"
              />
              <div>
                <h2 className="ml-2 font-bold text-lg">{position?.name}</h2>
                <h2 className="ml-2  text-sm text-gray-600">
                  {position?.team?.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className=" h-6 flex justify-center rounded-b-2xl">
          <div className="bg-[#f25c05] h-7 w-80 flex justify-center items-center rounded-b-2xl">
            <h1 className="text-white text-lg font-semibold">
              Top Six Players
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
