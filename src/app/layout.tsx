import { type Metadata } from "next";
import { type ReactNode, ReactElement, memo } from "react";
import { geistSans, geistMono } from "@/utils/fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Main Page",
  description: "Next 15 example app"
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode; }>): ReactElement => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default memo(RootLayout);
