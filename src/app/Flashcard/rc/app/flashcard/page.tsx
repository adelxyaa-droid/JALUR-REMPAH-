"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faRotateRight,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

type Flashcard = {
  id: number;
  category: "Spesies & Rempah" | "Sejarah & Perjanjian" | "Pelabuhan & Rute" | "Budaya & Kebaharian";
  question: string;
  answer: string;
  clue: string;
};

const flashcardsData: Flashcard[] = [
  {
    id: 1,
    category: "Pelabuhan & Rute",
    question: "Di manakah habitat asli endemik tanaman Pala dan Fuli di dunia pada abad ke-17?",
    clue: "Kepulauan kecil di Maluku Tengah...",
    answer: "Kepulauan Banda, Maluku Tengah.",
  },
  {
    id: 2,
    category: "Sejarah & Perjanjian",
    question: "Pulau apakah di Nusantara yang ditukar Inggris demi mendapatkan Pulau Manhattan (New York) dari Belanda pada Perjanjian Breda 1667?",
    clue: "Salah satu pulau di Kepulauan Banda...",
    answer: "Pulau Run.",
  },
  {
    id: 3,
    category: "Spesies & Rempah",
    question: "Dua wilayah manakah di Maluku Utara yang dikenal sebagai produsen utama Cengkeh murni dunia?",
    clue: "Dua kesultanan maritim bertetangga di Maluku Utara...",
    answer: "Ternate dan Tidore.",
  },
  {
    id: 4,
    category: "Budaya & Kebaharian",
    question: "Apakah nama perahu tradisional khas Maluku yang digunakan dalam armada pelayaran Hongi oleh VOC?",
    clue: "Perahu dayung cepat bercadik...",
    answer: "Perahu Kora-Kora.",
  },
  {
    id: 5,
    category: "Pelabuhan & Rute",
    question: "Pelabuhan kuno terpenting di Sumatra bagian utara yang terkenal sebagai penghasil kapur aromatik sejak abad ke-6 Masehi adalah...",
    clue: "Lokasi kuno di Sumatra Utara...",
    answer: "Barus (pintu barat Sumatra).",
  },
  {
    id: 6,
    category: "Sejarah & Perjanjian",
    question: "Prinsip hukum maritim apakah yang diterapkan Kerajaan Gowa-Tallo (Makassar) hingga menolak monopoli mutlak VOC?",
    clue: "Konsep bahwa laut milik bersama...",
    answer: "Prinsip Laut Bebas (Open Sea / Mare Liberum).",
  },
];

export default function FlashcardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredCards =
    selectedCategory === "Semua"
      ? flashcardsData
      : flashcardsData.filter((card) => card.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowClue(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowClue(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const categories = [
    "Semua",
    "Spesies & Rempah",
    "Sejarah & Perjanjian",
    "Pelabuhan & Rute",
    "Budaya & Kebaharian",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Header Halaman */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-800">
          <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5" />
          Kartu Hafalan Interaktif
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-neutral-900 sm:text-4xl">
          Flashcard <span className="gradient-text-amber">Jalur Rempah</span>
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Uji pemahaman dan hafalkan fakta-fakta sejarah penting dengan membalik kartu di bawah ini.
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
              setShowClue(false);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              selectedCategory === cat
                ? "bg-amber-500 text-white shadow-md"
                : "bg-amber-50 text-neutral-700 hover:bg-amber-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Kartu Flashcard Utama */}
      <div className="mt-8 flex flex-col items-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="group relative min-h-[260px] w-full max-w-lg cursor-pointer rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white p-8 shadow-xl transition-all hover:scale-[1.02] sm:min-h-[300px]"
        >
          {/* Badge Kategori */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-amber-200/60 px-3 py-1 text-[11px] font-bold text-amber-900">
              {currentCard.category}
            </span>
            <span className="text-xs font-semibold text-neutral-400">
              {currentIndex + 1} / {filteredCards.length}
            </span>
          </div>

          {/* Konten Kartu (Pertanyaan / Jawaban) */}
          <div className="my-8 flex min-h-[120px] flex-col items-center justify-center text-center">
            {isFlipped ? (
              <div className="space-y-2 animate-fadeIn">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <FontAwesomeIcon icon={faCheck} className="mr-1" /> Jawaban Benar:
                </span>
                <p className="text-lg font-extrabold text-emerald-900 sm:text-xl">
                  {currentCard.answer}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Pertanyaan:
                </span>
                <p className="text-base font-bold text-neutral-800 sm:text-lg leading-relaxed">
                  {currentCard.question}
                </p>

                {showClue && (
                  <p className="mt-2 text-xs italic text-amber-800 bg-amber-100/70 p-2 rounded-xl">
                    💡 Clue: {currentCard.clue}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Petunjuk Bawah Kartu */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] font-semibold text-neutral-400">
            Klik kartu di mana saja untuk {isFlipped ? "melihat pertanyaan 🔄" : "membalik jawaban 🔄"}
          </div>
        </div>

        {/* Tombol Aksi Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4 w-full max-w-lg">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-bold text-neutral-700 transition hover:bg-amber-100"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
            Sebelumnya
          </button>

          {!isFlipped && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowClue(!showClue);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
            >
              <FontAwesomeIcon icon={faLightbulb} className="h-3 w-3 text-amber-600" />
              {showClue ? "Sembunyikan Clue" : "Petunjuk"}
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-amber-600"
          >
            Selanjutnya
            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}