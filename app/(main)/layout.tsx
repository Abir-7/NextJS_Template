import Navbar from "@/components/custom/navbar/Navbar";

import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="shrink-0 h-14 border border-b  ">
        <Navbar></Navbar>
      </section>

      <main className="flex-1 ">{children}</main>

      <section className="shrink-0 h-10 flex items-center px-2 border border-t  ">
        Footer
      </section>
    </div>
  );
};

export default layout;
