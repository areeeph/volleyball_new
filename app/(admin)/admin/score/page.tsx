import { Score, Team } from "@/lib/models";
import ScorePage from "./page.client";

export default async function Page() {
  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/scores`),
    fetch(`${process.env.API_URL}/teams`),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const score: Score[] = data.data;
  const teams: Team[] = data1.data;

  return <ScorePage teams={teams} scores={score} />;
}
