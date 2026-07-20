import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مركز حضرموت الحديث للكهربائيات | HMEC",
  description: "مركز حضرموت الحديث للكهربائيات - وكلاء معتمدون لأكبر العلامات التجارية العالمية. نوفر منتجات وحلول كهربائية متكاملة مع دعم فني متخصص في حضرموت، اليمن.",
  keywords: "كهربائيات، حضرموت، المكلا، شنايدر، ABB، لوغراند، فيليبس، سيمنز، طاقة شمسية، مقاولات كهربائية",
  openGraph: {
    title: "مركز حضرموت الحديث للكهربائيات | HMEC",
    description: "وكلاء معتمدون لأكبر العلامات التجارية العالمية في مجال الكهربائيات",
    type: "website",
    locale: "ar_YE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
