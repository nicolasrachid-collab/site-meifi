import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import DesignSection from '@/components/DesignSection';
import StatsSection from '@/components/StatsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import VideoTestimonialSection from '@/components/VideoTestimonialSection';
import PartnerTestimonialsSection from '@/components/PartnerTestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import CallToActionSection from '@/components/CallToActionSection';
import FAQSection from '@/components/FAQSection';
import TeamSection from '@/components/TeamSection';
import ContactFormSection from '@/components/ContactFormSection';
import Footer from '@/components/Footer';
import { wordpressService } from '@/services/wordpress';

function LoadingFallback() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-gray-500">Carregando...</div>
    </div>
  );
}

async function HeroSectionWithData() {
  const homeData = await wordpressService.getHomeData();
  return <HeroSection data={homeData} />;
}

async function ProjectsSectionWithData() {
  const projects = await wordpressService.getProjects({ perPage: 4 });
  return <ProjectsSection projects={projects} />;
}

export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <HeroSectionWithData />
      </Suspense>
      <Suspense fallback={null}>
        <DesignSection />
      </Suspense>
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsSectionWithData />
      </Suspense>
      <Suspense fallback={null}>
        <ExpertiseSection />
      </Suspense>
      <Suspense fallback={null}>
        <VideoTestimonialSection />
      </Suspense>
      <Suspense fallback={null}>
        <PartnerTestimonialsSection />
      </Suspense>
      <Suspense fallback={null}>
        <InsightsSection />
      </Suspense>
      <Suspense fallback={null}>
        <CallToActionSection />
      </Suspense>
      <Suspense fallback={null}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={null}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={null}>
        <ContactFormSection />
      </Suspense>
      <Footer />
    </main>
  );
}

