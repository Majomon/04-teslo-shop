import { Providers } from "@/components";
import { inter } from "@/config/fonts";
import "./globals.css";

export const metadata = {
  title: { template: "%s - Teslo | Shop", default: "Home - Teslo | Shop" },
  description: "Tienda de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
