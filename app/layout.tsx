import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EMI Calculator",
    template: "%s | EMI Calculator",
  },
  description:
    "EMI Calculator - Calculate Equated Monthly Installment (EMI) for Home Loan / Housing Loan, Car Loan & Personal Loan in India (with interactive charts)",
  twitter: {
    card: "summary_large_image",
    images: ["/open-graph-image.png"],
  },
  openGraph: {
    images: ["/open-graph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
