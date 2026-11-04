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
export default function ScoreFrontPage({ teams, scores }: Props) {
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
    <div className="inline-grid grid-cols-[max-content_max-content] gap-y-1 font-semibold text-black">
      {/* Team 1 Name */}
      <div className="flex h-11 items-center rounded-l-lg bg-[#fdf9f1] px-3 text-lg">
        <div className="flex h-11 w-12 items-center justify-start">
          {team1?.logo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team1.logo}`}
              alt={team1.name}
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          )}
        </div>
        <h2 className="pl-2 pr-3" id="team1-name">
          {team1?.name || "Team 1"}
        </h2>
      </div>

      {/* Team 1 Logo and Scores */}
      <div className="flex h-11 items-center rounded-r-lg bg-[#fdf9f1]">
        {sets.map((set, index) => (
          <div
            key={index}
            className="text-lg flex h-11 w-11 items-center justify-center bg-white text-blue-700 last:rounded-r-lg last:bg-[#f25c05] last:text-white"
          >
            <h3 id={`team1-score-${index}`}>{set.team1_score ?? 0}</h3>
          </div>
        ))}
      </div>

      {/* Team 2 Name */}
      <div className="flex h-11 items-center rounded-l-lg bg-[#fdf9f1] px-3 text-lg">
        <div className="flex h-11 w-12 items-center justify-start">
          {team2?.logo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team2.logo}`}
              alt={team2.name}
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          )}
        </div>
        <h2 className="pl-2 pr-3" id="team2-name">
          {team2?.name || "Team 2"}
        </h2>
      </div>

      {/* Team 2 Logo and Scores */}
      <div className="flex h-11 items-center rounded-r-lg bg-[#fdf9f1]">
        {sets.map((set, index) => (
          <div
            key={index}
            className="text-lg flex h-11 w-11 items-center justify-center bg-white text-blue-700 last:rounded-r-lg last:bg-[#f25c05] last:text-white"
          >
            <h3 id={`team2-score-${index}`}>{set.team2_score ?? 0}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
