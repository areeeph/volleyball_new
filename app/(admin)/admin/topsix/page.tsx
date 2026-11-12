import { TopSix, Team } from "@/lib/models";
import TopSixPage from "./page.client";

export default async function Page() {
  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/topsix`, { cache: "no-store" }),
    fetch(`${process.env.API_URL}/teams`, { cache: "no-store" }),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const topsix: TopSix[] = data.data;
  const teams: Team[] = data1.data;

  console.log(data);

  return <TopSixPage teams={teams} topsix={topsix} />;
}
