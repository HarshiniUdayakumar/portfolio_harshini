import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "button">("default");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

  const [particles, setParticles] = useState<any[]>([]);
  const [sparks, setSparks] = useState<any[]>([]);

  const magnetTarget = useRef({ x: 0, y: 0, active: false });

  // 🖱️ MOVE
  const handleMove = useCallback((e: MouseEvent) => {
    let mx = e.clientX;
    let my = e.clientY;

    if (magnetTarget.current.active) {
      const { x: tx, y: ty } = magnetTarget.current;
      const pull = 0.25;
      mx += (tx - mx) * pull;
      my += (ty - my) * pull;
    }

    x.set(mx);
    y.set(my);

    // ✨ PARTICLE TRAIL
    setParticles((prev) => [
      ...prev.slice(-20),
      { id: Date.now(), x: mx, y: my },
    ]);
  }, [x, y]);

  // ⚡ CLICK SPARKS
  const createSparks = (cx: number, cy: number) => {
    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      angle: (i / 8) * Math.PI * 2,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 400);
  };

  useEffect(() => {
    if ("ontouchstart" in window) return;
    setVisible(true);

    window.addEventListener("mousemove", handleMove);

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      createSparks(e.clientX, e.clientY);
    };
    const onUp = () => setClicking(false);

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const addHover = (e: Event) => {
      setHovering(true);
      const el = e.currentTarget as HTMLElement;

      if (el.tagName === "A") setMode("link");
      else if (el.tagName === "BUTTON") setMode("button");

      const rect = el.getBoundingClientRect();
      magnetTarget.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        active: true,
      };
    };

    const removeHover = () => {
      setHovering(false);
      setMode("default");
      magnetTarget.current.active = false;
    };

    const elements = document.querySelectorAll("a, button, .cursor-magnetic");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [handleMove]);

  if (!visible) return null;

  return (
    <>
      {/* ✨ PARTICLES */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#06B6D4",
            pointerEvents: "none",
            zIndex: 9997,
          }}
        />
      ))}

      {/* ⚡ SPARKS */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(s.angle) * 30,
            y: Math.sin(s.angle) * 30,
            opacity: 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            left: s.x,
            top: s.y,
            width: 3,
            height: 3,
            background: "#7C3AED",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        />
      ))}

      {/* 🧠 AI PULSE */}
      <motion.div
        style={{
          position: "fixed",
          left: smoothX,
          top: smoothY,
          x: -30,
          y: -30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.2), transparent)",
          pointerEvents: "none",
          zIndex: 9998,
          scale: hovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 🎯 TARGET RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        style={{
          position: "fixed",
          left: smoothX,
          top: smoothY,
          x: -18,
          y: -18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid #06B6D4",
          pointerEvents: "none",
          zIndex: 9999,
          scale: mode === "button" ? 1.8 : hovering ? 1.4 : 1,
        }}
      />

      {/* ✖ CROSSHAIR */}
      <motion.div
        style={{
          position: "fixed",
          left: smoothX,
          top: smoothY,
          x: -10,
          y: -10,
          width: 20,
          height: 20,
          pointerEvents: "none",
          zIndex: 10000,
        }}
      >
        <div style={{ position: "absolute", top: "50%", width: "100%", height: 1, background: "#06B6D4" }} />
        <div style={{ position: "absolute", left: "50%", height: "100%", width: 1, background: "#06B6D4" }} />
      </motion.div>

      {/* 💎 CORE */}
      <motion.div
        style={{
          position: "fixed",
          left: smoothX,
          top: smoothY,
          x: -3,
          y: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#06B6D4",
          pointerEvents: "none",
          zIndex: 10001,
          scale: clicking ? 2 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;