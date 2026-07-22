import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/api';
import ProjectDetailsClient from '@/components/ProjectDetailsClient';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export default async function ProjectPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const siteData = await getSiteData();
  const data = siteData?.data;
  const projects = data?.project || [];
  const messages = await getMessages();

  // Find project by id
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProjectDetailsClient project={project} content={data?.content} />
    </NextIntlClientProvider>
  );
}
