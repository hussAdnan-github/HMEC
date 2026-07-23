import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Branches from '@/components/Branches';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { getSiteData } from '@/lib/api';
import { getProductsServerAction } from '@/actions/productActions';
import { getProjectsServerAction } from '@/actions/projectActions';

export default async function Home() {
  const [siteData, productsRes, projectsRes] = await Promise.all([
    getSiteData(),
    getProductsServerAction(),
    getProjectsServerAction(),
  ]);

  const data = siteData?.data;
  const products = productsRes?.data?.results || data?.product || [];
  const projects = projectsRes?.data?.results || data?.project || [];

  return (
    <main className="flex-1">
      <HeroSlider 
        sliders={data?.slider} 
        agencies={data?.our_agent} 
        products={products}
        projects={projects}
      />
      <AboutUs content={data?.content} goals={data?.gool} />
      <Services services={data?.service} publicServices={data?.public_service} />
      <Products products={products} content={data?.content} isHomePage={true} />
      <Projects projects={projects} isHomePage={true} />
      <Testimonials reviews={data?.customer_review} />
      <Branches branches={data?.branch} />
      <Contact content={data?.content} />
      <ChatBot />
    </main>
  );
}
