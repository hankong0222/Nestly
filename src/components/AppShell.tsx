"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";

const NAV_ROUTES = ["/home", "/tasks", "/profile"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = NAV_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-lavender-100 via-cream to-blush-50 sm:py-10">
      <div className="relative w-full max-w-[430px] h-screen sm:h-[900px] sm:rounded-[2.5rem] overflow-hidden bg-cream shadow-none sm:shadow-soft flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={showNav ? "pb-28 min-h-full" : "min-h-full"}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        {showNav && <BottomNavigation />}
      </div>
    </div>
  );
}
