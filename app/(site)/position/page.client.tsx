"use client";
import { useState } from "react";

import { Position } from "@/lib/models";

type Props = {
  positions: Position[];
};
export default function PositionsFrontPage({ positions }: Props) {
  const [position, setPosition] = useState<Position | null>(
    positions[0] || null,
  );

  return (
    <div className="w-[1920px] flex items-center justify-center">
      <div>
        <div className="w-200 bg-[#fdf9f1] h-16 flex justify-center items-center rounded-2xl">
          <div className="flex items-center space-x-1">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${position?.team?.logo}`}
              alt="Logo"
              className="h-10"
            />
            <div>
              <h2 className="ml-2 font-bold text-lg">{position?.name}</h2>
              <h2 className="ml-2  text-sm text-gray-600">
                {position?.team?.name}
              </h2>
            </div>
          </div>
        </div>

        <div className=" h-6 flex justify-center rounded-b-2xl">
          <div className="bg-[#f25c05] h-7 w-80 flex justify-center items-center rounded-b-2xl">
            <h1 className="text-white text-lg font-semibold">
              {position?.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
