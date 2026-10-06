import ScoreFrontPage from "./page.client";
import { Score, Team } from "@/lib/models";

export default async function Page() {
  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/scores`, { cache: "no-store" }),
    fetch(`${process.env.API_URL}/teams`, { cache: "no-store" }),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const score: Score[] = data.data;
  const teams: Team[] = data1.data;

  console.log(data);

  return <ScoreFrontPage teams={teams} scores={score} />;
}
