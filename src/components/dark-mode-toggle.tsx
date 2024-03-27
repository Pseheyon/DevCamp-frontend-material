"use client";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect, useMemo } from "react";
import { useAnimate } from "framer-motion";

import { motion } from "framer-motion";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <></>;
  }
  const handleThemeChange = async (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    await animate([
      newTheme === "light"
        ? [scope.current, { rotate: -120 }]
        : [scope.current, { rotate: 0 }],
    ]);
  };

  return (
    <div className="w-10 h-10 flex items-center justify-center float-end">
      {theme !== "dark" ? (
        <motion.div
          initial={{ opacity: 0, rotate: -120 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-black hover:text-text-light dark:hover:text-text-green duration-300"
        >
          <button ref={scope} onClick={() => handleThemeChange("dark")}>
            <Sun size="25" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="hover:text-text-light dark:hover:text-text-green duration-300"
        >
          <button ref={scope} onClick={() => handleThemeChange("light")}>
            <Moon size="25" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
