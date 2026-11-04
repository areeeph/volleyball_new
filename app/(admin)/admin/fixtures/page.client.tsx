"use client";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Fixture, Team } from "@/lib/models";

import FixturesTable from "@/components/tables/fixtures-table";
import FixtureForm from "@/components/forms/fixture-form";

type Props = {
  fixtures: Fixture[];
  teams: Team[];
};
export default function FixturePage({ fixtures, teams }: Props) {
  const [open, setOpen] = useState(false);
  const [fixture, setFixture] = useState<Fixture | null>(null);
  console.log(fixtures);

  const openSheet = () => {
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fixtures</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage fixtures information.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Fixture
          </button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg">
        <div>
          {/* Table */}
          <FixturesTable fixtures={fixtures} />
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className=" bg-white p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Fixture
              </h2>
            </div>

            <FixtureForm
              fixture={fixture}
              teams={teams}
              closeSheet={closeSheet}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
