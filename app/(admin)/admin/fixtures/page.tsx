import { Fixture, Team } from "@/lib/models";
import FixturePage from "./page.client";

export default async function Page() {
  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/fixtures`, { cache: "no-store" }),
    fetch(`${process.env.API_URL}/teams`, { cache: "no-store" }),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const fixtures: Fixture[] = data.data;
  const teams: Team[] = data1.data;

  console.log(data);

  return <FixturePage teams={teams} fixtures={fixtures} />;
}
