"use client";
// import "moment/locale/ko";
import React from "react";

import ReactQueryProvider from "./ReactQueryProvider";
import RecoilProvider from "./RecoilProvider";

const Providers = ({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <RecoilProvider>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </RecoilProvider>
  );
};

export default Providers;