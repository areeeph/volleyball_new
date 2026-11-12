import { TopSix } from "@/lib/models";
import TopSixFrontPage from "./page.client";

export default async function Page() {
  const [response] = await Promise.all([
    fetch(`${process.env.API_URL}/topsix`, { cache: "no-store" }),
  ]);

  const data = await response.json();

  const topsix: TopSix[] = data.data;

  console.log(data);

  return <TopSixFrontPage topsix={topsix} />;
}
