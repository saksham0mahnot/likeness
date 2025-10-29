import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/scroll-progress";
import CommandPalette from "@/components/command-palette";
import { ThemeProvider } from "next-themes";
import PageTransitions from "@/components/page-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "likeness",
//   description: "Portfolio website for Video Editor Saksham Mahnot",
//   metadataBase: new URL("http://localhost"),
//   openGraph: {
//     title: "likeness",
//     description: "Modern video editor portfolio by Saksham Mahnot",
//     url: "http://localhost",
//     siteName: "likeness",
//     images: [
//       { url: "https://saksham0mahnot.github.io/portfolio/img/profile.jpg", width: 1200, height: 630, alt: "Saksham Mahnot" },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

export const metadata: Metadata = {
  title: "likeness",
  description: "Portfolio website for Video Editor Saksham Mahnot",
  metadataBase: new URL("https://saksham0mahnot.github.io"), // or your deployed site URL
  openGraph: {
    title: "likeness",
    description: "Modern video editor portfolio by Saksham Mahnot",
    url: "https://saksham0mahnot.github.io/portfolio",
    siteName: "likeness",
    images: [
      {
        url: "https://saksham0mahnot.github.io/portfolio/img/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Saksham Mahnot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ScrollProgress />
          <CommandPalette />
          <PageTransitions>
            {children}
          </PageTransitions>
        </ThemeProvider>
      </body>
    </html>
  );
}
