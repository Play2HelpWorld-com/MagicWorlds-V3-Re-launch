"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./utils/context/ToastContext";
import StoreProvider from "./utils/provider/StoreProvider";
import { useEffect } from "react";
import { useAppDispatch } from "@/configs/redux/hooks";
import { fetchLoggedInUser } from "@/configs/redux/auth/authSlice";
import { WagmiProviderComponent } from "./utils/provider/WagmiProvider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const ReduxInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, [dispatch]);
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning>
        <meta
          name="impact-site-verification"
          content="3211f99b-74dc-43e7-9fe6-193de26f04a0"
        />
        <SpeedInsights />
        <body className={`${inter.className}`}>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <WagmiProviderComponent>
              <ReduxInitializer>
                {/* <Lines /> */}
                <Header />
                <ToasterContext />
                <Toaster
                  position="top-right"
                  closeButton={true}
                  richColors
                  toastOptions={{ classNames: { toast: "px-4 py-4" } }}
                />
                {children}
                <Footer />
                <ScrollToTop />
              </ReduxInitializer>
            </WagmiProviderComponent>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
