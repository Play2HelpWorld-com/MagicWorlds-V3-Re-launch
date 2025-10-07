"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Particle animation config
  const particleCount = 30;
  const particles = Array.from({ length: particleCount });

  // Scroll-triggered animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const glowVariant = {
    glow: {
      boxShadow: ["0 0 5px #4d07e3", "0 0 20px #4d07e3", "0 0 5px #4d07e3"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatVariant = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Handle video play on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && videoRef.current) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <>
      {/* <!-- ===== Hero Gaming Section ===== --> */}
      <section className="relative overflow-hidden bg-transparent pb-20 pt-16 lg:pb-28 lg:pt-24 xl:pb-32">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {particles.map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-2 w-2 rounded-full bg-purple-500 opacity-70"
              animate={{
                x: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                scale: [0.4, 1, 0.4],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 15 + Math.random() * 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
            variants={fadeInUp}
          >
            <motion.div
              variants={glowVariant}
              animate="glow"
              className="mb-5 inline-block rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-2"
            >
              <span className="font-bold uppercase tracking-wider text-white">
                Enter The Realm
              </span>
            </motion.div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
                Magic Worlds
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Embark on a journey through Magic Worlds where adventure meets
              rewards, and every quest brings you closer to real-world
              treasures.
            </p>
          </motion.div>

          <div className="mt-16 flex flex-col items-center gap-12 md:flex-row">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 aspect-video md:w-1/2"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur-sm"></div>
              <div className="relative overflow-hidden rounded-lg">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/about/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isPlaying ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-25 backdrop-blur-sm"
                      onClick={() => {
                        videoRef.current?.play();
                        setIsPlaying(true);
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <motion.div className="mb-8" variants={fadeInUp}>
                <h2 className="mb-4 text-3xl font-bold text-white">
                  Your Journey{" "}
                  <span className="text-purple-400">Begins Here</span>
                </h2>
                <p className="text-gray-300">
                  Welcome to Magic Worlds, the ultimate virtual universe where
                  adventure meets rewards. Explore diverse realms, engage in
                  thrilling activities, and earn tokens as you journey through
                  this immersive experience. Whether you're a seasoned
                  adventurer or a newcomer, Magic Worlds offers something for
                  everyone.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                variants={staggerChildren}
              >
                {[
                  {
                    icon: "✦",
                    title: "Create Your Legend",
                    description:
                      "Register and claim your welcome bonus to begin your adventure",
                  },
                  {
                    icon: "✧",
                    title: "Diverse Digital Realms",
                    description:
                      "Discover a variety of unique worlds, each with its own challenges and rewards.",
                  },
                  {
                    icon: "⚔️",
                    title: "Thrilling Activities",
                    description:
                      "From quests to battles, there’s always something exciting to do in Magic Worlds.",
                  },
                  {
                    icon: "💰",
                    title: "Token Rewards",
                    description:
                      "Earn tokens as you play, which can be used to unlock new features or traded with other players.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="rounded-xl border border-purple-900/30 bg-gradient-to-br from-gray-800 to-gray-900 p-6 transition-all duration-300 hover:border-purple-500/50"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <motion.div
                      variants={floatVariant}
                      animate="float"
                      className="mb-4 text-3xl"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-t from-black to-gray-900 py-16 md:py-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(transparent 0%, transparent calc(100% - 1px), rgba(128, 90, 213, 0.1) calc(100% - 1px)),linear-gradient(to right, transparent 0%, transparent calc(100% - 1px), rgba(128, 90, 213, 0.1) calc(100% - 1px))",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
            {/* Left Section (Text & Content) */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full text-center lg:w-1/2 lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <motion.div
                  variants={glowVariant}
                  animate="glow"
                  className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm sm:text-base"
                >
                  <span className="font-bold uppercase tracking-wider text-white">
                    Community Impact
                  </span>
                </motion.div>
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Gaming <span className="text-blue-400">For Good</span>
                </h2>
                <p className="mb-6 text-sm text-gray-300 sm:text-base">
                  Every adventure you embark on contributes to something
                  greater. Our platform donates a portion of all earnings to
                  global charities, turning your gaming passion into positive
                  change.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6">
                <div className="mb-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
                  {["Environmental", "Education", "Healthcare", "Wildlife"].map(
                    (cause, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full bg-blue-900 bg-opacity-20 px-3 py-2 text-xs font-medium text-blue-300 sm:px-4 sm:text-sm"
                      >
                        {cause}
                      </motion.span>
                    ),
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.02 }} className="group">
                  <a
                    href="/docs"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-bold text-white transition-all sm:px-6 sm:py-3 sm:text-base"
                  >
                    <span className="transition-all duration-300 group-hover:mr-2">
                      Learn About Our Impact
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M10.4767 7.16701L6.00668 2.69701L7.18501 1.51868L13.6667 8.00034L7.18501 14.482L6.00668 13.3037L10.4767 8.83368H0.333344V7.16701H10.4767Z" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section (Image & Card) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20, rotateY: 30 },
                visible: { opacity: 1, x: 0, rotateY: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1.2, type: "spring" }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-full">
                {/* 3D Card Effect */}
                <div className="absolute -inset-1 animate-pulse rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-70 blur"></div>
                <div className="relative overflow-hidden rounded-lg bg-gray-900/50 p-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="/images/about/charity4.png"
                      alt="Our Impact"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <motion.div
                        variants={staggerChildren}
                        className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4"
                      >
                        {[1, 2, 3].map((_, i) => (
                          <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm sm:h-12 sm:w-12"
                          >
                            <Image
                              src={`/images/about/user-${i + 1}.png`}
                              alt={`Charity ${i + 1}`}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          </motion.div>
                        ))}
                        <motion.div
                          variants={fadeInUp}
                          className="text-sm font-medium text-white sm:text-base"
                        >
                          +24 more charities
                        </motion.div>
                      </motion.div>
                      <motion.h3
                        variants={fadeInUp}
                        className="mb-1 text-xl font-bold text-white sm:mb-2 sm:text-2xl"
                      >
                        $2.4M Donated
                      </motion.h3>
                      <motion.div
                        variants={fadeInUp}
                        className="h-2 w-full rounded-full bg-gray-700"
                      >
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: "70%" }}
                          initial={{ width: "0%" }}
                          whileInView={{ width: "70%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </motion.div>
                      <motion.p
                        variants={fadeInUp}
                        className="mt-1 text-xs text-blue-300 sm:text-sm"
                      >
                        70% to our yearly goal
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <!-- ===== Play to Earn Mechanics Section ===== --> */}
      <section className="relative overflow-hidden bg-black py-20">
        {/* Animated Hexagon Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%">
            <pattern
              id="hexagons"
              width="50"
              height="43.4"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M25 0 L50 14.4 L50 38.6 L25 53 L0 38.6 L0 14.4 Z"
                stroke="rgba(138, 75, 255, 0.5)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.div
              variants={glowVariant}
              animate="glow"
              className="mb-5 inline-block rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-6 py-2"
            >
              <span className="font-bold uppercase tracking-wider text-white">
                Play & Prosper
              </span>
            </motion.div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              How To <span className="text-green-400">Earn With Us</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-gray-300">
              Your gaming skills unlock real-world rewards. Follow these simple
              steps to turn your passion into profit.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                number: "01",
                title: "Create Your Account",
                description:
                  "Register and receive your welcome bonus of 500 magic coins to kickstart your journey",
                icon: "🧙‍♂️",
                color: "from-blue-600 to-purple-600",
              },
              {
                number: "02",
                title: "Play & Complete Quests",
                description:
                  "Engage in games, missions, challenges, and tournaments to earn magical rewards",
                icon: "⚔️",
                color: "from-purple-600 to-pink-600",
              },
              {
                number: "03",
                title: "Redeem Your Treasures",
                description:
                  "Convert your magical earnings into gift cards, cryptocurrencies, or cash transfers",
                icon: "💰",
                color: "from-pink-600 to-orange-600",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-8">
                  {/* Animated Corner Accent */}
                  <motion.div
                    className="absolute right-0 top-0 h-20 w-20"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle
                        cx="70"
                        cy="10"
                        r="40"
                        stroke="rgba(138, 75, 255, 0.2)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </motion.div>

                  <div className="mb-6 flex items-center justify-between">
                    <motion.div
                      variants={floatVariant}
                      animate="float"
                      className="text-4xl"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-4xl font-bold text-transparent opacity-30">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="flex-grow text-gray-400">{step.description}</p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                    className={`h-1 bg-gradient-to-r ${step.color} mt-6 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20"
            >
              Start Your Adventure
            </motion.button> */}
          </motion.div>
        </div>
      </section>

      {/* <!-- ===== Testimonials Section ===== --> */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="absolute inset-0 z-0">
          {/* Animated Stars Background */}
          {Array.from({ length: 50 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-1 w-1 rounded-full bg-white"
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.div
              variants={glowVariant}
              animate="glow"
              className="mb-5 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2"
            >
              <span className="font-bold uppercase tracking-wider text-white">
                Player Testimonials
              </span>
            </motion.div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              What Our <span className="text-purple-400">Heroes Say</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                name: "Alex Morgan",
                avatar: "/images/about/player1.png",
                role: "Pro Gamer",
                quote:
                  "I've earned enough through Games with Magic Worlds to fund my new gaming setup. The platform is intuitive and the rewards are real.",
                rating: 5,
              },
              {
                name: "Sarah Chen",
                avatar: "/images/about/player2.png",
                role: "Casual Player",
                quote:
                  "As a student, the extra income from playing games has been a game-changer. Plus, knowing I'm contributing to charity makes it even better.",
                rating: 5,
              },
              {
                name: "Marcus Williams",
                avatar: "/images/about/player3.png",
                role: "Content Creator",
                quote:
                  "The tournaments are incredibly engaging and the community is fantastic. I've made friends and money - what more could you want?",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="relative rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Quote marks */}
                <div className="font-serif absolute right-4 top-4 text-4xl text-purple-500/20">
                  ❝
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-purple-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="mb-4 italic text-gray-300">
                  "{testimonial.quote}"
                </p>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* <!-- ===== CTA Section ===== --> */}
      <section className="relative overflow-hidden bg-black py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          {/* Abstract geometric background */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="radialGradient"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="rgba(138, 75, 255, 0.2)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#radialGradient)"
            />
          </svg>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-purple-800/30 bg-gradient-to-br from-gray-900 to-black p-8 md:p-12"
          >
            {/* Animated Corner Elements */}
            <div className="absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="h-full w-full"
              >
                <svg viewBox="0 0 100 100" fill="none">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="url(#purpleGradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient
                      id="purpleGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            <div className="absolute bottom-0 right-0 h-36 w-36 translate-x-1/3 translate-y-1/3 opacity-60">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="h-full w-full"
              >
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 0 L100 50 L50 100 L0 50 Z"
                    stroke="url(#blueGradient)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="blueGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.h2
                className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
                variants={fadeInUp}
              >
                Ready to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Start Your Adventure?
                </span>
              </motion.h2>
              <motion.p
                className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
                variants={fadeInUp}
              >
                Join thousands of players worldwide who are turning their gaming
                passion into rewards. Your adventure in the magical worlds
                begins with a single click.
              </motion.p>

              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                variants={staggerChildren}
              >
                <a href="/play">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/20"
                    variants={fadeInUp}
                  >
                    Download Now
                  </motion.button>
                </a>
                <motion.a
                  href="/worlds"
                  className="rounded-full border border-purple-600 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-purple-900/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  variants={fadeInUp}
                >
                  Watch Gameplay Demo
                </motion.a>
              </motion.div>

              <motion.div
                className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
                variants={fadeInUp}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                </svg>
                <span>No credit card required. Start for free.</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
