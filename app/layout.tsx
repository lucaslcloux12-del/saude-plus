import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saúde Plus",
  description: "App de treino para tanquinho, emagrecimento e glow up",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
