import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useMemo } from "react";

const PARTICLES = [
  { x: "12%", y: "18%", size: 8, depth: 1 },
  { x: "78%", y: "12%", size: 5, depth: 1.6 },
  { x: "34%", y: "46%", size: 4, depth: 2.2 },
  { x: "88%", y: "52%", size: 9, depth: 0.9 },
  { x: "22%", y: "72%", size: 6, depth: 1.8 },
  { x: "62%", y: "84%", size: 4, depth: 2.6 },
  { x: "48%", y: "26%", size: 3, depth: 3 },
  { x: "70%", y: "66%", size: 7, depth: 1.3 },
];

export function AnimatedBackground() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollY);

  // Drift reacts to scroll velocity, then settles when scrolling stops.
  const drift = useSpring(velocity, { stiffness: 60, damping: 24, mass: 0.6 });
  const grid = useTransform(scrollY, (v) => v * 0.12);
  const wash = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.6, 0.4]);

  const particles = useMemo(() => PARTICLES, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: reduced ? 0 : grid }}
        className="absolute -inset-y-32 inset-x-0 grid-bg opacity-60"
      />

      <motion.div
        style={{ opacity: reduced ? 1 : wash }}
        className="animate-blob absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-indigo/25 blur-[140px]"
      />
      <div
        className="animate-blob absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan/20 blur-[130px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[150px]"
        style={{ animationDelay: "-14s" }}
      />

      {!reduced &&
        particles.map((p, i) => (
          <Particle key={i} drift={drift} {...p} />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
    </div>
  );
}

function Particle({
  x,
  y,
  size,
  depth,
  drift,
}: {
  x: string;
  y: string;
  size: number;
  depth: number;
  drift: ReturnType<typeof useSpring>;
}) {
  const ty = useTransform(drift, (v) => (-v / 90) * depth);
  const tx = useTransform(drift, (v) => (v / 420) * depth);
  const scale = useTransform(drift, (v) => 1 + Math.min(Math.abs(v) / 12000, 0.6));

  return (
    <motion.span
      style={{ left: x, top: y, width: size, height: size, y: ty, x: tx, scale }}
      className="absolute rounded-full bg-accent/50 blur-[1px]"
    />
  );
}
