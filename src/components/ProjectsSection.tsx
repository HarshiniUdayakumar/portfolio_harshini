import { motion } from 'framer-motion';

const PROJECTS = [
  {
    id: 'PROJECT_01', name: 'EcoScan', accent: '#14B8A6',
    stack: 'Java · Spring Boot · React · Material UI · MySQL · OpenWeatherMap API',
    desc: 'Full-stack platform for real-time AQI monitoring and pollution reporting with live dashboards.',
    techs: ['Java', 'Spring Boot', 'React', 'MySQL'],
    github: 'https://github.com/HarshiniUdayakumar',
  },
  {
    id: 'PROJECT_02', name: 'Sign Language System', accent: '#7C3AED',
    stack: 'Python · OpenCV · MediaPipe · TensorFlow · Keras · LSTM · Unity',
    desc: 'Bidirectional sign-to-text and speech-to-sign system with 3D Unity avatar integration.',
    techs: ['Python', 'OpenCV', 'TensorFlow', 'Unity'],
    github: 'https://github.com/HarshiniUdayakumar',
  },
  {
    id: 'PROJECT_03', name: 'Construction Website', accent: '#F59E0B',
    stack: 'React · TypeScript · Tailwind CSS · Vite · shadcn-ui',
    desc: 'Responsive corporate website showcasing services and completed projects.',
    techs: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/HarshiniUdayakumar',
  },

  // ✅ Added Malware Project
  {
    id: 'PROJECT_04',
    name: 'Malware Detection System',
    accent: '#EF4444',
    stack: 'Python · Scikit-learn · YARA · Assembly',
    desc: 'ML-based malware classifier using static and dynamic analysis. Detects and categorizes malicious software with 95% accuracy.',
    techs: ['Python', 'Scikit-learn', 'YARA', 'Assembly'],
    github: 'https://github.com/HarshiniUdayakumar',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: '60px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 40 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.15em' }}>{'// MODULE_04 / DEPLOYED.SYSTEMS'}</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginTop: 8 }}>PROJECTS BUILD</h2>
        <div style={{ width: '100%', height: 1, background: 'rgba(6,182,212,0.08)', marginTop: 16 }} />
      </div>

      {/* ✅ FIXED GRID (same size cards) */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div className="lg:grid-cols-2 md:grid-cols-2 grid-cols-1" style={{ display: 'grid', gap: 20 }}>
          
          {PROJECTS.map((proj, i) => {
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 12px 48px ${proj.accent}18, 0 0 0 1px ${proj.accent}33`,
                }}
                style={{
                  background: 'rgba(13,17,23,0.85)',
                  border: `1px solid ${proj.accent}20`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: `0 4px 32px ${proj.accent}08`,
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Header */}
                <div style={{
                  height: 40,
                  background: `${proj.accent}08`,
                  borderBottom: `1px solid ${proj.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: 8,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: `${proj.accent}80` }}>{proj.id}</span>
                </div>

                {/* Body */}
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#fff' }}>
                    {proj.name}
                  </h3>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: `${proj.accent}80`, marginTop: 4, marginBottom: 12 }}>
                    {proj.stack}
                  </div>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', marginBottom: 16 }}>
                    {proj.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {proj.techs.map(t => (
                      <span key={t} style={{
                        background: `${proj.accent}1f`,
                        border: `1px solid ${proj.accent}66`,
                        padding: '3px 10px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#fff',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#06B6D4', marginTop: 12 }}>
                    [ view project → ]
                    <div style={{ marginTop: 8 }}>
  <a 
    href={(proj as any).github} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
  >
    {/* GitHub Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="#fff"
      viewBox="0 0 24 24"
      style={{ opacity: 0.8 }}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.84 10.91.57.1.78-.25.78-.56v-2.17c-3.19.69-3.86-1.54-3.86-1.54-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.63.23 2.83.11 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.68 5.4-5.24 5.69.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.79.56A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
    </svg>

    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: '#fff'
    }}>
      GitHub
    </span>
  </a>
</div>
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;