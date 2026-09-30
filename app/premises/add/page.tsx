import { MoveLeft } from "lucide-react";
import Link from "next/link";
import PremiseForm from "@/components/forms/premise-form";
import { District } from "@/lib/models";

export default async function Page() {
  const response = await fetch(`${process.env.API_URL}/districts`);

  const data = await response.json();

  const districts: District[] = data.data;
  console.log(districts);

  return (
    <div>
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Premise</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new premise. Make sure to fill all the required fields!
          </p>
        </div>

        <div>
          <Link
            href="/premises"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <MoveLeft className="h-4 w-4" />
            Premises
          </Link>
        </div>
      </div>

      <PremiseForm districts={districts} />
    </div>
  );
}
