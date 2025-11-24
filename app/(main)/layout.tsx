import { ModeToggle } from "@/components/custom/theme/theme_toogle";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="shrink-0 h-10 border border-b flex justify-between px-2 items-center ">
        <div>Nav</div>
        <div className="">
          <ModeToggle></ModeToggle>
        </div>
      </section>

      <main className="flex-1 ">{children}</main>

      <section className="shrink-0 h-10 flex items-center px-2 border border-t  ">
        Footer
      </section>
    </div>
  );
};

export default layout;
