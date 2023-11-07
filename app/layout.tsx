import Nav from "@/components/Nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Omniprice",
  description:
    "Track product prices whith no effort and save money on your shopping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Providers>
            <Nav />
            <main className="max-w-10xl mx-auto">{children}</main>
          </Providers>
        </body>
      </UserProvider>
    </html>
  );
}
