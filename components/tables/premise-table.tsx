import { Premise } from "@/lib/models";
import { Trash2, MapPin, Phone, Users, SquarePen } from "lucide-react";

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
  premises: Premise[];
};

export default function PremiseTable({ premises }: Props) {
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
      const response = await fetch(`/api/premises/${selectedId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Request Failed: ${response.status}`);
      }

      window.location.href = "/premises";
      setOpenAlert(false);
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white ">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                #
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Premise
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                District
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Contact
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Occupants
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {premises.length > 0 ? (
              premises.map((premise) => (
                <tr key={premise.id} className="transition hover:bg-gray-50">
                  {/* Sequence */}
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {premise.number}
                  </td>

                  {/* Premise */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">
                      {premise.name}
                    </div>

                    {premise.address && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {premise.address}
                      </div>
                    )}
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {premise.premiseType}
                    </span>
                  </td>

                  {/* District */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {premise.district?.name || "-"}
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    {premise.contact_person ? (
                      <>
                        <div className="text-sm font-medium text-gray-800">
                          {premise.contact_person}
                        </div>

                        {premise.contact_number && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="h-3.5 w-3.5" />
                            {premise.contact_number}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* Occupants */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-gray-400" />
                      {premise.occupants ?? 0}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={premise.status} />
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
                        onClick={() => showDeleteAlert(premise.id)}
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
                    No premises found
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
          <span className="font-medium text-gray-700">{premises.length}</span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">{premises.length}</span>{" "}
          premises
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

function StatusBadge({ status }: { status?: "active" | "inactive" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}
