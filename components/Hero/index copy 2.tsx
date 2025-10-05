"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ClaimButton from "@/components/ClaimToken/claim-button";

type ArtifactShard = {
  id: string;
  color: string;
  opacity: number;
  size: number;
  blur: number;
  transform: string;
  delay: number;
};

type Artifact = {
  id: string;
  name: string;
  description: string;
  image: string;
  accent: string;
  aura: string;
  shellGradient: [string, string];
  coreGradient: [string, string];
  ringGradient: [string, string, string];
  shards: ArtifactShard[];
};

const heroHighlights = [
  "Build expansive realms with friends who love storytelling.",
  "Transform co-op adventures into support for real-world causes.",
  "Unlock magical abilities and rewards by learning through play.",
];

const heroStats = [
  { label: "Guilds Forged", value: "2.4K+" },
  { label: "Quests Active", value: "860" },
  { label: "Causes Backed", value: "$1.1M" },
];

const heroArtifacts: Artifact[] = [
  {
    id: "aurora-spire",
    name: "Aurora Spire",
    description:
      "A crystalline beacon that channels skyfire into your guild sanctuary.",
    image: "/images/hero/character1.png",
    accent: "#38bdf8",
    aura: "rgba(56, 189, 248, 0.35)",
    shellGradient: ["rgba(56, 189, 248, 0.16)", "rgba(59, 130, 246, 0.54)"],
    coreGradient: ["rgba(191, 219, 254, 0.95)", "rgba(14, 165, 233, 0.85)"],
    ringGradient: [
      "rgba(125, 211, 252, 0.65)",
      "rgba(99, 102, 241, 0.55)",
      "rgba(15, 23, 42, 0)",
    ],
    shards: [
      {
        id: "aurora-shard-1",
        color: "rgba(56, 189, 248, 0.55)",
        opacity: 0.65,
        size: 190,
        blur: 28,
        transform: "translate3d(-44%, -42%, 140px)",
        delay: 0,
      },
      {
        id: "aurora-shard-2",
        color: "rgba(14, 165, 233, 0.45)",
        opacity: 0.5,
        size: 150,
        blur: 24,
        transform: "translate3d(48%, -18%, 160px)",
        delay: 0.2,
      },
      {
        id: "aurora-shard-3",
        color: "rgba(224, 242, 254, 0.6)",
        opacity: 0.5,
        size: 130,
        blur: 20,
        transform: "translate3d(-18%, 46%, 120px)",
        delay: 0.45,
      },
    ],
  },
  {
    id: "violet-arcanum",
    name: "Violet Arcanum",
    description:
      "A prismatic grimoire weaving starlight into protective barriers.",
    image: "/images/hero/character2.png",
    accent: "#c084fc",
    aura: "rgba(192, 132, 252, 0.38)",
    shellGradient: ["rgba(192, 132, 252, 0.18)", "rgba(168, 85, 247, 0.5)"],
    coreGradient: ["rgba(243, 232, 255, 0.9)", "rgba(217, 70, 239, 0.75)"],
    ringGradient: [
      "rgba(233, 213, 255, 0.7)",
      "rgba(192, 132, 252, 0.5)",
      "rgba(89, 28, 135, 0)",
    ],
    shards: [
      {
        id: "violet-shard-1",
        color: "rgba(217, 70, 239, 0.5)",
        opacity: 0.6,
        size: 180,
        blur: 32,
        transform: "translate3d(-38%, -40%, 150px)",
        delay: 0.1,
      },
      {
        id: "violet-shard-2",
        color: "rgba(236, 72, 153, 0.45)",
        opacity: 0.48,
        size: 150,
        blur: 22,
        transform: "translate3d(38%, -6%, 140px)",
        delay: 0.35,
      },
      {
        id: "violet-shard-3",
        color: "rgba(250, 245, 255, 0.55)",
        opacity: 0.46,
        size: 120,
        blur: 20,
        transform: "translate3d(-12%, 42%, 100px)",
        delay: 0.6,
      },
    ],
  },
  {
    id: "solstice-engine",
    name: "Solstice Engine",
    description:
      "An ancient relic that bends solar tides into healing resonance.",
    image: "/images/hero/character3.png",
    accent: "#f97316",
    aura: "rgba(251, 146, 60, 0.32)",
    shellGradient: ["rgba(251, 191, 36, 0.2)", "rgba(249, 115, 22, 0.52)"],
    coreGradient: ["rgba(254, 243, 199, 0.95)", "rgba(234, 179, 8, 0.85)"],
    ringGradient: [
      "rgba(253, 224, 71, 0.65)",
      "rgba(249, 115, 22, 0.55)",
      "rgba(120, 53, 15, 0)",
    ],
    shards: [
      {
        id: "solstice-shard-1",
        color: "rgba(251, 191, 36, 0.55)",
        opacity: 0.6,
        size: 180,
        blur: 30,
        transform: "translate3d(-40%, -38%, 150px)",
        delay: 0.05,
      },
      {
        id: "solstice-shard-2",
        color: "rgba(248, 113, 113, 0.48)",
        opacity: 0.5,
        size: 150,
        blur: 22,
        transform: "translate3d(44%, -10%, 140px)",
        delay: 0.3,
      },
      {
        id: "solstice-shard-3",
        color: "rgba(254, 215, 170, 0.55)",
        opacity: 0.5,
        size: 130,
        blur: 18,
        transform: "translate3d(-10%, 44%, 100px)",
        delay: 0.55,
      },
    ],
  },
];

const Hero = () => {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [activeArtifact, setActiveArtifact] = useState(0);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const canvasElement = canvas;
    const ctx = context;

    const resolveParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      return Math.min(160, Math.max(80, Math.round(area / 22000)));
    };

    const setCanvasSize = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = Math.max(window.innerHeight * 0.72, 540);
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;
        this.life = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvasElement.width;
        this.y = Math.random() * canvasElement.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.4 + 0.3;
        this.alpha = Math.random() * 0.35 + 0.45;
        this.life = Math.random() * 0.6 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        if (this.x < 0 || this.x > canvasElement.width) {
          this.vx *= -1;
        }

        if (this.y < 0 || this.y > canvasElement.height) {
          this.vy *= -1;
        }

        this.alpha = Math.max(0.1, this.alpha - 0.0005);
        this.life -= 0.002;

        if (this.life <= 0 || this.alpha <= 0.12) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `rgba(148, 163, 255, ${this.alpha})`;
        ctx.shadowColor = "rgba(129, 140, 248, 0.5)";
        ctx.shadowBlur = 18;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    let particleTarget = resolveParticleCount();

    const syncParticleCount = () => {
      while (particles.length < particleTarget) {
        particles.push(new Particle());
      }

      if (particles.length > particleTarget) {
        particles.splice(particleTarget);
      }
    };

    const connectParticles = (base: Particle) => {
      particles.forEach((target) => {
        if (base === target) {
          return;
        }

        const dx = base.x - target.x;
        const dy = base.y - target.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.17 - distance / 900})`;
          ctx.lineWidth = 0.45;
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (index % 4 === 0) {
          connectParticles(particle);
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      particleTarget = resolveParticleCount();
      setCanvasSize();
      syncParticleCount();
    };

    setCanvasSize();
    syncParticleCount();
    animationFrameRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const autoRotate = setInterval(() => {
      setActiveArtifact((prev) => (prev + 1) % heroArtifacts.length);
    }, 5200);

    return () => clearInterval(autoRotate);
  }, []);

  const activeArtifactData = heroArtifacts[activeArtifact];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#05020f] via-[#080724] to-[#020015] text-white">
      <canvas
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-45 mix-blend-screen"
      />
      <div className="absolute inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.32),transparent_70%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[640px] bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.28),transparent_70%)] blur-3xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -left-40 top-24 h-80 w-80 rounded-full bg-sky-500/40 blur-[160px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1.05 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1.5,
        }}
        className="absolute -right-40 top-56 h-[420px] w-[420px] rounded-full bg-purple-500/40 blur-[180px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.42em] text-sky-100/90"
            >
              Immersive Multiverse
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Discover{" "}
              <span className="bg-gradient-to-r from-sky-200 via-white to-indigo-300 bg-clip-text text-transparent">
                Magic Worlds 3.0
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-6 max-w-xl text-lg text-slate-200/90 sm:text-xl"
            >
              Shape living stories, empower your guild, and turn playful mastery
              into real-world impact. Every realm you unlock keeps the universe
              thriving for explorers like you.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 grid w-full gap-4 sm:gap-5"
            >
              {heroHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-b from-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  <p className="text-sm text-slate-200/85 sm:text-base">
                    {highlight}
                  </p>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 flex w-full flex-col gap-4 sm:flex-row"
            >
              <ClaimButton />

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.32em] text-white backdrop-blur transition hover:border-white/40 hover:bg-white/20"
              >
                Explore Realms
                <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold transition group-hover:bg-white/40">
                  ➜
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-10 flex w-full flex-col items-center gap-5 text-xs uppercase tracking-[0.32em] text-white/60 sm:flex-row sm:justify-between"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="h-10 w-10 overflow-hidden rounded-full border border-white/40"
                  >
                    <Image
                      src={`/images/user/user-0${index}.png`}
                      alt={`Community member ${index}`}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-center sm:text-right">
                100+ new explorers joined today
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-12 grid w-full gap-4 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.32em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col items-center gap-8"
          >
            <div className="absolute -top-16 hidden h-64 w-[520px] -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-purple-500/20 blur-3xl lg:block" />

            <div className="relative flex h-[360px] w-full max-w-[320px] items-center justify-center [perspective:1600px] sm:h-[440px] sm:max-w-[380px] lg:h-[520px] lg:max-w-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArtifactData.id}
                  initial={{ opacity: 0, rotateY: -28, translateZ: -140 }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    translateZ: 0,
                  }}
                  exit={{ opacity: 0, rotateY: 32, translateZ: -160 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] sm:h-[380px] sm:w-[380px] sm:blur-[140px] lg:h-[440px] lg:w-[440px]"
                    style={{ background: activeArtifactData.aura }}
                    animate={{
                      scale: [0.95, 1.05, 0.95],
                      opacity: [0.45, 0.75, 0.45],
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                  />

                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[42px] border border-white/10 backdrop-blur-xl sm:h-[310px] sm:w-[310px] sm:rounded-[44px] lg:h-[360px] lg:w-[360px] lg:rounded-[46px]"
                    style={{
                      background: `linear-gradient(135deg, ${activeArtifactData.shellGradient[0]}, ${activeArtifactData.shellGradient[1]})`,
                      boxShadow: `0 45px 120px -50px ${activeArtifactData.accent}`,
                    }}
                    animate={{
                      rotateX: [0, -4, 0, 4, 0],
                      rotateY: [0, 6, 0, -6, 0],
                    }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px]"
                    style={{
                      background: `conic-gradient(from 120deg, ${activeArtifactData.ringGradient[0]}, ${activeArtifactData.ringGradient[1]}, ${activeArtifactData.ringGradient[2]})`,
                    }}
                    animate={{ rotateZ: [0, 140, 260, 360] }}
                    transition={{
                      duration: 26,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[34px] border border-white/15 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.8)] sm:h-[240px] sm:w-[240px] sm:rounded-[36px] lg:h-[264px] lg:w-[264px] lg:rounded-[38px]"
                    style={{
                      background: `linear-gradient(140deg, ${activeArtifactData.coreGradient[0]}, ${activeArtifactData.coreGradient[1]})`,
                      transform: "translateZ(120px)",
                    }}
                    animate={{ scale: [1, 1.02, 1], rotateY: [0, -3, 0, 3, 0] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={activeArtifactData.image}
                      alt={activeArtifactData.name}
                      fill
                      className="object-cover mix-blend-screen"
                      sizes="(min-width: 1024px) 340px, 70vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                  </motion.div>

                  {activeArtifactData.shards.map((shard) => (
                    <motion.span
                      key={shard.id}
                      className="absolute rounded-full mix-blend-screen"
                      style={{
                        width: `${shard.size}px`,
                        height: `${shard.size}px`,
                        background: shard.color,
                        opacity: shard.opacity,
                        filter: `blur(${shard.blur}px)`,
                        transform: shard.transform,
                      }}
                      animate={{
                        opacity: [
                          shard.opacity * 0.6,
                          shard.opacity,
                          shard.opacity * 0.6,
                        ],
                        scale: [0.95, 1.05, 0.95],
                        rotateZ: [0, 6, -4, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: shard.delay,
                      }}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-sm text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-white/55">
                Featured Artifact
              </p>
              <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                {activeArtifactData.name}
              </p>
              <p className="mt-2 text-sm text-slate-200/80">
                {activeArtifactData.description}
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2">
              {heroArtifacts.map((artifact, index) => (
                <button
                  key={artifact.id}
                  type="button"
                  onClick={() => setActiveArtifact(index)}
                  aria-label={`Show ${artifact.name}`}
                  aria-pressed={activeArtifact === index}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                    activeArtifact === index
                      ? "border-white/50 bg-white/20 text-white shadow-[0_12px_40px_-20px_rgba(56,189,248,0.9)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {artifact.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
