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
  };

  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, rotate: theme === "dark" ? 0 : -120 }}
        animate={{ opacity: 1, rotate: theme === "dark" ? 0 : -120 }}
        transition={{ delay: 0.05 }}
        className={`text-${
          theme === "dark" ? "white" : "black"
        } hover:text-text-light dark:hover:text-text-green duration-300`}
        onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Moon size="25" /> : <Sun size="25" />}
      </motion.div>
    </div>
  );
}
