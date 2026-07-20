import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مركز حضرموت الحديث للكهربائيات | HMEC",
  description: "مركز حضرموت الحديث للكهربائيات - وكلاء معتمدون لأكبر العلامات التجارية العالمية. نوفر منتجات وحلول كهربائية متكاملة مع دعم فني متخصص في حضرموت، اليمن.",
  keywords: "كهربائيات، حضرموت، المكلا، شنايدر، ABB، لوغراند، فيليبس، سيمنز، طاقة شمسية، مقاولات كهربائية",
  openGraph: {
    title: "مركز حضرموت الحديث للكهربائيات | HMEC",
    description: "وكلاء معتمدون لأكبر العلامات التجارية العالمية في مجال الكهربائيات",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cairo.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
