"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ChevronDown,
  Package,
  BarChart3,
  UserCog,
  Shield,
  Houses,
  Tags,
  CalendarCheck,
  NotebookPen,
  User,
  Van,
  UserRoundGroup,
  MapPin,
} from "lucide-react";

type SubNavItem = {
  title: string;
  href: string;
};

type NavItem = {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: SubNavItem[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Collections",
    icon: NotebookPen,
    children: [
      {
        title: "Daily Collection",
        href: "/collections",
      },

      {
        title: "Collections Register",
        href: "/collections-register",
      },
    ],
  },

  {
    title: "Schedule",
    icon: CalendarCheck,
    href: "/schedule",
  },

  {
    title: "Waste Categories",
    href: "/waste-categories",
    icon: Tags,
  },

  {
    title: "Premises",
    href: "/premises",
    icon: Houses,
  },

  {
    title: "Districts",
    href: "/districts",
    icon: MapPin,
  },

  {
    title: "Labour Teams",
    href: "/labour-teams",
    icon: UserRoundGroup,
  },

  {
    title: "Staffs",
    href: "/staffs",
    icon: Users,
  },

  {
    title: "Vehicles",
    href: "/vehicles",
    icon: Van,
  },

  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },

  {
    title: "Documents",
    icon: FileText,
    children: [
      {
        title: "All Documents",
        href: "/documents",
      },
      {
        title: "Archived",
        href: "/documents/archived",
      },
    ],
  },

  {
    title: "Users",
    icon: User,
    children: [
      {
        title: "All Users",
        href: "/users",
      },
      {
        title: "Add User",
        href: "/users/add",
      },
      {
        title: "User Roles",
        href: "/users/roles",
      },
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const isOpen = openMenus.includes(item.title);

            /*
             * Navigation without sub navigation
             */
            if (!hasChildren) {
              return (
                <Link
                  key={item.title}
                  href={item.href!}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.title}</span>
                </Link>
              );
            }

            /*
             * Navigation with sub navigation
             */
            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.title)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span className="flex-1">{item.title}</span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Smooth submenu animation */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-5 border-l border-gray-200 py-1 pl-4">
                      {item.children?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-200 p-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          <UserCog className="h-5 w-5" />
          <span>Profile</span>
        </Link>

        <Link
          href="/security"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          <Shield className="h-5 w-5" />
          <span>Security</span>
        </Link>
      </div>
    </aside>
  );
}
