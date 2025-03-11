import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dataskate",
  description: "Works on any device—without installation",
  openGraph: {
    title: "Dataskate",
    description: "Works on any device—without installation",
    images: [
      {
        url: "/meta-img.png",
        width: 800,
        height: 600,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ff-inter`}
      >
        {children}
      </body>
    </html>
  );
}
