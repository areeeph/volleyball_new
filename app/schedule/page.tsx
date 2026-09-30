import SchedulesPage from "./page.client";
import { Schedule, WasteCategory } from "@/lib/models";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const [response, response1] = await Promise.all([
    fetch(`${process.env.API_URL}/schedules?page=${page - 1}`),
    fetch(`${process.env.API_URL}/categories`),
  ]);

  const data = await response.json();
  const data1 = await response1.json();

  const schedules: Schedule[] = data.data;
  const categories: WasteCategory[] = data1.data;

  console.log(data);

  return (
    <SchedulesPage
      schedules={schedules}
      total={data.total}
      categories={categories}
    />
  );
}
