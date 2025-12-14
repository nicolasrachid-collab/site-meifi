import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import DesignSection from './components/DesignSection';
import StatsSection from './components/StatsSection';
import ProjectsSection from './components/ProjectsSection';
import ExpertiseSection from './components/ExpertiseSection';
import VideoTestimonialSection from './components/VideoTestimonialSection';
import PartnerTestimonialsSection from './components/PartnerTestimonialsSection';
import InsightsSection from './components/InsightsSection';
import CallToActionSection from './components/CallToActionSection';
import FAQSection from './components/FAQSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import CoastalRetreatHero from './components/CoastalRetreatHero';
import ProjectInfoSection from './components/ProjectInfoSection';
import ProjectGallerySection from './components/ProjectGallerySection';
import ProjectProcessSection from './components/ProjectProcessSection';
import ProjectRelatedSection from './components/ProjectRelatedSection';
import SelectedProjectsHero from './components/SelectedProjectsHero';
import SelectedProjectsGrid from './components/SelectedProjectsGrid';
import ContactFormSection from './components/ContactFormSection';

type PageState = 'home' | 'projects-list' | 'project-detail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('home');

  // Navega para a lista de projetos (Selected Projects)
  const navigateToProjectsList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('projects-list');
  };

  // Navega para o detalhe de um projeto específico (Coastal Retreat)
  const navigateToProjectDetail = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('project-detail');
  };

  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('home');
  };

  // Página de Detalhe do Projeto (Coastal Retreat)
  if (currentPage === 'project-detail') {
    return (
      <main className="w-full min-h-screen bg-white">
        <CoastalRetreatHero onBack={navigateToProjectsList} />
        <ProjectInfoSection />
        <ProjectGallerySection />
        <ProjectProcessSection />
        <ProjectRelatedSection />
        <ContactFormSection />
        <Footer />
      </main>
    );
  }

  // Página de Lista de Projetos (Selected Projects)
  if (currentPage === 'projects-list') {
    return (
      <main className="w-full min-h-screen bg-white">
        <SelectedProjectsHero onBack={navigateToHome} />
        <SelectedProjectsGrid onProjectClick={navigateToProjectDetail} />
        <ContactFormSection />
        <Footer />
      </main>
    );
  }

  // Home Page
  return (
    <main className="w-full min-h-screen">
      <HeroSection />
      <DesignSection />
      <StatsSection />
      <ProjectsSection 
        onNavigateToProjects={navigateToProjectsList} 
        onProjectClick={navigateToProjectDetail}
      />
      <ExpertiseSection />
      <VideoTestimonialSection />
      <PartnerTestimonialsSection />
      <InsightsSection />
      <CallToActionSection />
      <FAQSection />
      <TeamSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
};

export default App;