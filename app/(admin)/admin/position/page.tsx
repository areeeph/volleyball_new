import { Position, Team } from "@/lib/models";
import PositionsPage from "./page.client";

export default async function Page() {
  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/positions`, { cache: "no-store" }),
    fetch(`${process.env.API_URL}/teams`, { cache: "no-store" }),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const positions: Position[] = data.data;
  const teams: Team[] = data1.data;

  console.log(data);

  return <PositionsPage teams={teams} positions={positions} />;
}
