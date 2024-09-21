import { Metadata } from "next";
import React from "react";

import "./globals.css";
import Providers from "./providers";

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
    <html lang="ko" className="w-full h-full bg-white">
      <body className="w-full h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;