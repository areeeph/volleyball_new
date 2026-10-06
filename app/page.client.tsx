"use client";
import { useState, useEffect } from "react";

import { Score, Team, Set } from "@/lib/models";
import Image from "next/image";
import { socket } from "@/lib/socket";

import ScoreForm from "@/components/forms/score-form";

type Props = {
  teams: Team[];
  scores: Score[];
};
export default function ScorePage({ teams, scores }: Props) {
  const [score, setScore] = useState<Score | null>(scores[0] || null);
  const [sets, setSets] = useState<Set[]>(score?.sets || []);
  const [team1, setTeam1] = useState<Team | null>(score?.team1 || null);
  const [team2, setTeam2] = useState<Team | null>(score?.team2 || null);

  useEffect(() => {
    socket.connect();

    const handleCreated = (data: any) => {
      console.log("New match:", data);
      console.log("New match sets:", data.data.sets);
      setSets(data.data.sets);
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
    <div>
      <div className="bg-blue-800 text-white h-9 min-w-55 mb-1 rounded-lg w-80">
        <div className="flex items-center h-9 justify-between">
          <div className="flex items-center py-1 pl-3">
            <h2 id="team1-name">{team1?.name || "Team 1"}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center h-9 py-1">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team1?.logo}`}
                alt={team1?.name || "Team 1"}
                width={50}
                height={50}
                className="h-7 w-7 rounded-full"
              />
            </div>

            {sets.map((set, index) => (
              <div
                key={index}
                className="m-0 w-9 h-9 bg-white text-blue-700 font-semibold flex items-center justify-center last:rounded-r-lg last:bg-red-600 last:text-white"
              >
                <h3 id={`team1-score-${index}`}>{set.team1_score || 0}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-blue-800 text-white h-9 min-w-55  rounded-lg w-80">
        <div className="flex items-center h-9 justify-between">
          <div className="flex items-center py-1 pl-3">
            <h2 id="team2-name">{team2?.name || "Team 2"}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center h-9 py-1">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team2?.logo}`}
                alt={team2?.name || "Team 2"}
                width={50}
                height={50}
                className="h-7 w-7 rounded-full"
              />
            </div>

            {sets.map((set, index) => (
              <div
                key={index}
                className="m-0 w-9 h-9 bg-white text-blue-700 font-semibold flex items-center justify-center last:rounded-r-lg last:bg-red-600 last:text-white"
              >
                <h3 id={`team2-score-${index}`}>{set.team2_score || 0}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
