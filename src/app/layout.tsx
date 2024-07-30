import { LayoutPage } from "@/components/layout-page";
import { AppConfigProvider } from "@/contexts/app-config-context";
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
        <AppConfigProvider>
          <LayoutPage>{children}</LayoutPage>
        </AppConfigProvider>
      </body>
    </html>
  );
}
