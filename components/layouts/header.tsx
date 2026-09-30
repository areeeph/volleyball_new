import { ChevronDown, Menu, Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden">
        <Menu className="h-6 w-6" strokeWidth={2} />
      </button>

      <div className="relative hidden w-96 md:block">
        <Search
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          strokeWidth={2}
        />

        <input
          type="text"
          placeholder="Search anything..."
          className="h-10 w-full rounded-lg border-0 bg-gray-100 pl-10 pr-4 text-sm outline-none ring-0 placeholder:text-gray-400 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" strokeWidth={2} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            AA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Ali Areef</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
        </div>
      </div>
    </header>
  );
}
