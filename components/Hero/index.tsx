"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClaimModal from "../ClaimToken/claim-modal";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverGlow, setHoverGlow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.5})`;
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
              ctx.strokeStyle = `rgba(100, 150, 255, ${0.7 - distance / 100})`;
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
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-900/70  to-black">
        {/* Animated background particles */}
        <canvas
          ref={particlesRef}
          className="absolute inset-0 z-0 opacity-50"
        />

        {/* Radial glow effect */}
        <div className="animate-pulse-slow absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(82,63,255,0.15),transparent_70%)]" />

        {/* Floating geometric shapes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-10 top-1/4 h-24 w-24 rotate-45 rounded bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl"
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
          className="absolute right-20 top-1/3 h-32 w-32 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 blur-xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left column: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text px-4 py-1 text-transparent"
              >
                {/* <span className="text-lg font-bold tracking-wider">
                PLAY · EARN · GIVE
              </span> */}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-5xl font-extrabold leading-tight tracking-tighter text-transparent sm:text-6xl lg:text-7xl"
              >
                MAGIC
                <span className="text-neon-blue drop-shadow-glow block">
                  WORLDS
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300"
              >
                Play captivating games in magical worlds to earn valuable
                coupons. Convert your rewards into real money that you can
                withdraw or donate to charity — gaming with purpose.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoverGlow(true)}
                  onMouseLeave={() => setHoverGlow(false)}
                  className="relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-4 font-bold text-white transition-all duration-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  {hoverGlow && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 z-0 rounded-full bg-white"
                    />
                  )}
                  <button>Claim Tokens</button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border-2 border-purple-500 bg-transparent px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-purple-900/30"
                >
                  EXPLORE WORLDS
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 flex items-center space-x-2 text-gray-400"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-purple-800"
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
                <span>10K+ players have joined today</span>
              </motion.div>
            </motion.div>

            {/* Right column: Game visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mt-10 lg:mt-0"
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
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="50%" stopColor="#D946EF" />
                      <stop offset="100%" stopColor="#2563EB" />
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
                    stroke="rgba(147, 51, 234, 0.5)"
                    strokeWidth="1"
                    className="animate-pulse-slow"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="none"
                    stroke="rgba(79, 70, 229, 0.5)"
                    strokeWidth="1"
                    className="animate-pulse-slow animation-delay-500"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="90"
                    fill="none"
                    stroke="rgba(219, 39, 119, 0.5)"
                    strokeWidth="1"
                    className="animate-pulse-slow animation-delay-1000"
                  />
                </svg>
              </div>

              {/* Rotating 3D game card */}
              <div className="relative flex h-96 w-full items-center justify-center">
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
                      <div className="relative h-[350px] w-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-pink-900/80 p-1 shadow-2xl backdrop-blur-sm">
                        <div className="h-full w-full rounded-xl bg-black/40 p-4">
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

                          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent"></div>
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

                          <div className="mt-5">
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-red-400">ACHIEVEMENTS</span>
                              <span className="text-red-400">
                                {gameCharacters[activeCharacter].progress}/100
                              </span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                              <motion.div
                                className="h-full bg-gradient-to-r from-red-400 to-red-600"
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
                            className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-sm font-bold text-white"
                          >
                            {gameCharacters[activeCharacter].name} NOW
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Character selection dots */}
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 space-x-2">
                  {gameCharacters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCharacter(index)}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        activeCharacter === index
                          ? "scale-125 bg-white"
                          : "bg-gray-600 hover:bg-gray-400"
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
                className="absolute -bottom-6 -right-10 h-16 w-16"
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
                className="absolute -left-8 top-10 h-12 w-12"
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
                className="absolute -top-4 right-20 h-14 w-14"
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
          <motion.div
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
          </motion.div>

          {/* Stats floating card */}
          <motion.div
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
          </motion.div>
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
            color: #4f46e5;
            text-shadow:
              0 0 5px rgba(79, 70, 229, 0.7),
              0 0 20px rgba(79, 70, 229, 0.5);
          }

          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.5));
          }
        `}</style>
      </section>
      <ClaimModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Hero;
