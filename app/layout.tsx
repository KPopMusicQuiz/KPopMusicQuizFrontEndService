import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { auth } from "@/auth";
import { Chat } from "@/components/chat/chat";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { Sidebar } from "@/components/sidebar/sidebar";

import "./globals.css";
import { CommandProvider } from "@/components/providers/command-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kpop Music Quiz",
  description: "Description text",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                <CommandProvider>
                  <main className="flex h-dvh w-screen relative">
                    <Sidebar>
                      <div
                        className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden \
                                 dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]"
                      >
                        <div
                          className="absolute pointer-events-none inset-0 flex items-center justify-center \
                                   dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                        />
                        <Chat />
                        {children}
                      </div>
                    </Sidebar>
                  </main>
                </CommandProvider>
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
};
