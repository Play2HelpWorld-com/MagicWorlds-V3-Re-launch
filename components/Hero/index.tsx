"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClaimButton from "../ClaimToken/claim-button";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverGlow, setHoverGlow] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Particle animation setup
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${Math.random() * 80 + 100}, ${Math.random() * 50 + 50}, ${Math.random() * 80 + 175}, ${Math.random() * 0.4 + 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
          if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines if they're close enough
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            if (ctx) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.5 - distance / 100})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Replace particles when they get too small
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          particles.push(new Particle());
        }
      }

      requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Game characters for the carousel
  const gameCharacters = [
    {
      id: 1,
      name: "PLAY",
      src: "/images/hero/character1.png",
      progress: 80,
    },
    {
      id: 2,
      name: "EARN",
      src: "/images/hero/character2.png",
      progress: 65,
    },
    {
      id: 3,
      name: "DONATE",
      src: "/images/hero/character3.png",
      progress: 90,
    },
  ];

  const [activeCharacter, setActiveCharacter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCharacter((prev) => (prev + 1) % gameCharacters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gameCharacters.length]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0a0015] via-[#1a0b2e] to-[#0a0015] pb-12 pt-16 sm:pt-20 md:pt-24 lg:min-h-[900px] lg:pt-32">
      {/* Animated background particles */}
      <canvas ref={particlesRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Radial glow effect */}
      <div className="animate-pulse-slow absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),rgba(168,85,247,0.08),transparent_70%)]" />

      {/* Floating geometric shapes */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute left-4 top-1/4 h-16 w-16 rotate-45 rounded bg-gradient-to-r from-purple-800/40 to-fuchsia-800/50 blur-2xl sm:h-20 sm:w-20 md:left-10 md:h-24 md:w-24"
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute right-4 top-1/3 h-20 w-20 rounded-full bg-gradient-to-r from-fuchsia-800/50 to-purple-900/40 blur-2xl sm:h-24 sm:w-24 md:right-20 md:h-32 md:w-32"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="items-center text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-purple-700 bg-clip-text px-3 py-1 text-transparent sm:px-4"
            >
              <span className="text-sm font-bold tracking-wider drop-shadow-[0_0_15px_rgba(168,85,247,0.9)] sm:text-base lg:text-lg">
                A NEW JOURNEY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-3 bg-clip-text text-3xl font-extrabold leading-tight tracking-tighter text-transparent sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                MAGIC
              </span>{" "}
              <span className="drop-shadow-glow bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                WORLDS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ fontFamily: "'Press Start 2P', cursive" }}
              className="mx-auto mt-4 max-w-xl px-4 text-xs leading-relaxed text-gray-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:mt-6 sm:px-0 sm:text-sm md:text-base lg:text-lg"
            >
              Magic Worlds – Love, Laugh, Learn, Lucrative. Welcome to Magic
              Worlds, a free, family-friendly, and open-source universe where
              you shape your adventures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 flex flex-col flex-wrap items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 md:mt-10 lg:justify-start"
            >
              <ClaimButton />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-3xl border-2 border-purple-700/70 bg-gradient-to-r from-purple-900/50 to-fuchsia-900/40 px-6 py-3 text-sm font-bold text-purple-300 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-600 hover:from-purple-800/60 hover:to-fuchsia-800/50 hover:text-fuchsia-200 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] sm:px-8 sm:py-4 sm:text-base"
              >
                EXPLORE WORLDS
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 hidden items-center justify-center space-x-2 text-sm text-gray-600 sm:mt-8 sm:flex md:text-base lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-purple-800/90 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  >
                    <Image
                      src={`/images/user/user-0${i}.png`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>100+ users have engaged today</span>
            </motion.div>
          </motion.div>

          {/* Right column: Game visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mt-8 sm:mt-10 lg:mt-0"
          >
            {/* Hexagon frame */}
            <div className="animate-slow-spin absolute inset-0 z-0">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <polygon
                  points="200,10 380,120 380,280 200,390 20,280 20,120"
                  fill="none"
                  stroke="url(#hexGradient)"
                  strokeWidth="2"
                  className="animate-pulse-opacity"
                />
                <defs>
                  <linearGradient
                    id="hexGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Energy lines */}
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="rgba(217, 70, 239, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow animation-delay-500"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="90"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse-slow animation-delay-1000"
                />
              </svg>
            </div>

            {/* Rotating 3D game card */}
            <div className="relative flex h-80 w-full items-center justify-center sm:h-96 md:h-[450px] lg:h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCharacter}
                  initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[280px] w-[220px] overflow-hidden rounded-2xl border border-purple-900/50 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2d1b4e]/60 to-[#1a0b2e]/90 p-1 shadow-2xl shadow-purple-950/60 backdrop-blur-sm sm:h-[320px] sm:w-[250px] md:h-[380px] md:w-[300px] lg:h-[350px] lg:w-[280px]">
                      <div className="h-full w-full rounded-xl bg-transparent p-3 sm:p-4">
                        {/* <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-sm font-bold text-transparent">
                            LEGENDARY
                          </span>
                          <div className="flex items-center space-x-1">
                            <svg
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="text-white">5.0</span>
                          </div>
                        </div> */}

                        <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-lg shadow-purple-950/70 sm:h-[180px] md:h-[220px] lg:h-[200px]">
                          <div className="from-[#1a0b2e]/98 absolute inset-0 z-10 bg-gradient-to-t via-[#2d1b4e]/50 to-transparent shadow-xl"></div>
                          <Image
                            src={gameCharacters[activeCharacter].src}
                            alt={gameCharacters[activeCharacter].name}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>

                        <div className="mt-1 text-center">
                          {/* <h3 className="text-md font-bold text-white">
                            {gameCharacters[activeCharacter].name}
                          </h3> */}
                          {/* <div className="mt-2 flex justify-between text-xs text-gray-300">
                            <span>LEVEL 50</span>
                            <span>POWER 9800</span>
                            <span>RARE</span>
                          </div> */}
                        </div>

                        {/* <div className="mt-4">
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="text-blue-400">progress</span>
                            <span className="text-blue-400">80/100</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                              initial={{ width: "0%" }}
                              animate={{ width: "80%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div> */}

                        <div className="mt-3 sm:mt-4 md:mt-5">
                          <div className="mb-1 flex justify-between text-[10px] sm:text-xs">
                            <span className="font-semibold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                              ACHIEVEMENTS
                            </span>
                            <span className="font-semibold text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">
                              {gameCharacters[activeCharacter].progress}/100
                            </span>
                          </div>
                          <div className="mb-2 mt-1 h-2 w-full overflow-hidden rounded-full border border-purple-900/50 bg-[#1a0b2e]/90 shadow-inner shadow-purple-950/70">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.9)]"
                              initial={{ width: "0%" }}
                              animate={{
                                width: `${gameCharacters[activeCharacter].progress}%`,
                              }}
                              transition={{ duration: 1, delay: 0.7 }}
                            />
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-purple-800 py-2 text-xs font-bold text-purple-200 shadow-lg shadow-purple-950/70 transition-all duration-300 hover:from-purple-600 hover:via-fuchsia-600 hover:to-purple-700 hover:shadow-purple-900/80 sm:mt-4 sm:text-sm"
                        >
                          {gameCharacters[activeCharacter].name} NOW
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Character selection dots */}
              <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 space-x-2 sm:bottom-0">
                {gameCharacters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCharacter(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      activeCharacter === index
                        ? "scale-125 bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                        : "bg-purple-900/70 shadow-[0_0_5px_rgba(168,85,247,0.4)] hover:bg-purple-700/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating game elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -bottom-6 -right-6 hidden h-12 w-12 sm:-right-10 sm:block sm:h-16 sm:w-16"
            >
              <Image
                src="/images/items/coin.png"
                alt="Game coin"
                width={64}
                height={64}
                className="animate-slow-spin"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.3,
              }}
              className="absolute -left-4 top-10 hidden h-10 w-10 sm:-left-8 sm:block sm:h-12 sm:w-12"
            >
              <Image
                src="/images/items/gem.png"
                alt="Game gem"
                width={48}
                height={48}
                className="animate-pulse-slow"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.7,
              }}
              className="absolute -top-4 right-12 hidden h-12 w-12 sm:right-20 sm:block sm:h-14 sm:w-14"
            >
              <Image
                src="/images/items/potion.png"
                alt="Game potion"
                width={56}
                height={56}
                className="animate-float"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating achievements */}
        {/* <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-10 right-10 z-20 hidden lg:block"
        >
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-green-500 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300">Achievement Unlocked</p>
                <p className="text-white">First Victory</p>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Stats floating card */}
        {/* <motion.div
          initial={{ opacity: 0, x: -100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-4 left-10 z-20 hidden lg:block"
        >
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-sm text-gray-300">Global Players</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">1.2M+</span>
              <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                +24%
              </span>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes pulse-opacity {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-opacity {
          animation: pulse-opacity 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .text-neon-blue {
          color: #a855f7;
          text-shadow:
            0 0 15px rgba(168, 85, 247, 1),
            0 0 30px rgba(168, 85, 247, 0.8),
            0 0 45px rgba(168, 85, 247, 0.6);
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.9));
        }
      `}</style>
    </section>
  );
};

export default Hero;
