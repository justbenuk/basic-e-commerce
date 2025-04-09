import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from 'next/font/google'
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import ThemeProvider from "@/lib/theme-provider";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%S | Basic Ecommerce`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

type PageProps = {
  children: ReactNode
}

export default function RootLayout({ children }: PageProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
