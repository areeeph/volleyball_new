"use client";

import { Schedule } from "@/lib/models";
import { Trash2, SquarePen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type Props = {
  schedules: Schedule[];
  total: number;
};

export default function SchedulesTable({ schedules, total }: Props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const showDeleteAlert = (id: string) => {
    setOpenAlert(true);
    setSelectedId(id);
  };

  const deleteData = async () => {
    if (selectedId == "") {
      return;
    }
    try {
      const response = await fetch(`/api/schedules/${selectedId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Request Failed: ${response.status}`);
      }

      window.location.href = "/schedule";
      setOpenAlert(false);
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                #
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Collection Days
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                As Required
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.id} className="transition hover:bg-gray-50">
                  {/* Sequence */}
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {schedule.sequenceId}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">
                      {schedule.category.name}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">
                      <ul className="flex items-center space-x-2 capitalize">
                        {schedule.days.map((day) => (
                          <li
                            key={day}
                            className="after:content-[','] last:after:content-none"
                          >
                            {day}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">
                      {schedule.asRequired ? "Yes" : "No"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        title="Edit"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                      >
                        <SquarePen className="h-4 w-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() => showDeleteAlert(schedule.id)}
                        type="button"
                        title="Delete"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    No schedule found
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-5 py-3">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">{schedules.length}</span>{" "}
          of <span className="font-medium text-gray-700">{total}</span>{" "}
          schedules
        </p>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteData()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
