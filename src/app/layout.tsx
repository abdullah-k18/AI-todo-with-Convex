import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  description: "Generate your ToDo's with Task Genie AI. Let AI generate tasks for you with a simple text prompt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <title>Task Genie AI</title>
          <link rel="shortcut icon" href="https://www.svgrepo.com/show/191609/tasks-list.svg" type="image/x-icon" />
        </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
