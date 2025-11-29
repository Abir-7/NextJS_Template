import RoleGuard from "@/providers/role_guard";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>;
};

export default layout;
