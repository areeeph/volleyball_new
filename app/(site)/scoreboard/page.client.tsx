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

  const getSetNumber = (team: number) => {
    const currentSet: number = score?.current_set || 1;

    if (currentSet == 1) {
      return 0;
    }
    console.log(sets[currentSet - 2].team1_score);

    if (team == 1) {
      const team1SetsWon = sets
        .slice(0, -1)
        .filter((set) => set.team1_score > set.team2_score).length;
      return team1SetsWon;
    }

    const team2SetsWon = sets
      .slice(0, -1)
      .filter((set) => set.team2_score > set.team1_score).length;
    return team2SetsWon;
  };

  return (
    <div className="w-480 flex justify-center ">
      <div className="relative">
        <img src="/score.webp" alt="" />
        <div className="absolute top-7 left-15">
          <div className=" rounded-full overflow-hidden w-40 h-32.5 flex items-center justify-center">
            <Image
              width={200}
              height={120}
              alt="Kendhikulhudhoo"
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team1?.logo}`}
              className="h-30 w-auto"
            />
          </div>
        </div>
        <div className="absolute top-7 right-15">
          <div className="rounded-full overflow-hidden  w-40 h-32.5 flex items-center justify-center">
            <Image
              width={200}
              height={120}
              alt="Kendhikulhudhoo"
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${team2?.logo}`}
              className="h-30 w-auto"
            />
          </div>
        </div>
        <div className="absolute top-20.75 right-77.5">
          <div className="  w-54 h-20 flex items-center justify-center">
            <h2 className="uppercase font-black text-white text-2xl text-center">
              {team2?.name}
            </h2>
          </div>
        </div>
        <div className="absolute top-20.75 left-77.5">
          <div className="  w-54 h-20 flex items-center justify-center">
            <h2 className="uppercase font-black text-white text-2xl text-center">
              {team1?.name}
            </h2>
          </div>
        </div>
        <div className="absolute top-13.75 left-180">
          <div className=" w-20 h-20 flex items-center justify-center">
            <h2 className="uppercase font-black text-5xl text-center">
              {sets[sets.length - 1].team1_score}
            </h2>
          </div>
        </div>
        <div className="absolute top-13.75 right-180">
          <div className=" w-20 h-20 flex items-center justify-center">
            <h2 className="uppercase font-black text-5xl text-center">
              {sets[sets.length - 1].team2_score}
            </h2>
          </div>
        </div>

        <div className="absolute top-20.75 left-132">
          <div className="  w-20 h-20 flex items-center justify-center">
            <div className="h-16 border-l-2 border-white pl-5">
              <h2 className="uppercase font-semibold text-white text-lg text-center">
                SETS
              </h2>
              <p className="uppercase font-black text-white text-xl text-center">
                {getSetNumber(1)}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-20.75 right-132">
          <div className="  w-20 h-20 flex items-center justify-center">
            <div className="h-16 border-r-2 border-white pr-5">
              <h2 className="uppercase font-semibold text-white text-lg text-center">
                SETS
              </h2>
              <p className="uppercase font-black text-white text-xl text-center">
                {getSetNumber(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
