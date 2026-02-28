import Header from "@/components/header";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Amit | Personal Portfolio",
  description: "Amit is a software developer with 4+ years of experience building immersive web applications and Salesforce solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`!scroll-smooth ${spaceGrotesk.variable}`}>
      <body
        className={`${inter.className} bg-[var(--bg-primary)] text-gray-950 relative pt-28 sm:pt-36 dark:text-gray-50 dark:text-opacity-90 noise-overlay`}
      >
        {/* Animated mesh gradient blobs — decorative background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Large morphing blob — top right */}
          <div
            className="absolute -top-[10%] -right-[5%] h-[700px] w-[700px] bg-gradient-to-br from-indigo-400/[0.18] via-purple-400/[0.12] to-violet-300/[0.06] blur-[80px]"
            style={{
              animation: "morph 20s ease-in-out infinite, float-slow 14s ease-in-out infinite",
            }}
          />
          {/* Secondary blob — bottom left with gold warmth */}
          <div
            className="absolute -bottom-[15%] -left-[10%] h-[550px] w-[550px] bg-gradient-to-tr from-violet-400/[0.14] via-blue-400/[0.08] to-amber-300/[0.04] blur-[100px]"
            style={{
              animation: "morph 18s ease-in-out infinite reverse, float-slow 16s ease-in-out infinite",
              animationDelay: "4s",
            }}
          />
          {/* Center ambient blob */}
          <div
            className="absolute top-[35%] left-[40%] h-[500px] w-[500px] bg-gradient-to-b from-purple-400/[0.08] via-indigo-300/[0.05] to-transparent blur-[90px]"
            style={{
              animation: "float-slow 18s ease-in-out infinite",
              animationDelay: "8s",
            }}
          />
          {/* Small orbiting accent dot (light mode warmth) */}
          <div
            className="absolute top-[20%] left-[60%] w-[200px] h-[200px] rounded-full bg-gradient-radial from-amber-300/[0.06] to-transparent blur-[60px] dark:opacity-0"
            style={{ animation: "orbit 30s linear infinite" }}
          />
        </div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
