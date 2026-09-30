"use client";
import { useMemo, useState } from "react";
import { Plus, Save, Search } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import CategoriesTable from "@/components/tables/categories-table";

import { WasteCategory } from "@/lib/models";
import CategoryForm from "@/components/forms/category-form";

type Props = {
  categories: WasteCategory[];
  total: number;
};

export default function PremisesPage({ categories, total }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<WasteCategory | null>(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = category.name.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || category.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const openSheet = () => {
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Waste Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage waste categories information.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Category
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
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white h-10.5 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Table */}
          <CategoriesTable categories={filteredCategories} total={total} />
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

            <CategoryForm
              category={category}
              categories={categories}
              closeSheet={closeSheet}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
