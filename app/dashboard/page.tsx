import Image from "next/image";
import { Briefcase, UsersRound, FileText, Bell } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Projects
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Briefcase className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-600">
            ↑ 12% <span className="text-gray-400">from last month</span>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">18</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <UsersRound className="h-6 w-6" strokeWidth={2} />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-600">
            ↑ 8% <span className="text-gray-400">from last month</span>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Services
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FileText className="h-6 w-6" strokeWidth={2} />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-600">
            ↑ 5% <span className="text-gray-400">from last month</span>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Notices</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">32</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Bell className="h-6 w-6" strokeWidth={2} />
            </div>
          </div>

          <p className="mt-4 text-xs text-green-600">
            ↑ 20% <span className="text-gray-400">from last month</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Website Visitors</h2>
              <p className="mt-1 text-sm text-gray-500">
                Visitors over the last 7 days
              </p>
            </div>

            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>

          <div className="mt-6 flex h-64 items-end gap-3">
            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[25%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Mon
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[45%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Tue
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[60%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Wed
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[42%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Thu
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[68%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Fri
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[72%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Sat
              </span>
            </div>

            <div className="flex h-full flex-1 flex-col justify-end">
              <div className="h-[90%] rounded-t bg-blue-500"></div>
              <span className="mt-2 text-center text-xs text-gray-400">
                Sun
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Quick Actions</h2>

          <div className="mt-5 space-y-3">
            <button className="flex w-full items-center justify-between rounded-lg bg-blue-50 p-4 text-left transition hover:bg-blue-100">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                  +
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Add New Project
                </span>
              </span>

              <span className="text-gray-400">→</span>
            </button>

            <button className="flex w-full items-center justify-between rounded-lg bg-green-50 p-4 text-left transition hover:bg-green-100">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">
                  +
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Create Notice
                </span>
              </span>

              <span className="text-gray-400">→</span>
            </button>

            <button className="flex w-full items-center justify-between rounded-lg bg-purple-50 p-4 text-left transition hover:bg-purple-100">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white">
                  +
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Manage Members
                </span>
              </span>

              <span className="text-gray-400">→</span>
            </button>

            <button className="flex w-full items-center justify-between rounded-lg bg-orange-50 p-4 text-left transition hover:bg-orange-100">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
                  +
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Update Services
                </span>
              </span>

              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Recent Projects</h2>

            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Mangrove Eco Park
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                      Environment
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">Sep 20, 2026</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Hinna Bridge Renovation
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                      Infrastructure
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600">
                      In Progress
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">Sep 18, 2026</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Community Center
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600">
                      Social
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">Sep 15, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Latest Notices</h2>

            <a href="#" className="text-sm font-medium text-blue-600">
              View all
            </a>
          </div>

          <div className="divide-y divide-gray-100">
            <a href="#" className="block p-4 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">
                މަންގްރޫވް ޕާކު މެއިންޓެނަންސް
              </p>
              <p className="mt-1 text-xs text-gray-400">Sep 24, 2026</p>
            </a>

            <a href="#" className="block p-4 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">
                Waste Collection Schedule
              </p>
              <p className="mt-1 text-xs text-gray-400">Sep 22, 2026</p>
            </a>

            <a href="#" className="block p-4 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">
                ކޮމިއުނިޓީ މީޓިންގް
              </p>
              <p className="mt-1 text-xs text-gray-400">Sep 20, 2026</p>
            </a>

            <a href="#" className="block p-4 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">
                Public Meeting Announcement
              </p>
              <p className="mt-1 text-xs text-gray-400">Sep 18, 2026</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
