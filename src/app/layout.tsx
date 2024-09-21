import { Metadata } from "next";
import React from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "모의고사 키우기",
  description: "모든 모의고사를 한 곳에서!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="w-full h-full">
      <body className="w-full h-full">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;