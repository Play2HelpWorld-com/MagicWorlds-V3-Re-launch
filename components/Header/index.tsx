"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileModal } from "../accounts/profileModal";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathUrl = usePathname();

  interface MenuItem {
    id: number;
    title: string;
    path?: string;
    submenu?: MenuItem[];
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuItem: MenuItem,
  ) => {
    e.preventDefault();
    setActiveMenu(menuItem.title);
    if (menuItem.id === 5 || menuItem.id === 6) {
      setDropdownToggler(!dropdownToggler);
    } else {
      setNavigationOpen(!navigationOpen);
    }
  };

  // Handle sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    }
  };

  // Handle sticky menu and hide on scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setHideOnScroll(true);
    } else {
      setHideOnScroll(false);
    }

    setLastScrollY(currentScrollY);
    setStickyMenu(currentScrollY >= 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHideOnScroll(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
      setStickyMenu(currentScrollY >= 80);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-700 ease-out ${
        hideOnScroll
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        transition:
          "transform 0.7s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.5s ease-out",
      }}
    >
      <div className="mx-auto mt-3 max-w-7xl px-4 transition-all duration-500 ease-out md:px-6 lg:px-8">
        <div
          className={`relative mx-auto items-center justify-between border border-white/40 bg-gradient-to-b from-white/90
            to-white/70 px-2
            py-1 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-700
            ease-[cubic-bezier(0.86,0,0.07,1)] dark:border-white/10 dark:from-black/90
            dark:to-black/70 md:px-6 xl:flex
            ${
              stickyMenu
                ? "scale-[0.98] rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "scale-100 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            }
            hover:scale-[0.99] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
            dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
          `}
          style={{
            transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
            willChange: "transform, box-shadow, border-radius",
          }}
        >
          <div className="flex w-full items-center justify-between transition-all duration-500 ease-out xl:w-[12%]">
            <a
              href="/"
              title="Home"
              className="transition-transform duration-500 ease-out hover:scale-105 active:scale-95"
            >
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="hidden h-18 w-24 transition-opacity duration-300 dark:block"
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={200}
                height={50}
                className="h-18 w-24 transition-opacity duration-300 dark:hidden"
              />
            </a>

            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-label="hamburger Toggler"
              className="block rounded-full p-2 transition-all duration-300 ease-out hover:bg-black/5 active:scale-90 dark:hover:bg-white/5 xl:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="absolute right-0 block h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black transition-all
                      duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] dark:bg-white
                      ${!navigationOpen ? "!w-full delay-300" : "w-0"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black transition-all
                      delay-75 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] dark:bg-white
                      ${!navigationOpen ? "delay-400 !w-full" : "w-0"}`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black transition-all
                      delay-150 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] dark:bg-white
                      ${!navigationOpen ? "!w-full delay-500" : "w-0"}`}
                  ></span>
                </span>
                <span className="du-block absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black transition-all
                      delay-300 duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] dark:bg-white
                      ${!navigationOpen ? "!h-0 delay-[0]" : "h-full"}`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black
                      transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] dark:bg-white
                      ${!navigationOpen ? "!h-0 delay-200" : "h-0.5"}`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>

          {/* Nav Menu Start   */}
          <div
            className={`w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] xl:visible
              xl:flex xl:h-auto xl:w-full
              ${
                navigationOpen
                  ? "navbar !visible mt-4 h-auto max-h-[400px] scale-100 rounded-2xl bg-white/95 p-6 opacity-100 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:bg-black/95 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] xl:mt-0 xl:h-auto xl:bg-transparent xl:p-0 xl:shadow-none xl:dark:bg-transparent"
                  : "invisible h-0 scale-95 opacity-0 xl:visible xl:scale-100 xl:opacity-100"
              }`}
            style={{
              transition: "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
            }}
          >
            <nav>
              <ul className="flex flex-col gap-5 font-bold xl:flex-row xl:items-center xl:gap-10">
                {menuData.map((menuItem, key) => (
                  <li
                    onClick={(e) => handleLinkClick(e, menuItem)}
                    key={key}
                    className="group relative transition-all duration-500 ease-out hover:scale-105 active:scale-95"
                  >
                    {menuItem.submenu ? (
                      <>
                        <button className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold tracking-wide text-gray-700 dark:text-gray-200 transition-all duration-500 ease-out hover:translate-x-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100 bg-clip-text hover:text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 [text-shadow:0_2px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:0_2px_8px_rgba(255,255,255,0.1)]">
                          {menuItem.title}
                          <span className="transition-transform duration-500 ease-out group-hover:rotate-180 group-hover:scale-110">
                            <svg
                              className="h-3 w-3 cursor-pointer fill-gray-600 dark:fill-gray-400 transition-all duration-500 ease-out group-hover:fill-indigo-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </span>
                        </button>

                        {menuItem.title === activeMenu && (
                          <ul
                            className={`dropdown transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] ${dropdownToggler ? "flex scale-100 opacity-100" : "scale-95 opacity-0"}`}
                            style={{
                              transition:
                                "all 0.7s cubic-bezier(0.86, 0, 0.07, 1)",
                            }}
                          >
                            {menuItem.submenu.map((item, key) => (
                              <li
                                onClick={(e) => handleLinkClick(e, item)}
                                key={key}
                                className="transition-all duration-500 ease-out hover:translate-x-2 hover:scale-105"
                              >
                                <Link 
                                  href={item.path || "#"}
                                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text transition-all duration-500 ease-out"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`${menuItem.path}`}
                        className={`relative inline-block text-base font-semibold tracking-wide transition-all duration-500 ease-out hover:translate-y-[-2px] hover:scale-105 active:scale-95 ${
                          pathUrl === menuItem.path
                            ? "text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                            : "text-gray-700 dark:text-gray-200 hover:text-transparent bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 bg-clip-text"
                        }`}
                      >
                        <span className="relative inline-flex items-center">
                          <span className="relative z-10">{menuItem.title}</span>
                          {pathUrl === menuItem.path && (
                            <>
                              <span className="absolute -bottom-1 left-0 h-0.5 w-full animate-[shimmer_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
                              <span className="absolute -inset-1 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-sm"></span>
                            </>
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-7 flex items-center gap-6 xl:mt-0">
              {/* <ProfileModal navOpen={navigationOpen} setNavopen = {setNavigationOpen}/> */}
              <Link
                href="/support"
                className="rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-6 py-2.5 font-semibold text-white backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.86,0,0.07,1)] hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_24px_rgba(79,70,229,0.4)] active:translate-y-0 active:scale-95"
                style={{
                  transition: "all 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                }}
              >
                Contact Us
              </Link>
              {/* <ThemeToggler /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style smooth animations CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(0.95);
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
};

export default Header;
