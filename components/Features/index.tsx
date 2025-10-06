"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import featuresData from "./featuresData";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  // State for parallax effect
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Intersection observer for section animation
  const [sectionRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Set mounted state and get initial window dimensions
  useEffect(() => {
    setIsMounted(true);
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Update scroll position for parallax effects
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: clientX,
        y: clientY,
      });
    };

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  // Advanced Canvas Background Animation
  useEffect(() => {
    if (!canvasRef.current || !isMounted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Hexagon = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      pulseSpeed: number;
      pulseOffset: number;
      rotationSpeed: number;
      rotation: number;
    };

    type ConnectionLine = {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      hue: number;
    };

    const hexagons: Hexagon[] = [];
    const connectionLines: ConnectionLine[] = [];

    // Set canvas dimensions dynamically
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement
        ? canvas.parentElement.offsetHeight
        : window.innerHeight;
    };

    // Initialize hexagons
    const initHexagons = () => {
      hexagons.length = 0;
      connectionLines.length = 0;

      const spacing = 180;
      const cols = Math.ceil(canvas.width / spacing) + 2;
      const rows = Math.ceil(canvas.height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const offsetX = j % 2 === 0 ? 0 : spacing / 2;

          hexagons.push({
            x: i * spacing + offsetX - spacing,
            y: j * spacing * 0.866 - spacing,
            size: 2 + Math.random() * 6,
            speedX: 0.1 - Math.random() * 0.2,
            speedY: 0.1 - Math.random() * 0.2,
            opacity: 0.1 + Math.random() * 0.3,
            hue: 240 + Math.random() * 60, // Blue to purple hues
            pulseSpeed: 0.02 + Math.random() * 0.03,
            pulseOffset: Math.random() * Math.PI * 2,
            rotationSpeed: 0.001 - Math.random() * 0.002,
            rotation: 0, // Ensure rotation is defined
          });
        }
      }
    };

    // Draw a hexagon
    const drawHexagon = (x, y, size, opacity, hue, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i;
        const hX = x + size * Math.cos(angle);
        const hY = y + size * Math.sin(angle);

        if (i === 0) ctx.moveTo(hX, hY);
        else ctx.lineTo(hX, hY);
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${hue}, 80%, 60%, ${opacity * 0.5})`;
    };

    // Connect nearby hexagons
    const connectHexagons = () => {
      connectionLines.length = 0;

      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const h1 = hexagons[i];
          const h2 = hexagons[j];

          const dx = h2.x - h1.x;
          const dy = h2.y - h1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const opacity =
              (1 - distance / 250) * 0.2 * h1.opacity * h2.opacity;

            connectionLines.push({
              x1: h1.x,
              y1: h1.y,
              x2: h2.x,
              y2: h2.y,
              opacity,
              hue: (h1.hue + h2.hue) / 2,
            });
          }
        }
      }
    };

    // Mouse influence function
    const mouseInfluence = (x, y) => {
      const dx = mousePosition.x - x;
      const dy = mousePosition.y - y - scrollY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 300;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 2;
        return {
          x: (dx / distance) * force,
          y: (dy / distance) * force,
        };
      }
      return { x: 0, y: 0 };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      ctx.shadowBlur = 0;
      connectionLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `hsla(${line.hue}, 80%, 50%, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw hexagons
      hexagons.forEach((hexagon) => {
        const pulse = Math.sin(
          Date.now() * hexagon.pulseSpeed + hexagon.pulseOffset,
        );
        const pulsedSize = hexagon.size * (1 + pulse * 0.2);
        const pulsedOpacity = hexagon.opacity * (0.8 + pulse * 0.2);

        // Update rotation
        hexagon.rotation += hexagon.rotationSpeed;

        // Apply mouse influence
        const influence = mouseInfluence(hexagon.x, hexagon.y);

        // Update position
        hexagon.x += hexagon.speedX + influence.x;
        hexagon.y += hexagon.speedY + influence.y;

        // Ensure smooth wrapping at edges
        if (hexagon.x < -50) hexagon.x = canvas.width + 50;
        if (hexagon.x > canvas.width + 50) hexagon.x = -50;
        if (hexagon.y < -50) hexagon.y = canvas.height + 50;
        if (hexagon.y > canvas.height + 50) hexagon.y = -50;

        drawHexagon(
          hexagon.x,
          hexagon.y,
          pulsedSize,
          pulsedOpacity,
          hexagon.hue,
          hexagon.rotation,
        );
      });

      // Update connections
      connectHexagons();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    setCanvasDimensions();
    initHexagons();
    animate();

    // Resize event handler
    const handleResize = () => {
      setCanvasDimensions();
      initHexagons();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition, isMounted]);

  // Calculate the radial gradient
  const radialGradientStyle = isMounted
    ? {
        background: `radial-gradient(circle at ${
          50 + (mousePosition.x / windowDimensions.width) * 20
        }% ${
          30 + (mousePosition.y / windowDimensions.height) * 20
        }%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0.5) 60%)`,
      }
    : { background: "none" };

  return (
    <>
      <section
        id="features"
        ref={sectionRef}
        className="relative overflow-hidden bg-transparent lg:py-28 xl:py-32"
      >
        <div className="relative mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* Section Title with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionHeader
              headerInfo={{
                title: "LEVEL UP IN MAGIC WORLDS!",
                subtitle: "Epic Gaming Experience",
                description: `Explore, build, and create in Magic Worlds—where gaming goes beyond fun! As the world evolves, exciting opportunities may arise, making your journey even more rewarding. Stay engaged and explore the possibilities!`,
              }}
            />
          </motion.div>

          {/* Gaming console controller animation */}
          <motion.div
            className="pointer-events-none absolute -top-10 right-10 hidden opacity-20 lg:block"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/items/controller.png"
              width={180}
              height={180}
              alt="Gaming Controller"
              className="hue-rotate-15 filter"
            />
          </motion.div>

          {/* Features Grid with Staggered Animation */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 xl:mt-24 xl:gap-10">
            <AnimatePresence>
              {featuresData.map((feature, index) => (
                <GameFeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  inView={inView}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

const GameFeatureCard = ({ feature, index, inView }) => {
  const { icon, title, description, color = "purple", link } = feature;
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (isHovered) {
      controls.start("hover");
    } else {
      controls.start("visible");
    }
  }, [isHovered, controls]);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Pulse animation for card border
  const pulseVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  // Color map for different card themes - simplified
  const colorMap = {
    purple: {
      gradient: "from-purple-600 to-indigo-600",
      glow: "rgba(147, 51, 234, 0.3)",
      border: "border-purple-500/20",
      bgOverlay: "from-purple-900/10 to-transparent",
    },
    blue: {
      gradient: "from-blue-600 to-cyan-600",
      glow: "rgba(59, 130, 246, 0.3)",
      border: "border-blue-500/20",
      bgOverlay: "from-blue-900/10 to-transparent",
    },
    green: {
      gradient: "from-green-600 to-emerald-600",
      glow: "rgba(34, 197, 94, 0.3)",
      border: "border-green-500/20",
      bgOverlay: "from-green-900/10 to-transparent",
    },
    red: {
      gradient: "from-red-600 to-rose-600",
      glow: "rgba(239, 68, 68, 0.3)",
      border: "border-red-500/20",
      bgOverlay: "from-red-900/10 to-transparent",
    },
    orange: {
      gradient: "from-orange-600 to-amber-600",
      glow: "rgba(249, 115, 22, 0.3)",
      border: "border-orange-500/20",
      bgOverlay: "from-orange-900/10 to-transparent",
    },
    pink: {
      gradient: "from-pink-600 to-fuchsia-600",
      glow: "rgba(236, 72, 153, 0.3)",
      border: "border-pink-500/20",
      bgOverlay: "from-pink-900/10 to-transparent",
    },
  };

  const colorTheme = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative z-10 cursor-pointer overflow-hidden rounded-2xl border-2 ${colorTheme.border} bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-md transition-all duration-500 hover:border-opacity-100`}
      style={{
        boxShadow: isHovered
          ? `0 20px 40px -15px ${colorTheme.glow}, 0 0 40px -10px ${colorTheme.glow}`
          : "0 8px 16px -4px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Animated background gradient overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorTheme.bgOverlay} opacity-0`}
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Subtle glow effect on hover */}
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colorTheme.glow} 0%, transparent 70%)`,
        }}
        animate={
          isHovered ? { scale: 1.2, opacity: 0.6 } : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      />

      {/* Card Content - New Layout */}
      <div className="relative flex h-full flex-col">
        {/* Header Section with Icon and Title side by side */}
        <div className="flex items-start gap-4 border-b border-white/10 p-6 md:p-8">
          {/* Enhanced icon with subtle glow */}
          <motion.div
            variants={iconVariants}
            className={`relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorTheme.gradient} shadow-xl`}
            style={{
              boxShadow: isHovered
                ? `0 12px 24px ${colorTheme.glow}, 0 0 30px ${colorTheme.glow}`
                : `0 6px 12px ${colorTheme.glow}`,
            }}
          >
            <Image
              src={icon}
              width={40}
              height={40}
              alt={title}
              className="relative z-10 drop-shadow-lg"
            />

            {/* Subtle pulsing inner glow */}
            <motion.div
              className="absolute inset-2 rounded-lg bg-white"
              animate={{
                opacity: isHovered ? [0.1, 0.25, 0.1] : 0.1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Title aligned with icon */}
          <div className="flex-1 pt-1">
            <motion.h3
              className={`bg-gradient-to-r ${colorTheme.gradient} bg-clip-text text-xl font-bold uppercase tracking-wide text-transparent md:text-2xl`}
              animate={isHovered ? { x: 2 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {title}
            </motion.h3>
            {/* Decorative line under title */}
            <motion.div
              className={`mt-2 h-1 rounded-full bg-gradient-to-r ${colorTheme.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "60%" : "30%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Body Section - Description */}
        <div className="flex-1 p-6 md:p-8">
          <p className="text-base leading-relaxed text-gray-300">
            {description}
          </p>
        </div>

        {/* Footer Section - CTA Button */}
        <div className="border-t border-white/10 p-6 md:p-8">
          <motion.div
            className={`group/btn relative overflow-hidden rounded-lg bg-gradient-to-r ${colorTheme.gradient} px-6 py-3 text-center text-sm font-semibold text-white shadow-lg`}
            animate={isHovered ? { opacity: 1 } : { opacity: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              boxShadow: isHovered
                ? `0 8px 20px ${colorTheme.glow}`
                : "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Sliding shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "200%" } : { x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <span className="relative flex items-center justify-center gap-2">
              <span>Visit Platform</span>
              <motion.span
                animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
