"use client";

import { Score, Team, TopTen } from "@/lib/models";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

type Props = {
  scores: Score[];
};

export default function TopTenPage({ scores }: Props) {
  const [tops, setTops] = useState<TopTen[]>(scores[0].topTen);
  const [team1, setTeam1] = useState<Team>(scores[0].team1);
  const [team2, setTeam2] = useState<Team>(scores[0].team2);
  useEffect(() => {
    socket.connect();

    const handleCreated = (data: any) => {
      setTops(data.data.topTen);
      setTeam1(data.data.team1);
      setTeam2(data.data.team2);
    };

    socket.on("score:updated", handleCreated);

    return () => {
      socket.off("score:updated", handleCreated);
      socket.disconnect();
    };
  }, []);
  return (
    <div className="mx-auto py-5">
      <div className="bg-white/40 w-60 h-140 backdrop-blur-md rounded-xl shadow">
        <div className="py-5">
          <h2 className="text-center text-neutral-800 mb-2 text-lg font-semibold">
            Last 10 Points
          </h2>
          {tops
            .slice(-10)
            .reverse()
            .map((top, index) => (
              <div key={index} className="grid grid-cols-2">
                <div className="border-r border-gray-300 flex justify-end">
                  {top.team.id === team1.id && (
                    <div className="py-2 px-3 flex items-center space-x-2">
                      <p className="text-lg">{top.score}</p>
                      <img src="/ball.png" className="w-6 h-6" alt="Ball" />
                    </div>
                  )}
                </div>
                <div>
                  {top.team.id === team2.id && (
                    <div className="py-2 px-3 flex items-center space-x-2">
                      <img src="/ball.png" className="w-6 h-6" />
                      <p className="text-lg">{top.score}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-300 flex justify-end">
              <div className="py-2 px-3 flex items-center space-x-2">
                <p className="text-lg">{team1?.name}</p>
              </div>
            </div>
            <div>
              <div className="py-2 px-3 flex items-center space-x-2">
                <p className="text-lg">{team2?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
