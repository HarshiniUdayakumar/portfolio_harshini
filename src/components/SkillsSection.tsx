import { useState } from 'react';
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

const SkillChip = ({ text, accent, highlighted, tooltip }: { text: string; accent: string; highlighted: boolean; tooltip?: string }) => {
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
        fontSize: 14,
        fontWeight: highlighted ? 600 : 400,
        fontFamily: 'var(--font-body)',
        boxShadow: highlighted
          ? (isHovered
            ? `0 0 16px ${accent}55, 0 0 32px ${accent}22, inset 0 0 8px ${accent}15`
            : `0 0 8px ${accent}33`)
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {text}
      </span>

      {showTip && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#C4B5FD',
            whiteSpace: 'nowrap',
            zIndex: 50,
            boxShadow: `0 4px 20px ${accent}22`,
          }}
        >
          {tooltip}
        </motion.div>
      )}
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.15em' }}>{'// MODULE_02 / TECHNICAL.SKILLS'}</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginTop: 8 }}>TECHNICAL SKILLS</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#4B5563', marginTop: 8 }}>Domain-specialized expertise · highlighted tools shown</p>
          <div style={{ width: '100%', height: 1, background: 'rgba(6,182,212,0.08)', marginTop: 16 }} />
        </div>

        <div style={{ display: 'grid', gap: 14 }} className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              style={{
                background: 'rgba(13,17,23,0.7)',
                border: `1px solid ${card.accent}1a`,
                borderRadius: 12,
                padding: 22,

                // ✅ ONLY THIS LINE ADDED
                gridColumn: card.id === 'SOFT_07' ? '2 / 3' : 'auto',
              }}
            >

              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div>{card.icon}</div>
                <div style={{ color: card.accent }}>{card.title}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {card.highlighted.map(s => (
                  <SkillChip key={s} text={s} accent={card.accent} highlighted tooltip={(card as any).tooltips?.[s]} />
                ))}
              </div>

            </motion.div>
          ))}

          {/* DOMAINS (UNCHANGED) */}
          {/* Domains card */}
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.7, duration: 0.45 }}
  style={{
    gridColumn: '1 / -1',
    background: 'rgba(13,17,23,0.7)',
    border: '1px solid rgba(20,184,166,0.12)',
    borderRadius: 12,
    padding: 22,
    backdropFilter: 'blur(16px)',
  }}
>
  {/* Header */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16
  }}>
    <div style={{
      width: 32,
      height: 32,
      background: 'rgba(20,184,166,0.1)',
      border: '1px solid rgba(20,184,166,0.25)',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>🌍</div>

    <span style={{
      fontWeight: 600,
      fontSize: 14,
      color: '#14B8A6'
    }}>
      Domains
    </span>
  </div>

  {/* Domains Grid */}
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 14
  }}>
    {DOMAINS.map((d, i) => (
      <motion.div
        key={d.name}

        // 🔥 floating animation
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.2
        }}

        whileHover={{
          scale: 1.08,
          y: -4,
          boxShadow: '0 0 20px rgba(20,184,166,0.3)'
        }}

        style={{
          background: 'rgba(20,184,166,0.06)',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: 10,
          padding: '14px 20px',
          textAlign: 'center',
          minWidth: 130,
          cursor: 'default',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ fontSize: 20, marginBottom: 6 }}>
          {d.icon}
        </div>

        <div style={{
          fontSize: 13,
          color: '#14B8A6',
          fontWeight: 600
        }}>
          {d.name}
        </div>
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