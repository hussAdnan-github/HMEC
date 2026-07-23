import Projects from '@/components/Projects';
import { getProjectsServerAction } from '@/actions/projectActions';
import { Link } from '@/i18n/routing';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const projectsRes = await getProjectsServerAction();
  const projects = projectsRes?.data?.results || [];

  return (
    <main className="min-h-screen   flex flex-col flex-1">
       <div className="pt-32 pb-8   text-white relative  ">
        <div className="absolute   bg-white" />
      </div>

      {/* Catalog */}
      <div className="flex-1 bg-slate-900">
        <Projects projects={projects} isHomePage={false} />
      </div>
    </main>
  );
}
