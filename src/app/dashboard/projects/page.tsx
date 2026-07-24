import { getProjectsServerAction } from '@/actions/projectActions';
import { getAgentsServerAction } from '@/actions/productActions';
import ProjectsDashboardClient from '@/components/dashboard/ProjectsDashboardClient';

export const revalidate = 0; // Disable server-side caching for dashboard page

export default async function ProjectsDashboardPage() {
  const [projectsRes, agentsRes] = await Promise.all([
    getProjectsServerAction(),
    getAgentsServerAction(),
  ]);

  const initialProjects = projectsRes?.data?.results || [];
  const agents = agentsRes?.data?.results || [];

  return (
    <ProjectsDashboardClient
      initialProjects={initialProjects}
      agents={agents}
    />
  );
}
