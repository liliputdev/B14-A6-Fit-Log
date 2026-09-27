import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
  <PlanProvider>{children}</PlanProvider>
</body>
    </html>
  );
}