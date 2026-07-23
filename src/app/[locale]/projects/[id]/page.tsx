import { notFound } from 'next/navigation';
import { getProjectByIdServerAction } from '@/actions/projectActions';
import ProjectDetailsClient from '@/components/ProjectDetailsClient';

export default async function ProjectPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdServerAction(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
