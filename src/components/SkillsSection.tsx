import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    id: 'LANG_01', icon: '💻', title: 'Programming Languages', accent: '#06B6D4',
    highlighted: ['Java', 'Python', 'JavaScript', 'C', 'HTML', 'CSS'],
  },
  {
    id: 'WEB_02', icon: '🌐', title: 'Web Development', accent: '#3B82F6',
    highlighted: ['Spring Boot', 'React', 'REST APIs', 'Full-Stack Java', 'Responsive Web Design'],
  },
  {
    id: 'AI_03', icon: '🤖', title: 'AI / ML', accent: '#7C3AED',
    highlighted: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'Data Science', 'Model Training'],
    tooltips: {
      'Machine Learning': 'Preprocessing · Training · Evaluation Pipelines',
      'Computer Vision': 'OpenCV · MediaPipe · Landmark Detection',
      'Deep Learning': 'TensorFlow · Keras · LSTM',
      'Data Science': 'Statistical Analysis · Visualization',
    },
  },
  {
    id: 'SEC_04', icon: '🔐', title: 'Cybersecurity', accent: '#EF4444',
    highlighted: ['Malware Analysis', 'Cryptography', 'Web Exploitation', 'Digital Forensics', 'Secure Coding'],
  },
  {
    id: 'TOOL_05', icon: '🛠', title: 'Tools', accent: '#F59E0B',
    highlighted: ['Git', 'GitHub', 'Postman', 'VS Code', 'IntelliJ IDEA'],
  },
  {
    id: 'DB_06', icon: '🗄', title: 'Database', accent: '#10B981',
    highlighted: ['MySQL','SQL', 'Database Design'],
  },
  {
    id: 'SOFT_07', icon: '🤝', title: 'Soft Skills', accent: '#EC4899',
    highlighted: ['Problem Solving', 'Critical Thinking', 'Team Collaboration', 'Communication'],
  },
];

const DOMAINS = [
  { icon: '⚡', name: 'Full Stack Dev' },
  { icon: '🤖', name: 'AI Engineering' },
  { icon: '🛡', name: 'Cybersecurity' },
  { icon: '📊', name: 'Data Analytics' },
  { icon: '🎨', name: 'UI/UX Design' },
];

const SkillChip = ({ text, accent, highlighted, tooltip }) => {
  const [showTip, setShowTip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => { tooltip && setShowTip(true); setIsHovered(true); }}
      onMouseLeave={() => { setShowTip(false); setIsHovered(false); }}
      whileHover={highlighted ? { scale: 1.08, y: -2 } : { scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span style={{
        display: 'inline-block',
        background: highlighted
          ? (isHovered ? `${accent}38` : `${accent}1f`)
          : `${accent}0a`,
        border: `1px solid ${highlighted ? (isHovered ? `${accent}99` : `${accent}66`) : `${accent}1f`}`,
        color: highlighted ? '#fff' : (isHovered ? '#94A3B8' : '#4B5563'),
        padding: '4px 12px',
        borderRadius: 5,
        fontSize: 13,
        fontWeight: highlighted ? 600 : 400,
        boxShadow: highlighted
          ? (isHovered
            ? `0 0 16px ${accent}55, 0 0 32px ${accent}22, inset 0 0 8px ${accent}15`
            : `0 0 8px ${accent}33`)
          : 'none',
      }}>
        {text}
      </span>

      {showTip && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
            background: 'rgba(13,17,23,0.98)',
            border: `1px solid ${accent}66`,
            borderRadius: 6,
            padding: '6px 10px',
            fontSize: 10,
            color: '#C4B5FD',
            whiteSpace: 'nowrap',
            zIndex: 50,
          }}
        >
          {tooltip}
        </motion.div>
      )}
    </motion.div>
  );
};

const SkillsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="skills" style={{
      position: 'relative',
      zIndex: 10,
      background: 'transparent',
      padding: isMobile ? '60px 0' : '80px 0'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: isMobile ? 32 : 48 }}>
          <span style={{ fontSize: 13, color: 'rgba(6,182,212,0.5)' }}>
            {'// MODULE_02 / TECHNICAL.SKILLS'}
          </span>
          <h2 style={{
            fontWeight: 800,
            fontSize: 'clamp(1.6rem,4vw,3rem)',
            color: '#fff',
            marginTop: 8
          }}>
            TECHNICAL SKILLS
          </h2>
          <p style={{ fontSize: 13, color: '#4B5563', marginTop: 8 }}>
            Domain-specialized expertise · highlighted tools shown
          </p>
        </div>

        {/* CARDS */}
        <div style={{
          display: 'grid',
          gap: isMobile ? 12 : 14
        }}
        className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'rgba(13,17,23,0.7)',
                border: `1px solid ${card.accent}1a`,
                borderRadius: 12,
                padding: isMobile ? 16 : 22,

                // ✅ FIX: disable center hack on mobile
                gridColumn: (!isMobile && card.id === 'SOFT_07') ? '2 / 3' : 'auto',
              }}
            >

              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div>{card.icon}</div>
                <div style={{ color: card.accent }}>{card.title}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {card.highlighted.map(s => (
                  <SkillChip
                    key={s}
                    text={s}
                    accent={card.accent}
                    highlighted
                    tooltip={card.tooltips?.[s]}
                  />
                ))}
              </div>

            </motion.div>
          ))}

          {/* DOMAINS */}
          <motion.div
            style={{
              gridColumn: '1 / -1',
              padding: isMobile ? 16 : 22
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: isMobile ? 10 : 14
            }}>
              {DOMAINS.map((d, i) => (
                <motion.div
                  key={d.name}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    padding: isMobile ? '10px 14px' : '14px 20px',
                    minWidth: isMobile ? 110 : 130,
                    borderRadius: 10,
                    background: 'rgba(20,184,166,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <div>{d.icon}</div>
                  <div style={{ fontSize: 12 }}>{d.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;