import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-4 p-2">
      <div className="w-28  border-2 h-40 flex items-center justify-center">
        <Link href={"/product/p-1"}>
          {" "}
          <h1>P-details 1</h1>
        </Link>
      </div>
      <div className="w-28 border h-40 flex items-center justify-center">
        <Link href={"/product/p-2"}>
          {" "}
          <h1>P-details 2</h1>
        </Link>
      </div>
    </div>
  );
};

export default page;
