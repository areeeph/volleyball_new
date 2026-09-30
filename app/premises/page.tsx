import PremisesPage from "./page.client";
import { Premise } from "@/lib/models";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const response = await fetch(
    `${process.env.API_URL}/premises?page=${page - 1}`,
  );

  const data = await response.json();

  const total = data.total;

  const premises: Premise[] = data.data;
  console.log(premises);
  return <PremisesPage premises={premises} total={total} />;
}
