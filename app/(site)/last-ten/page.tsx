import { Score, Team } from "@/lib/models";
import TopTenPage from "./page.client";

export default async function Page() {
  const [response] = await Promise.all([
    fetch(`${process.env.API_URL}/scores`, { cache: "no-store" }),
  ]);

  const data = await response.json();

  const score: Score[] = data.data;

  console.log(data);

  return <TopTenPage scores={score} />;
}
