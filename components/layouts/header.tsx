import { ChevronDown, Menu, Bell, Search } from "lucide-react";
import Link from "next/link";

const navItems: NavItem[] = [
  {
    title: "Score",
    href: "/admin/score",
  },
  {
    title: "Teams",
    href: "/admin/teams",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden">
        <Menu className="h-6 w-6" strokeWidth={2} />
      </button>

      <Link
        key={navItems[0].title}
        href={navItems[0].href}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <span>{navItems[0].title}</span>
      </Link>

      <Link
        key={navItems[1].title}
        href={navItems[1].href}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <span>{navItems[1].title}</span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
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
