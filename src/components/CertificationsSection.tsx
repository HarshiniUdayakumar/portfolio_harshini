import { motion } from 'framer-motion';

const CERTS = [
  {
    icon: '🤖',
    title: 'Getting Started with Artificial Intelligence',
    issuer: 'IBM',
    accent: '#2563EB',
    backScore: '',
    backBadge: 'AI FOUNDATIONS',
  },
  {
    icon: '🎨',
    title: 'Responsive Web Design',
    issuer: 'FREECODECAMP',
    accent: '#F59E0B',
    backScore: '',
    backBadge: 'FRONTEND FOUNDATIONS',
  },
  {
    icon: '⚛️',
    title: 'Quantum Computing',
    issuer: 'C-DAC · IIT ROORKEE',
    accent: '#06B6D4',
    backScore: '',
    backBadge: 'QUANTUM FUNDAMENTALS',
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    accent: '#EF4444',
    backScore: '',
    backBadge: 'SECURITY BASICS',
  },

  {
    icon: '🍃',
    title: 'MongoDB Basics for Students',
    issuer: 'MONGODB',
    accent: '#10B981',
    backScore: '',
    backBadge: 'DATABASE FUNDAMENTALS',
  },
  {
    icon: '🤖',
    title: 'Digital Skills: Artificial Intelligence',
    issuer: 'ACCENTURE',
    accent: '#7C3AED',
    backScore: '87%',
    backBadge: '🏆 TOP PERFORMER',
  },
  {
    icon: '>_',
    title: 'Data Structures in C',
    issuer: 'SIMPLILEARN',
    accent: '#10B981',
    backScore: '',
    backBadge: 'CORE CS FUNDAMENTALS',
  },
  {
    icon: '🔐',
    title: 'Career Essentials in Cybersecurity',
    issuer: 'MICROSOFT · LINKEDIN',
    accent: '#3B82F6',
    backScore: '',
    backBadge: 'THREAT & RISK MGMT',
  },

  {
    icon: '🎨',
    title: 'Responsive Web Design',
    issuer: 'LINKEDIN',
    accent: '#0A66C2',
    backScore: '',
    backBadge: 'CSS · UI DESIGN',
  },
  {
    icon: '💻',
    title: 'Honours Diploma in Computer Application',
    issuer: 'CSC COMPUTER KOLATHUR',
    accent: '#8B5CF6',
    backScore: '',
    backBadge: 'COMPUTER APPLICATIONS',
  },
  {
    icon: '🧠',
    title: 'Career Essentials in Cybersecurity',
    issuer: 'MICROSOFT · LINKEDIN',
    accent: '#1D4ED8',
    backScore: '',
    backBadge: 'PROFESSIONAL CERTIFIED',
  },
  {
    icon: '🤖',
    title: 'UiPath Automation Implementation Methodology Fundamentals',
    issuer: 'UIPATH',
    accent: '#F97316',
    backScore: '',
    backBadge: 'RPA FUNDAMENTALS',
  },
];

const CertificationsSection = () => {
  return (
    <section
      id="certifications"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'transparent',
        padding: '60px 0 80px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: 'rgba(6,182,212,0.5)',
              letterSpacing: '0.15em',
            }}
          >
            {'// MODULE_05 / CREDENTIALS'}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem,4vw,3rem)',
              color: '#fff',
              marginTop: 8,
            }}
          >
            CERTIFICATIONS & CREDENTIALS
          </h2>

          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(6,182,212,0.08)',
              marginTop: 16,
            }}
          />
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.title + i}
              initial={{ opacity: 0, rotateY: -15, scale: 0.96 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                height: 200,
                perspective: 1200,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.4,0.2,0,1)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'rotateY(180deg)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'rotateY(0deg)')
                }
              >
                {/* FRONT */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 12,
                    background: 'rgba(13,17,23,0.85)',
                    border: `1px solid ${cert.accent}2e`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: `${cert.accent}1a`,
                      border: `1px solid ${cert.accent}40`,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                    }}
                  >
                    {cert.icon}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#fff',
                      marginTop: 10,
                    }}
                  >
                    {cert.title}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      color: `${cert.accent}80`,
                      marginTop: 6,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                {/* BACK */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 12,
                    background: 'rgba(13,17,23,0.85)',
                    border: `1px solid ${cert.accent}2e`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center',
                    gap: 8,
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div style={{ fontSize: 13, color: '#fff' }}>
                    {cert.title}
                  </div>

                  {cert.backScore && (
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 20,
                        color: '#F59E0B',
                      }}
                    >
                      {cert.backScore}
                    </div>
                  )}

                  <div style={{ fontSize: 10, color: '#4B5563' }}>
                    {cert.issuer}
                  </div>

                  <span
                    style={{
                      background: `${cert.accent}1a`,
                      border: `1px solid ${cert.accent}4d`,
                      padding: '4px 10px',
                      borderRadius: 4,
                      fontSize: 10,
                      color: cert.accent,
                    }}
                  >
                    {cert.backBadge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;