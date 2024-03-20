import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import SignUpFrom from "@/components/sign-up";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <DarkModeToggle />
      <SignUpFrom />
    </main>
  );
}
