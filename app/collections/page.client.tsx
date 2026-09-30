"use client";
import { useMemo, useState } from "react";
import { Search, Upload, FileSpreadsheet, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Schedule, WasteCategory } from "@/lib/models";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PremiseTable from "@/components/tables/premise-table";
import Link from "next/link";
import ScheduleForm from "@/components/forms/schedule-form";
import SchedulesTable from "@/components/tables/schedules-table";

type Props = {
  schedules: Schedule[];
  categories: WasteCategory[];
  total: number;
};
export default function SchedulesPage({ schedules, total, categories }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  console.log(categories);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = schedule.category?.name
        .toLowerCase()
        .includes(searchValue);

      const matchesCategory =
        category === "all" || schedule.category.name === category;
      console.log(category);

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

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
          <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage collection schedule information.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Schedule
          </button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg">
        <div>
          {/* Filters */}
          <div className="flex items-center mb-5">
            {/* Search */}
            <div className="relative w-100 mr-5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search premises..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white h-10.5 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <SchedulesTable schedules={filteredSchedules} total={total} />
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className=" bg-white p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Category
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload a CSV or Excel file to import your data.
              </p>
            </div>

            <ScheduleForm
              schedule={schedule}
              categories={categories}
              closeSheet={closeSheet}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
