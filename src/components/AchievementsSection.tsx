import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'ML Board Member — IEEE Computer Society, REC',
    body: 'Driving AI/ML initiatives and knowledge-sharing at institutional level.',
    accent: '#7C3AED',
    tag: 'ACH_01',
  },
  {
    icon: '⚙️',
    title: 'Backend Team — REC INOVX Technical Team',
    body: 'Building backend systems for the college\'s premier innovation hub.',
    accent: '#06B6D4',
    tag: 'ACH_02',
  },
  {
    icon: '💻',
    title: 'HackerRank Challenger',
    body: 'Solved 20+ coding challenges across data structures and algorithms.',
    accent: '#F59E0B',
    tag: 'ACH_03',
  },
  {
    icon: '🎓',
    title: 'Academic Excellence',
    body: 'CGPA 8.69 · 12th: 95.8% · 10th: 93.6% — Consistent top performer.',
    accent: '#10B981',
    tag: 'ACH_04',
  },
];

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 0',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        
        {/* 🔥 HEADER (FIXED) */}
        <div style={{ marginBottom: 50 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: 'rgba(6,182,212,0.6)',
              letterSpacing: '0.15em',
            }}
          >
            {'// MODULE_06 / SYSTEM.ACHIEVEMENTS'}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem,4vw,3rem)',
              color: '#ffffff',
              marginTop: 8,
              textShadow: '0 0 12px rgba(6,182,212,0.25)',
            }}
          >
            ACHIEVEMENTS
          </h2>

          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(6,182,212,0.12)',
              marginTop: 16,
            }}
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.tag}

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}

              // 🔥 SMOOTH DRIZZLE (FIXED - less shaky)
              animate={{
                x: [0, 3, -3, 1, 0],
                y: [0, -5, 5, -2, 0],
                rotate: [0, 1, -1, 0.5, 0],
              }}

              transition={{
                duration: 7 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}

              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 25px ${a.accent}50`,
              }}

              style={{
                background: 'rgba(13,17,23,0.85)',
                border: `1px solid ${a.accent}30`,
                borderRadius: 14,
                padding: 20,
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 10 }}>
                {a.icon}
              </div>

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                {a.title}
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: '#9CA3AF',
                  lineHeight: 1.6,
                }}
              >
                {a.body}
              </div>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 10,
                  color: `${a.accent}80`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {a.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;