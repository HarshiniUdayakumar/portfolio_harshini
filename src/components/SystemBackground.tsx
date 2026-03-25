import { useEffect, useRef } from 'react';

interface BinaryStream {
  x: number;
  chars: { char: string; y: number; opacity: number }[];
  speed: number;
  opacity: number;
  frameCount: number;
}

interface CircuitPath {
  points: [number, number][];
  glowIndex: number;
}

const SystemBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;
    let time = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Binary streams
    const streams: BinaryStream[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * W,
      chars: [],
      speed: 0.4 + Math.random() * 0.8,
      opacity: 0.06 + Math.random() * 0.08,
      frameCount: 0,
    }));

    // Circuit paths
    const getPaths = (): CircuitPath[] => [
      { points: [[W*0.1,H*0.2],[W*0.1+200,H*0.2],[W*0.1+200,H*0.2+80],[W*0.1+320,H*0.2+80]], glowIndex: 0 },
      { points: [[W*0.7,H*0.4],[W*0.7-150,H*0.4],[W*0.7-150,H*0.4+60],[W*0.7-250,H*0.4+60]], glowIndex: 0 },
      { points: [[W*0.85,H*0.7],[W*0.85,H*0.7-100],[W*0.85-180,H*0.7-100]], glowIndex: 0 },
      { points: [[W*0.2,H*0.8],[W*0.2+120,H*0.8],[W*0.2+120,H*0.8-50],[W*0.2+200,H*0.8-50]], glowIndex: 0 },
    ];

    const draw = () => {
      time++;
      ctx.fillStyle = '#0B0F14';
      ctx.fillRect(0, 0, W, H);

      // A) Grid
      const offsetY = (time * 0.12) % 48;
      const offsetX = (time * 0.06) % 48;
      ctx.strokeStyle = 'rgba(6,182,212,0.04)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let y = -48 + offsetY; y < H + 48; y += 48) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      for (let x = -48 + offsetX; x < W + 48; x += 48) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      ctx.stroke();

      // B) Data points
      for (let x = 0; x < W; x += 288) {
        for (let y = 0; y < H; y += 288) {
          const px = x + offsetX;
          const py = y + offsetY;
          const op = 0.06 + 0.1 * Math.sin(time * 0.02 + px * 0.01 + py * 0.01);
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6,182,212,${op})`;
          ctx.fill();
        }
      }

      // C) Binary streams
      ctx.font = '10px JetBrains Mono';
      streams.forEach(s => {
        s.frameCount++;
        if (s.frameCount % 8 === 0 && s.chars.length < 20) {
          s.chars.push({ char: Math.random() > 0.5 ? '1' : '0', y: 0, opacity: s.opacity });
        }
        s.chars.forEach(c => {
          c.y += s.speed;
          if (c.y > H) c.y = 0;
          ctx.fillStyle = `rgba(6,182,212,${c.opacity})`;
          ctx.fillText(c.char, s.x, c.y);
        });
        if (s.chars.length > 20) s.chars.shift();
      });

      // D) Scanning line
      const sy = (time * 0.5) % H;
      const grad = ctx.createLinearGradient(0, sy - 40, 0, sy + 40);
      grad.addColorStop(0, 'rgba(6,182,212,0)');
      grad.addColorStop(0.5, 'rgba(6,182,212,0.04)');
      grad.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, sy - 40, W, 80);

      // E) Circuit paths
      const paths = getPaths();
      paths.forEach((path, pi) => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6,182,212,0.06)';
        ctx.lineWidth = 1;
        path.points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p[0], p[1]);
          else ctx.lineTo(p[0], p[1]);
        });
        ctx.stroke();
        path.points.forEach((p, i) => {
          const glow = Math.sin(time * 0.03 + pi) > 0 && i === Math.floor(time * 0.02 + pi) % path.points.length;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 3, 0, Math.PI * 2);
          ctx.fillStyle = glow ? 'rgba(6,182,212,0.35)' : 'rgba(6,182,212,0.12)';
          if (glow) { ctx.shadowBlur = 6; ctx.shadowColor = '#06B6D4'; }
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // F) System status
      const sx = W - 180;
      const syy = 20;
      ctx.globalAlpha = 0.4;
      const glowS = Math.sin(time * 0.05);
      ctx.shadowBlur = glowS > 0 ? 8 : 2;
      ctx.shadowColor = '#10B981';
      ctx.fillStyle = '#10B981';
      ctx.fillRect(sx, syy, 8, 8);
      ctx.shadowBlur = 0;
      ctx.font = '9px JetBrains Mono';
      ctx.fillStyle = 'rgba(16,185,129,0.5)';
      ctx.fillText('SYS ONLINE', sx + 14, syy + 7);
      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.fillText('CPU 34%', sx, syy + 22);
      ctx.fillRect(sx + 50, syy + 16, 40 * 0.34, 3);
      ctx.fillText('MEM 61%', sx, syy + 36);
      ctx.fillRect(sx + 50, syy + 30, 40 * 0.61, 3);
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default SystemBackground;
