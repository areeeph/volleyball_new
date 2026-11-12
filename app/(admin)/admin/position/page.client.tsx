"use client";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Position, Team } from "@/lib/models";

import TeamsTable from "@/components/tables/teams-table";
import TeamForm from "@/components/forms/team-form";
import PositionForm from "@/components/forms/position-form";
import PositionsTable from "@/components/tables/positions-table";

type Props = {
  teams: Team[];
  positions: Position[];
};
export default function PositionsPage({ teams, positions }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  console.log(positions);

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
          <h1 className="text-2xl font-semibold text-gray-900">Position</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage position information.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Position
          </button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg">
        <div>
          {/* Table */}
          <PositionsTable positions={positions} />
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className=" bg-white p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Position
              </h2>
            </div>

            <PositionForm
              teams={teams}
              position={position}
              closeSheet={closeSheet}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
