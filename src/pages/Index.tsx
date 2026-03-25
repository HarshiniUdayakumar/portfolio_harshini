import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SystemBackground from '@/components/SystemBackground';
import BootScreen from '@/components/BootScreen';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <SystemBackground />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <BootScreen key="boot" onComplete={() => setIntroComplete(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <HeroSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <AchievementsSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
