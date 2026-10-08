"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCircleCheck,
  faCircleXmark,
  faTrophy,
  faRotateRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

type Option = {
  text: string;
  explanation: string; // Penjelasan spesifik untuk tiap opsi
};

type Question = {
  question: string;
  options: Option[];
  answer: number; // Indeks jawaban yang benar
};

const questions: Question[] = [
  {
    question:
      "Rempah apa yang menjadi penyebab utama bangsa Eropa datang ke Nusantara?",
    options: [
      {
        text: "Cengkeh dan Pala",
        explanation: "Benar! Cengkeh dan pala pada masa itu sangat langka dan harganya setara dengan emas di Eropa.",
      },
      {
        text: "Teh dan Kopi",
        explanation: "Salah. Teh dan kopi baru menjadi komoditas perkebunan besar pada masa kolonial yang lebih akhir.",
      },
      {
        text: "Gula dan Beras",
        explanation: "Salah. Gula dan beras merupakan komoditas pangan lokal/regional, bukan pemicu utama penjelajahan samudra.",
      },
      {
        text: "Tembakau dan Kapas",
        explanation: "Salah. Tembakau dan kapas dikembangkan kemudian sebagai komoditas industri perkebunan.",
      },
    ],
    answer: 0,
  },
  {
    question:
      "Di kepulauan mana pala pertama kali dikenal sebagai satu-satunya di dunia?",
    options: [
      {
        text: "Sumatera",
        explanation: "Salah. Sumatera terkenal dengan lada, bukan sebagai pusat penghasil pala.",
      },
      {
        text: "Kepulauan Banda, Maluku",
        explanation: "Benar! Kepulauan Banda adalah satu-satunya tempat asal tanaman pala di dunia pada masa lampau.",
      },
      {
        text: "Jawa Barat",
        explanation: "Salah. Jawa Barat lebih dikenal dengan komoditas beras dan teh di masa berikutnya.",
      },
      {
        text: "Kalimantan",
        explanation: "Salah. Kalimantan bukan pusat utama penghasil rempah perdagangan dunia zaman kuno.",
      },
    ],
    answer: 1,
  },
  // (Soal-soal berikutnya bisa disesuaikan dengan format opsi & explanation yang sama)
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = questions[current];

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setAnswers((prev) => [...prev, index]);
    if (index === question.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const grade =
    percentage >= 90
      ? "Luar biasa — kamu pakar rempah."
      : percentage >= 70
        ? "Hebat — pengetahuanmu kuat."
        : percentage >= 50
          ? "Lumayan, terus belajar."
          : "Ayo baca penjelasan dulu.";

  return (
    <div className="gradient-warm -mt-14 min-h-screen pb-14 pt-28">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-spice-purple-light px-4 py-1.5 text-sm font-semibold text-spice-purple">
          <FontAwesomeIcon icon={faBrain} className="h-4 w-4" />
          Kuis
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Ukur pemahamanmu
        </h1>
        <p className="mt-2 text-neutral-600">
          Uji wawasanmu tentang sejarah jalur rempah Nusantara. Setiap pilihan jawaban dilengkapi penjelasan detail.
        </p>

        <div className="mt-10">
          {!finished ? (
            <div className="rounded-2xl border border-spice-purple/10 bg-white/80 p-6 shadow-lg shadow-spice-purple/5 backdrop-blur sm:p-8">
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span className="font-semibold">
                  Pertanyaan {current + 1} dari {questions.length}
                </span>
                <span className="rounded-full bg-spice-amber-light px-3 py-1 font-bold text-spice-amber-dark">
                  Skor: {score}
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-spice-purple to-spice-indigo transition-all duration-500"
                  style={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              <h2 className="mt-6 text-lg font-bold text-neutral-900">
                {question.question}
              </h2>

              {/* Daftar Opsi dan Penjelasan Masing-masing */}
              <div className="mt-5 space-y-4">
                {question.options.map((opt, i) => {
                  let cls =
                    "border-neutral-200 bg-white hover:bg-spice-amber-light/30 hover:border-spice-amber/30 text-neutral-800";
                  if (selected !== null) {
                    if (i === question.answer) {
                      cls =
                        "border-spice-emerald bg-spice-emerald-light text-spice-emerald-dark ring-2 ring-spice-emerald/20";
                    } else if (i === selected) {
                      cls =
                        "border-spice-rose bg-spice-rose-light text-spice-rose ring-2 ring-spice-rose/20";
                    } else {
                      cls = "border-neutral-200 bg-white text-neutral-400";
                    }
                  }
                  return (
                    <div key={i} className="space-y-1.5">
                      <button
                        onClick={() => handleSelect(i)}
                        disabled={selected !== null}
                        className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left text-sm font-semibold transition ${cls}`}
                      >
                        <span>{opt.text}</span>
                        {selected !== null && i === question.answer && (
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="h-5 w-5 text-spice-emerald"
                          />
                        )}
                        {selected !== null &&
                          i === selected &&
                          i !== question.answer && (
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="h-5 w-5 text-spice-rose"
                            />
                          )}
                      </button>

                      {/* Penjelasan muncul di bawah tiap opsi setelah user menjawab */}
                      {selected !== null && (
                        <div
                          className={`rounded-lg px-3.5 py-2 text-xs leading-relaxed transition-all ${
                            i === question.answer
                              ? "bg-spice-emerald-light/50 text-spice-emerald-dark font-medium border border-spice-emerald/20"
                              : i === selected
                                ? "bg-spice-rose-light/50 text-spice-rose font-medium border border-spice-rose/20"
                                : "bg-neutral-50 text-neutral-500 border border-neutral-100"
                          }`}
                        >
                          <span className="font-bold">
                            {i === question.answer ? "Kunci/Alasan Benar: " : "Penjelasan: "}
                          </span>
                          {opt.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selected !== null && (
                <button
                  onClick={handleNext}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-spice-purple to-spice-indigo px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-spice-purple/25 transition hover:shadow-xl hover:-translate-y-0.5"
                >
                  {current + 1 < questions.length
                    ? "Berikutnya"
                    : "Lihat hasil"}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3.5 w-3.5"
                  />
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-spice-amber/10 bg-white/80 p-8 text-center shadow-lg shadow-spice-amber/5 backdrop-blur">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-spice-amber to-spice-coral text-white shadow-lg shadow-spice-amber/25">
                <FontAwesomeIcon icon={faTrophy} className="h-8 w-8" />
              </span>
              <h2 className="mt-4 text-3xl font-bold gradient-text-amber">
                {score}/{questions.length}
              </h2>
              <p className="mt-1 font-semibold text-neutral-700">{grade}</p>
              <div className="mx-auto mt-5 h-3 w-full max-w-xs overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-spice-amber to-spice-coral transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {percentage}% benar
              </p>

              <div className="mt-8 space-y-4 text-left">
                {questions.map((q, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border-2 p-4 text-sm ${
                      answers[i] === q.answer
                        ? "border-spice-emerald/20 bg-spice-emerald-light/30"
                        : "border-spice-rose/20 bg-spice-rose-light/30"
                    }`}
                  >
                    <p className="font-bold text-neutral-900">{q.question}</p>
                    <p
                      className={`mt-1 font-semibold ${
                        answers[i] === q.answer
                          ? "text-spice-emerald"
                          : "text-spice-rose"
                      }`}
                    >
                      {answers[i] === q.answer ? "Benar" : "Kurang tepat"} —
                      jawabanmu: {q.options[answers[i]].text}
                    </p>
                    {answers[i] !== q.answer && (
                      <p className="mt-1 text-neutral-600">
                        Jawaban benar: {q.options[q.answer].text}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={restart}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-spice-amber to-spice-coral px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-spice-amber/25 transition hover:shadow-xl hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" />
                Ulangi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}