import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center p-6  rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Link href="/" className="px-4 py-2 hover:underline  rounded ">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
