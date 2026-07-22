import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/api';
 import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import ProductDetailsClient from '@/components/ProductDetailsClient';

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const siteData = await getSiteData();
  const data = siteData?.data;
  const products = data?.product || [];
  const messages = await getMessages();

  // Find product by id
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    notFound();
  }

  // Pass all products as related products
  const relatedProducts = products.filter((p) => p.id.toString() !== id);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProductDetailsClient
        product={product}
        content={data?.content}
        relatedProducts={relatedProducts}
      />
    </NextIntlClientProvider>
  );
}
