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
      <body className={`${inter.className} bg-tedx-white dark:bg-tedx-dark-bg`}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Providers>
          <main className="flex">
            <Sidebar />
            <section className="pl-16 w-full overflow-x-hidden dark:bg-tedx-dark-bg dark:text-tedx-white transition-colors duration-300 ease-out">
              <div className="w-full">{children}</div>
            </section>
            {/* Yes that margin is scuffed */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
