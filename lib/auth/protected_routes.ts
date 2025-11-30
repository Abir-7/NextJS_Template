export const protectedRoutes = [
  {
    path: "/product/", // protects /product/*
    allowedRoles: ["admin"],
  },
  {
    path: "/dashboard/", // protects /dashboard/*
    allowedRoles: ["admin", "editor"],
  },
];
