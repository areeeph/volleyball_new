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
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage teams information.
          </p>
        </div>

        <div></div>
      </div>

      <div>
        {scores.map((score) => (
          <ScoreForm key={score.id} teams={teams} score={score} />
        ))}
      </div>

      <div className="inline-grid grid-cols-[max-content_max-content] gap-y-1 text-white">
        {/* Team 1 Name */}
        <div className="flex h-9 items-center rounded-l-lg bg-blue-800 pl-3 pr-4">
          <h2 id="team1-name">{team1?.name || "Team 1"}</h2>
        </div>

        {/* Team 1 Logo and Scores */}
        <div className="flex h-9 items-center rounded-r-lg bg-blue-800">
          <div className="flex h-9 w-12 items-center justify-center">
            {team1?.logo && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team1.logo}`}
                alt={team1.name}
                width={50}
                height={50}
                className="h-7 w-7 rounded-full object-cover"
              />
            )}
          </div>

          {sets.map((set, index) => (
            <div
              key={index}
              className="flex h-9 w-9 items-center justify-center bg-white font-semibold text-blue-700 last:rounded-r-lg last:bg-red-600 last:text-white"
            >
              <h3 id={`team1-score-${index}`}>{set.team1_score ?? 0}</h3>
            </div>
          ))}
        </div>

        {/* Team 2 Name */}
        <div className="flex h-9 items-center rounded-l-lg bg-blue-800 pl-3 pr-4">
          <h2 id="team2-name">{team2?.name || "Team 2"}</h2>
        </div>

        {/* Team 2 Logo and Scores */}
        <div className="flex h-9 items-center rounded-r-lg bg-blue-800">
          <div className="flex h-9 w-12 items-center justify-center">
            {team2?.logo && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team2.logo}`}
                alt={team2.name}
                width={50}
                height={50}
                className="h-7 w-7 rounded-full object-cover"
              />
            )}
          </div>

          {sets.map((set, index) => (
            <div
              key={index}
              className="flex h-9 w-9 items-center justify-center bg-white font-semibold text-blue-700 last:rounded-r-lg last:bg-red-600 last:text-white"
            >
              <h3 id={`team2-score-${index}`}>{set.team2_score ?? 0}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
