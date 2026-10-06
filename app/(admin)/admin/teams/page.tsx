import TeamPage from "./page.client";
import { Team } from "@/lib/models";

export default async function Page() {
  const response = await fetch(`${process.env.API_URL}/teams`, {
    cache: "no-store",
  });

  const data = await response.json();

  const teams: Team[] = data.data;

  console.log(data);

  return <TeamPage teams={teams} />;
}
