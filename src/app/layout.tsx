import { CustomMarvelHeader } from "@/components/custom-marvel-header/custom-marvel-header";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MARVEL",
  description: "Frontend technical test"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <CustomMarvelHeader>{children}</CustomMarvelHeader>
      </body>
    </html>
  );
}
