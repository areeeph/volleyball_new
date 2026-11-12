import PositionsFrontPage from "./page.client";
import { Position } from "@/lib/models";

export default async function Page() {
  const [response] = await Promise.all([
    fetch(`${process.env.API_URL}/positions`, { cache: "no-store" }),
  ]);

  const data = await response.json();

  const positions: Position[] = data.data;

  console.log(data);

  return <PositionsFrontPage positions={positions} />;
}
