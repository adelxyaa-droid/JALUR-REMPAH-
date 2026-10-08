"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faXmark,
  faMapLocationDot,
  faBookOpen,
  faBrain,
  faGamepad,
  faCirclePlay,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "Beranda", href: "/", icon: faMapLocationDot },
  { label: "Penjelasan", href: "/penjelasan", icon: faBookOpen },
  { label: "Flashcard", href: "/flashcard", icon: faIdCard },
  { label: "Quiz", href: "/quiz", icon: faBrain },
  { label: "Game", href: "/game", icon: faGamepad },
  { label: "Video", href: "/video", icon: faCirclePlay },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`sticky top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-6xl overflow-hidden border border-spice-amber/20 bg-white/80 shadow-lg shadow-spice-amber/5 backdrop-blur-xl md:rounded-full ${
        open ? "rounded-3xl" : "rounded-full"
      }`}
    >
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3">
        <Link href="/" className="flex items-center gap-2 text-neutral-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-spice-amber to-spice-coral">
            <FontAwesomeIcon
              icon={faMapLocationDot}
              className="h-4 w-4 text-white"
            />
          </span>
          <span className="text-base font-bold tracking-tight gradient-text-amber">
            Jalur Rempah
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-spice-amber to-spice-coral text-white shadow-md shadow-spice-amber/20"
                    : "text-neutral-600 hover:bg-spice-amber-light hover:text-spice-amber-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spice-amber-light text-spice-amber-dark transition hover:bg-spice-amber hover:text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="flex w-full flex-col border-t border-spice-amber/10 bg-white/90 px-3 py-2 backdrop-blur-xl sm:px-4 md:hidden"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-spice-amber/10 to-spice-coral/10 text-spice-amber-dark"
                    : "text-neutral-700 hover:bg-spice-amber-light/50 hover:text-spice-amber-dark"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-4 ${active ? "text-spice-coral" : "text-spice-amber"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}