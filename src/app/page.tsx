import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Branches from '@/components/Branches';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { getSiteData } from '@/lib/api';

export default async function Home() {
  const siteData = await getSiteData();
  const data = siteData?.data;

  return (
    <main>
      <Navbar contactInfo={data?.content} />
      <HeroSlider sliders={data?.slider} agencies={data?.our_agent} />
      <AboutUs content={data?.content} goals={data?.gool} />
      <Services services={data?.service} publicServices={data?.public_service} />
      <Testimonials reviews={data?.customer_review} />
      <Branches branches={data?.branch} />
      <Contact content={data?.content} />
      <ChatBot />
      <Footer content={data?.content} />
    </main>
  );
}
