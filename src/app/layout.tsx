import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import "./store.css";
import { StoreProvider } from "@/components/store/StoreProvider";

/* Headings, prices and the wordmark: a warm, soft-cut serif (upright only). */
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

/* Running text, buttons and forms. */
const sans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sans",
  display: "swap",
});

/* All Tamil text, a serif to sit beside Fraunces. */
const tamil = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naadu Nalam · Pure food for seven generations",
  description:
    "Native rice, aval, millets, cold-pressed oils, karupatti and honey from Tamil Nadu's own growers. Flat ₹50 delivery across Tamil Nadu.",
  icons: { icon: "/brand/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${tamil.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
