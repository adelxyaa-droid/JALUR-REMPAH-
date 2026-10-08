"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faClock,
  faTag,
  faBrain,
  faArrowUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Video = {
  id: string;
  title: string;
  duration: string;
  category: string;
  desc: string;
  color: string;
  gradient: string;
};

const videos: Video[] = [
  {
    id: "fj2xxbx_OHQ",
    title: "Pendahuluan jalur rempah",
    duration: "5 mnt",
    category: "Sejarah",
    desc: "Pengantar umum mengenal jalur rempah Nusantara dan perannya dalam sejarah dunia.",
    color: "text-amber-600",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "9iivYtn1pEQ",
    title: "Maluku dan sejarah pala",
    duration: "8 mnt",
    category: "Rempah",
    desc: "Mengenal kepulauan Banda dan bagaimana pala mengubah peta kekuasaan dunia.",
    color: "text-rose-600",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: "-uL-Q3_tHN8",
    title: "Benteng-benteng rempah",
    duration: "10 mnt",
    category: "Sejarah",
    desc: "Jelajahi benteng peninggalan era monopoli rempah di Indonesia Timur.",
    color: "text-purple-600",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    id: "fj2xxbx_OHQ",
    title: "Tradisi dan budaya rempah",
    duration: "6 mnt",
    category: "Budaya",
    desc: "Tradisi, upacara, dan kuliner yang lahir dari kekayaan rempah Nusantara.",
    color: "text-teal-600",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    id: "wd4yNMiIPCQ",
    title: "Jamu dan pengobatan tradisional",
    duration: "7 mnt",
    category: "Kesehatan",
    desc: "Eksplorasi jamu sebagai warisan pengobatan tradisional berbasis rempah.",
    color: "text-emerald-600",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "fj2xxbx_OHQ",
    title: "Jalur rempah kini",
    duration: "9 mnt",
    category: "Kontemporer",
    desc: "Bagaimana jalur rempah dirayakan dan dilestarikan sebagai warisan budaya dunia.",
    color: "text-indigo-600",
    gradient: "from-indigo-400 to-violet-500",
  },
];

export default function Video() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!selectedVideo) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedVideo(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <div className="-mt-14 flex w-full flex-col">
      <section className="gradient-hero border-b border-spice-amber/20">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-30 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-spice-coral-light px-4 py-1.5 text-sm font-semibold text-spice-coral">
            <FontAwesomeIcon icon={faCirclePlay} className="h-4 w-4" />
            Materi audiovisual
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Simak dan <span className="gradient-text-amber">pahami</span>
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Materi audiovisual untuk memahami sejarah, budaya, dan warisan jalur
            rempah Indonesia.
          </p>
        </div>
      </section>

      <section className="gradient-warm mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, index) => (
            <div
              key={v.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-spice-amber/10 bg-white/80 shadow-sm backdrop-blur transition hover:shadow-xl hover:-translate-y-1"
            >
              <button
                type="button"
                onClick={() => setSelectedVideo(v)}
                aria-label={`Putar video ${v.title}`}
                className="group relative flex aspect-video w-full items-center justify-center bg-cover bg-center bg-neutral-900 text-white"
                style={{
                  backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)`,
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/30 to-transparent transition group-hover:from-neutral-950/50" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-spice-amber to-spice-coral text-white shadow-xl shadow-spice-amber/30 transition-transform group-hover:scale-110">
                  <FontAwesomeIcon icon={faCirclePlay} className="h-7 w-7" />
                </span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur-sm">
                  Putar video
                </span>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${v.gradient} px-2.5 py-0.5 font-bold text-white`}
                  >
                    <FontAwesomeIcon icon={faTag} className="h-2.5 w-2.5" />
                    {v.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-neutral-400">
                    <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                    {v.duration}
                  </span>
                </div>
                <h2 className="mt-3 font-bold text-neutral-900">{v.title}</h2>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-neutral-600">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-sunset border-t border-spice-amber/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Perdalam pemahamanmu
              </h2>
              <p className="mt-1 text-neutral-600">
                Gunakan kuis untuk mengingat kembali hal-hal penting dari
                materi.
              </p>
            </div>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-spice-purple to-spice-indigo px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-spice-purple/25 transition hover:shadow-xl hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faBrain} className="h-4 w-4" />
              Kerjakan kuis
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3.5 w-3.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {selectedVideo &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-neutral-950/90 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-spice-amber/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <h2
                    id="video-modal-title"
                    className="truncate font-bold text-neutral-900"
                  >
                    {selectedVideo.title}
                  </h2>
                  <p className="mt-0.5 text-xs font-semibold text-neutral-500">
                    {selectedVideo.category} · {selectedVideo.duration}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Tutup video"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-spice-rose-light hover:text-spice-rose"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                </button>
              </div>
              <div className="aspect-video min-h-0 w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
