"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClaimButton from "../ClaimToken/claim-button";

const Hero = () => {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles: Particle[] = [];
    const particleCount = Math.min(120, Math.floor(window.innerWidth / 10));

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        const blue = Math.floor(Math.random() * 80 + 175);
        const green = Math.floor(Math.random() * 60 + 130);
        this.color = `rgba(90, ${green}, ${blue}, ${Math.random() * 0.4 + 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.25) this.size -= 0.005;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const connectParticles = (base: Particle) => {
      if (!ctx) return;
      particles.forEach((target) => {
        const dx = base.x - target.x;
        const dy = base.y - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(88, 134, 255, ${0.35 - distance / 400})`;
          ctx.lineWidth = 0.45;
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      });
    };

    const initParticles = () => {
      particles.splice(0, particles.length);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (index % 2 === 0) connectParticles(particle);

        if (particle.size <= 0.24) {
          particles[index] = new Particle();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Game characters for the carousel
  const gameCharacters = [
    {
      id: 1,
      name: "Play",
      tagline: "Quest through curated game worlds",
      src: "/images/hero/character1.png",
      progress: 82,
      accent: "from-cyan-400/80 via-sky-500/40 to-blue-500/20",
    },
    {
      id: 2,
      name: "Earn",
      tagline: "Unlock rewards that fuel real causes",
      src: "/images/hero/character2.png",
      progress: 68,
      accent: "from-emerald-400/70 via-teal-500/40 to-cyan-500/20",
    },
    {
      id: 3,
      name: "Donate",
      tagline: "Empower communities with every victory",
      src: "/images/hero/character3.png",
      progress: 91,
      accent: "from-purple-400/75 via-fuchsia-500/35 to-indigo-500/20",
    },
  ];

  const highlights = [
    {
      title: "Impact Gaming",
      description: "Every session funds real-world projects",
    },
    {
      title: "Open & Inclusive",
      description: "Built with community-first open tooling",
    },
    {
      title: "Instant Rewards",
      description: "Track achievements across the multiverse",
    },
  ];

  const stats = [
    { label: "Daily quests", value: "42" },
    { label: "Guild allies", value: "128K" },
    { label: "Causes funded", value: "73" },
  ];

  const [activeCharacter, setActiveCharacter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCharacter((prev) => (prev + 1) % gameCharacters.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [gameCharacters.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <canvas
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
      />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.25),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/0 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.3, scale: 1.05 }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/30 to-sky-500/0 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.07fr),minmax(0,0.93fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/90"
            >
              Play · Earn · Empower
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              A refreshed universe where your wins ripple beyond the screen
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-6 max-w-xl text-lg text-slate-200/90 sm:text-xl"
            >
              Step inside Magic Worlds 3.0 — a cinematic home for purposeful
              play. Craft teams, conquer cooperative quests, and direct your
              rewards to real-world impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <ClaimButton />

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                Explore Worlds
                <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold transition group-hover:bg-white/30">
                  ➜
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-12 grid w-full gap-4 sm:grid-cols-3"
            >
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-white/90">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-200/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-10 flex w-full flex-col items-center justify-between gap-5 text-sm text-slate-200/70 sm:flex-row"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 overflow-hidden rounded-full border border-white/30"
                  >
                    <Image
                      src={`/images/user/user-0${i}.png`}
                      alt={`Community member ${i}`}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-center text-xs uppercase tracking-[0.25em] text-white/60 sm:text-left">
                100+ New allies joined today
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-0 -translate-y-8 rounded-[46px] bg-gradient-to-br from-cyan-500/10 via-indigo-500/0 to-fuchsia-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_25px_80px_-15px_rgba(14,165,233,0.45)] backdrop-blur">
              <div className="flex flex-col gap-6 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-100/70">
                    Featured realm
                  </span>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                    Live rotation
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCharacter}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative h-[240px] w-full"
                    >
                      <Image
                        src={gameCharacters[activeCharacter].src}
                        alt={gameCharacters[activeCharacter].name}
                        fill
                        priority
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 z-20 grid gap-1 p-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-100/80">
                      {gameCharacters[activeCharacter].name}
                    </span>
                    <span className="text-sm text-slate-200/80">
                      {gameCharacters[activeCharacter].tagline}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                    <span>Progress</span>
                    <span>{gameCharacters[activeCharacter].progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={`progress-${activeCharacter}`}
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${gameCharacters[activeCharacter].progress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.1,
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${gameCharacters[activeCharacter].accent}`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_30px_-12px_rgba(56,189,248,0.6)]"
                  >
                    Enter realm
                  </motion.button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50">
                  {gameCharacters.map((character, index) => (
                    <button
                      key={character.id}
                      onClick={() => setActiveCharacter(index)}
                      className={`rounded-full border px-4 py-2 transition ${
                        activeCharacter === index
                          ? "border-white/60 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {character.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/5 bg-black/20 p-4 text-center backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        canvas {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  );
};

export default Hero;
