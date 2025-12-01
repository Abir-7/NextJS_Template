/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Calendar,
  Home,
  Inbox,
  Settings,
  ChevronDown,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useAppSelector } from "@/lib/redux/hook";
import { Role } from "@/lib/redux/features/authSlice/auth_slice";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  title: string;
  url?: string;
  icon?: any;
  roles: Role[];
  children?: MenuItem[];
}

const items: MenuItem[] = [
  { title: "Home", url: "/", icon: Home, roles: ["admin", "user"] },
  {
    title: "Manage Product",
    icon: Inbox,
    roles: ["admin", "user"],
    children: [
      { title: "Add Product", url: "/dashboard/add-product", roles: ["admin"] },
      {
        title: "All Product",
        url: "/dashboard/manage-product",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    title: "Manage Users",
    url: "/dashboard/manage-user",
    icon: Calendar,
    roles: ["admin", "user"],
  },
  {
    title: "Update Profile",
    url: "/dashboard/update-profile",
    icon: User,
    roles: ["user"],
  },
  {
    title: "My Task",
    url: "/dashboard/my-task",
    icon: Settings,
    roles: ["user"],
  },
];

export function AppSidebar() {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const currentUserRole: Role = user?.role as Role;

  const filteredItems = items.filter((item) =>
    item.roles.includes(currentUserRole)
  );

  const isActive = (url?: string) => {
    if (!url) return false;
    if (url === "/") return pathname === "/"; // special case for home
    return pathname.startsWith(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const children =
                  item.children?.filter((child) =>
                    child.roles.includes(currentUserRole)
                  ) ?? [];

                const hasChildren = children.length > 0;

                // Auto-open dropdown if any child path is active
                const childActive = children.some((c) => isActive(c.url));

                if (hasChildren) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Collapsible defaultOpen={childActive}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={`group p-1  flex items-center gap-2 justify-between w-full ${
                              childActive
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              <span className="scale-75">
                                {" "}
                                {item.icon && <item.icon />}
                              </span>
                              <span>{item.title}</span>
                            </div>

                            <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="p-1">
                          <SidebarMenu className="pl-5">
                            {children.map((child) => (
                              <SidebarMenuItem key={child.title}>
                                <SidebarMenuButton
                                  asChild
                                  className={
                                    isActive(child.url)
                                      ? "bg-accent text-accent-foreground"
                                      : ""
                                  }
                                >
                                  <Link href={child.url as string}>
                                    {child.title}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }
                    >
                      <Link
                        href={item.url as string}
                        className="flex items-center gap-2"
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
