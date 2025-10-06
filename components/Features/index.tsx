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
  const { icon, title, description, color = "purple" } = feature;
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

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

  // Color map for different card themes
  const colorMap = {
    purple: "from-purple-500 to-indigo-600",
    blue: "from-blue-500 to-cyan-600",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-rose-600",
    orange: "from-orange-500 to-amber-600",
    pink: "from-pink-500 to-rose-600",
  };

  const bgGradient = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative z-10 overflow-hidden rounded-xl border border-gray-700 bg-black bg-opacity-40 backdrop-blur-sm dark:border-gray-700 "
    >
      {/* Glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-transparent opacity-5" />

      {/* Animated border effect */}
      <motion.div
        variants={{
          animate: {
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
        animate="animate"
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          padding: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(14, 58, 217, 0.1) 50%, transparent 100%)`,
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />

      <div className="p-8 md:p-10">
        {/* Animated icon */}
        <motion.div
          variants={iconVariants}
          className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${bgGradient}`}
        >
          <Image
            src={icon}
            width={60}
            height={60}
            alt={title}
            className="relative z-10"
          />

          {/* Icon glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-white opacity-30 blur-xl" />
        </motion.div>

        {/* Title with hover effect */}
        <motion.h3
          className="mb-4 mt-8 text-2xl font-bold text-white"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-300">{description}</p>

        {/* Animated action button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-6 rounded-lg bg-gradient-to-r px-5 py-2 ${bgGradient} text-sm font-medium text-white opacity-0`}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          Explore More
        </motion.button>
      </div>

      {/* Interactive particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0, 1],
                  x: `${50 + (Math.random() * 100 - 50)}%`,
                  y: `${50 + (Math.random() * 100 - 50)}%`,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1 + Math.random() }}
                className={`absolute h-2 w-2 rounded-full bg-${color}-400`}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Feature;
