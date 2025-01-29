'use client'

import "@/styles/globals.css";
import clsx from "clsx";
import {Navbar, NavbarContent, NavbarItem, Link} from "@heroui/react";
import { fontSans } from "@/config/fonts";


import dynamic from 'next/dynamic'
const NoSSR = dynamic(() => import('./chatbot/page'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Navbar position="static">
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/chatbot">
                Chatbot
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/files">
                Training Files
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div>
        {children}
        </div>
      </body>
    </html>
  );
}
