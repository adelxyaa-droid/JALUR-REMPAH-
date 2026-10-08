"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faXmark,
  faSearch,
  faClock,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const searchData = [
  { title: "Cengkeh", category: "Rempah", desc: "Komoditas utama dari Maluku Utara (Ternate & Tidore)." },
  { title: "Pala & Fuli", category: "Rempah", desc: "Rempah langka asal Kepulauan Banda yang bernilai tinggi." },
  { title: "Kepulauan Banda", category: "Pelabuhan", desc: "Pusat pala dunia dan lokasi pertukaran Pulau Run dengan Manhattan." },
  { title: "Banten", category: "Pelabuhan", desc: "Emporium lada internasional di Selat Sunda." },
  { title: "Pelayaran Austronesia", category: "Sejarah", desc: "Pelayaran praaksara menggunakan perahu bercadik." },
];

export default function FloatingTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "pomodoro">("search");

  // Search State
  const [query, setQuery] = useState("");
  const filteredSearch = query.trim() === "" ? [] : searchData.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isBreak]);

  return (
    <div className="fixed bottom-5 right-5 z-[999]">
      {/* Pop-up Box Tool */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border border-amber-200 bg-white/95 p-5 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              🛠️ Alat Bantu Belajar
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            >
              <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
            </button>
          </div>

          {/* Tab Menu (Hanya 2 pilihan: Cari & Timer) */}
          <div className="mt-3 flex rounded-xl bg-amber-50 p-1 text-xs font-bold text-amber-900">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex-1 py-1.5 rounded-lg transition ${activeTab === "search" ? "bg-amber-500 text-white shadow-sm" : "hover:bg-amber-100"}`}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-1" /> Cari
            </button>
            <button
              onClick={() => setActiveTab("pomodoro")}
              className={`flex-1 py-1.5 rounded-lg transition ${activeTab === "pomodoro" ? "bg-amber-500 text-white shadow-sm" : "hover:bg-amber-100"}`}
            >
              <FontAwesomeIcon icon={faClock} className="mr-1" /> Timer
            </button>
          </div>

          {/* Konten Tab Search */}
          {activeTab === "search" && (
            <div className="mt-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari materi, cengkeh, banda..."
                className="w-full rounded-xl border border-amber-200 px-3 py-2 text-xs outline-none focus:border-amber-500"
              />
              <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
                {filteredSearch.map((item, i) => (
                  <div key={i} className="rounded-lg bg-amber-50/60 p-2 text-xs">
                    <p className="font-bold text-neutral-800">{item.title}</p>
                    <p className="text-[11px] text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Konten Tab Pomodoro */}
          {activeTab === "pomodoro" && (
            <div className="mt-4 text-center">
              <span className="text-[11px] font-bold text-amber-700">
                {isBreak ? "☕ Istirahat" : "📖 Sesi Fokus"}
              </span>
              <div className="my-2 text-3xl font-extrabold text-neutral-800">
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-white"
                >
                  {isTimerRunning ? "Pause" : "Mulai"}
                </button>
                <button
                  onClick={() => { setIsTimerRunning(false); setTimeLeft(25 * 60); }}
                  className="rounded-lg bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600"
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tombol Utama Widget di Pojok Kanan Bawah */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-white shadow-xl transition hover:scale-110"
      >
        <FontAwesomeIcon icon={faSliders} className="h-5 w-5" />
      </button>
    </div>
  );
}