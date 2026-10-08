import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faBookOpen,
  faBrain,
  faGamepad,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const links = [
  { label: "Penjelasan", href: "/penjelasan", icon: faBookOpen },
  { label: "Quiz", href: "/quiz", icon: faBrain },
  { label: "Game", href: "/game", icon: faGamepad },
  { label: "Video", href: "/video", icon: faCirclePlay },
];

export default function Footer() {
  return (
    <footer className="border-t border-spice-amber/20 bg-gradient-to-b from-spice-amber-light/30 to-spice-coral-light/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-spice-amber to-spice-coral">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-3 w-3 text-white" />
              </span>
              <span className="gradient-text-amber">Jalur Rempah</span>
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Menelusuri jejak perdagangan rempah yang menghubungkan Nusantara
              dengan dunia.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-spice-amber-dark">
              Jelajahi
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 transition hover:text-spice-coral"
                  >
                    <FontAwesomeIcon icon={item.icon} className="h-3 w-3 text-spice-amber" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-spice-amber-dark">
              Tentang
            </h4>
            <p className="text-sm leading-relaxed text-neutral-600">
              Situs edukasi tentang sejarah Jalur Rempah Indonesia untuk semua
              kalangan.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-spice-amber/20 pt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} Jalur Rempah Indonesia.
        </div>
      </div>
    </footer>
  );
}
