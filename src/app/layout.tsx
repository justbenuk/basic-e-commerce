import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import ThemeProvider from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basic",
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

type PageProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: PageProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
