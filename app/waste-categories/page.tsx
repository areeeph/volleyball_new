import WastePage from "./page.client";
import { WasteCategory } from "@/lib/models";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const response = await fetch(
    `${process.env.API_URL}/categories?page=${page - 1}`,
  );

  const data = await response.json();

  const total = data.total;

  const categories: WasteCategory[] = data.data;
  console.log(categories);

  return <WastePage categories={categories} total={total} />;
}
