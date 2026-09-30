"use client";
import { useMemo, useState } from "react";
import { Search, Upload, FileSpreadsheet, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Premise } from "@/lib/models";

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

type Props = {
  premises: Premise[];
  total: number;
};
export default function PremisesPage({ premises, total }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [invalidData, setInvalidData] = useState<Premise[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const filteredPremises = useMemo(() => {
    return premises.filter((premise) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        premise.name.toLowerCase().includes(searchValue) ||
        premise.premiseType.toLowerCase().includes(searchValue) ||
        premise.contact_person?.toLowerCase().includes(searchValue) ||
        premise.district.name.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || premise.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const openSheet = () => {
    setOpen(true);
  };

  const closeSheet = () => {
    setFile(null);
    setOpen(false);
  };

  const validateData = async () => {
    console.log(file);
    const buffer = await file?.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: "array",
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json<Premise>(worksheet, {
      defval: "",
    });

    const validRows: Premise[] = [];
    const invalidRows: Premise[] = [];

    data.forEach((row) => {
      const isValid = Object.values(row).every(
        (value) =>
          value !== null &&
          value !== undefined &&
          (typeof value !== "string" || value.trim() !== ""),
      );

      if (isValid) {
        validRows.push(row);
      } else {
        setModal(true);
        invalidRows.push(row);
      }
    });

    setInvalidData(invalidRows);
    console.log(validRows);
    console.log(invalidRows[0].name);
  };

  const uploadData = async () => {
    await validateData();
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Premises</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage premises and their collection information.
          </p>
        </div>

        <div>
          <Link
            href="/premises/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            Add Premise
          </Link>
          <button
            type="button"
            onClick={() => openSheet()}
            className="ml-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Download className="h-4 w-4" />
            Import Data
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
          <PremiseTable premises={filteredPremises} />
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className=" bg-white p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Import Data
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload a CSV or Excel file to import your data.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Data file
              </label>

              <label
                htmlFor="file"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 text-center transition hover:border-gray-400 hover:bg-gray-50"
              >
                {file ? (
                  <>
                    <FileSpreadsheet className="mb-3 h-8 w-8 text-gray-500" />

                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="mb-3 h-8 w-8 text-gray-400" />

                    <p className="text-sm font-medium text-gray-700">
                      Click to upload a file
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      CSV, XLS, or XLSX
                    </p>
                  </>
                )}

                <input
                  id="file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                  }}
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => closeSheet()}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!file}
                onClick={() => uploadData()}
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Import Data
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <DialogHeader>
            <DialogTitle>Invalid Data</DialogTitle>
            <DialogDescription>
              Data below is invalid. Are you sure you want to continiue? Only
              valid data will be inserted to database!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              {invalidData.map((row, index) => (
                <div key={index}>{row.name}</div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="button">Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
