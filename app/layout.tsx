import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Get to Know Human Trafficking Inc.",
  description: "A quiz about human trafficking awareness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script async src="https://giving.gofundme.com/embedded/api/checkout/sdk/js/75035"></script>
      </head>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
