import RoleGuard from "@/providers/role_guard";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <RoleGuard allowedRoles={["user "]}>{children}</RoleGuard>;
};

export default layout;
