"use client";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Team } from "@/lib/models";

import TeamsTable from "@/components/tables/teams-table";
import TeamForm from "@/components/forms/team-form";

type Props = {
  teams: Team[];
};
export default function TeamPage({ teams }: Props) {
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState<Team | null>(null);
  console.log(teams);

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
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage teams information.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Team
          </button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg">
        <div>
          {/* Table */}
          <TeamsTable teams={teams} />
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className=" bg-white p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Add Team</h2>
            </div>

            <TeamForm team={team} closeSheet={closeSheet} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
