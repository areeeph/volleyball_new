import { Fixture, Team } from "@/lib/models";
import FixtureMarquee from "./page.client";

export default async function Page() {
  const [response] = await Promise.all([
    fetch(`${process.env.API_URL}/fixtures`, { cache: "no-store" }),
  ]);

  const data = await response.json();

  const fixtures: Fixture[] = data.data;

  console.log(data);

  return <FixtureMarquee fixtures={fixtures} />;
}
