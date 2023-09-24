import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import Sidebar from "./Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TEDxColumbia Lake Youth | Dashboard",
  description: "Dashboard for the TEDxColumbiaLakeYouth event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-tedx-white`}>
        <Providers>
          <main className="flex">
            <Sidebar />
            <section className="pl-16 w-full">
              <div className="w-full">{children}</div>
            </section>
            {/* Yes that margin is scuffed */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
