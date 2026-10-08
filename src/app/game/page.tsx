"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchor,
  faCompass,
  faCoins,
  faGamepad,
  faHeart,
  faRotateRight,
  faSailboat,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

type Port = {
  name: string;
  region: string;
  supplies: number;
  danger: number;
  description: string;
};

type Market = Record<string, number>;

const spices = [
  { name: "Cengkeh", basePrice: 42, gradient: "from-amber-400 to-orange-500" },
  { name: "Pala", basePrice: 58, gradient: "from-rose-400 to-pink-500" },
  { name: "Lada", basePrice: 50, gradient: "from-teal-400 to-cyan-500" },
  {
    name: "Kayu manis",
    basePrice: 34,
    gradient: "from-purple-400 to-indigo-500",
  },
];

const ports: Port[] = [
  {
    name: "Ternate",
    region: "Maluku Utara",
    supplies: 1,
    danger: 20,
    description: "Pulau cengkeh dengan jalur pendek dan relatif aman.",
  },
  {
    name: "Banda",
    region: "Maluku",
    supplies: 2,
    danger: 45,
    description: "Pusat pala. Hasil besar, tetapi lautnya sulit diprediksi.",
  },
  {
    name: "Banten",
    region: "Jawa Barat",
    supplies: 1,
    danger: 35,
    description: "Pelabuhan ramai dengan banyak pedagang dan bajak laut.",
  },
  {
    name: "Aceh",
    region: "Sumatra",
    supplies: 2,
    danger: 60,
    description: "Hadiah terbesar, tetapi rutenya panjang dan berbahaya.",
  },
  {
    name: "Makassar",
    region: "Sulawesi Selatan",
    supplies: 1,
    danger: 40,
    description: "Persimpangan dagang penting untuk mengisi kembali bekal.",
  },
  {
    name: "Bali",
    region: "Bali",
    supplies: 1,
    danger: 25,
    description: "Pelabuhan singgah yang aman, tetapi hadiahnya kecil.",
  },
];

const MAX_TURNS = 5;
const STARTING_GOLD = 120;
const STARTING_SUPPLIES = 7;
const STARTING_HEALTH = 3;

function getRouteRisk(port: Port, turn: number) {
  const nameValue = [...port.name].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return (nameValue + turn * 17) % 100;
}

function generateMarket(): Market {
  return Object.fromEntries(
    spices.map((spice) => [
      spice.name,
      Math.floor(spice.basePrice * (0.65 + Math.random() * 0.9)),
    ]),
  );
}

const portColors = [
  "border-l-amber-400",
  "border-l-rose-400",
  "border-l-purple-400",
  "border-l-teal-400",
  "border-l-indigo-400",
  "border-l-emerald-400",
];

export default function Game() {
  const [gold, setGold] = useState(STARTING_GOLD);
  const [supplies, setSupplies] = useState(STARTING_SUPPLIES);
  const [health, setHealth] = useState(STARTING_HEALTH);
  const [turn, setTurn] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);
  const [currentPort, setCurrentPort] = useState<string | null>(null);
  const [market, setMarket] = useState<Market | null>(null);
  const [cargo, setCargo] = useState<Record<string, number>>({});
  const [logs, setLogs] = useState([
    "Pilih rute pertamamu. Setiap pelabuhan hanya bisa dikunjungi sekali.",
  ]);

  const addLog = (message: string) =>
    setLogs((current) => [message, ...current].slice(0, 6));

  const sailTo = (port: Port) => {
    if (
      turn >= MAX_TURNS ||
      visited.includes(port.name) ||
      supplies < port.supplies
    )
      return;
    const riskRoll = getRouteRisk(port, turn);
    const hit = riskRoll < port.danger;
    const damage = hit && (riskRoll + turn) % 10 < 3 ? 2 : hit ? 1 : 0;
    setSupplies((current) => current - port.supplies);
    setHealth((current) => Math.max(0, current - damage));
    setTurn((current) => current + 1);
    setVisited((current) => [...current, port.name]);
    setCurrentPort(port.name);
    setMarket(generateMarket());
    addLog(
      hit
        ? `Bahaya di ${port.name}! Kapal rusak ${damage} tingkat. Pasar tetap dibuka.`
        : `Berhasil tiba di ${port.name}. Pasar baru saja dibuka.`,
    );
  };

  const buySpice = (spiceName: string) => {
    const price = market?.[spiceName];
    const totalCargo = Object.values(cargo).reduce(
      (sum, count) => sum + count,
      0,
    );
    if (price === undefined || gold < price || totalCargo >= 8 || isOver)
      return;
    setGold((current) => current - price);
    setCargo((current) => ({
      ...current,
      [spiceName]: (current[spiceName] ?? 0) + 1,
    }));
    addLog(`Membeli 1 kg ${spiceName} seharga ${price} emas.`);
  };

  const sellSpice = (spiceName: string) => {
    const price = market?.[spiceName];
    if (price === undefined || !cargo[spiceName] || health <= 0) return;
    setGold((current) => current + price);
    setCargo((current) => ({
      ...current,
      [spiceName]: current[spiceName] - 1,
    }));
    addLog(`Menjual 1 kg ${spiceName} seharga ${price} emas.`);
  };

  const restart = () => {
    setGold(STARTING_GOLD);
    setSupplies(STARTING_SUPPLIES);
    setHealth(STARTING_HEALTH);
    setTurn(0);
    setVisited([]);
    setCurrentPort(null);
    setMarket(null);
    setCargo({});
    setLogs(["Ekspedisi baru dimulai. Pilih rute pertamamu."]);
  };

  const cargoCount = Object.values(cargo).reduce(
    (sum, count) => sum + count,
    0,
  );
  const isOver =
    turn >= MAX_TURNS || health <= 0 || (supplies <= 0 && cargoCount === 0);
  const isSuccess = turn >= MAX_TURNS && health > 0;

  return (
    <div className="gradient-ocean -mt-14 min-h-screen w-full pb-14 pt-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <p className="section-kicker">Laboratorium interaktif</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-spice-teal-light px-4 py-1.5 text-sm font-semibold text-spice-teal-dark">
          <FontAwesomeIcon icon={faCompass} className="h-4 w-4" />
          Strategi pelayaran
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Navigasi Jalur <span className="gradient-text-ocean">Rempah</span>
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Berlayar untuk menemukan harga beli murah dan menjual rempah dengan
          untung besar. Harga pasar berubah setiap kali kamu tiba di pulau baru.
        </p>

        <div className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm">
            <div className="text-sm font-bold text-amber-700">Pilih rute</div>
            <p className="mt-1 text-xs leading-relaxed text-amber-800/70">
              Setiap pulau menawarkan harga berbeda. Cari pasar murah sebelum
              membawa rempah ke tujuan berikutnya.
            </p>
          </div>
          <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-4 shadow-sm">
            <div className="text-sm font-bold text-teal-700">Jaga bekal</div>
            <p className="mt-1 text-xs leading-relaxed text-teal-800/70">
              Setiap pelabuhan membutuhkan bekal. Sisakan ruang untuk membawa
              kargo yang menguntungkan.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-200 bg-purple-50/80 p-4 shadow-sm">
            <div className="text-sm font-bold text-purple-700">
              Capai tujuan
            </div>
            <p className="mt-1 text-xs leading-relaxed text-purple-800/70">
              Selesaikan lima pelayaran dengan kapal tetap mengapung dan emas
              sebanyak mungkin.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="rounded-2xl border border-spice-amber/10 bg-white/80 p-6 shadow-lg shadow-spice-amber/5 backdrop-blur">
              <h2 className="text-lg font-bold text-neutral-900">
                Papan kapten
              </h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-3 shadow-inner">
                  <FontAwesomeIcon
                    icon={faCoins}
                    className="mx-auto h-5 w-5 text-amber-500"
                  />
                  <div className="mt-1 text-lg font-bold text-amber-700">
                    {gold}
                  </div>
                  <div className="text-xs font-semibold text-amber-600/70">
                    emas
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-3 shadow-inner">
                  <FontAwesomeIcon
                    icon={faAnchor}
                    className="mx-auto h-5 w-5 text-teal-500"
                  />
                  <div className="mt-1 text-lg font-bold text-teal-700">
                    {supplies}
                  </div>
                  <div className="text-xs font-semibold text-teal-600/70">
                    bekal
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 p-3 shadow-inner">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mx-auto h-5 w-5 text-rose-500"
                  />
                  <div className="mt-1 text-lg font-bold text-rose-700">
                    {health}/3
                  </div>
                  <div className="text-xs font-semibold text-rose-600/70">
                    kapal
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 p-3 text-center shadow-inner">
                <div className="text-lg font-bold text-purple-700">
                  {Object.values(cargo).reduce((sum, count) => sum + count, 0)}
                  /8 kg
                </div>
                <div className="text-xs font-semibold text-purple-600/70">
                  muatan rempah
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-bold text-neutral-500">
                <span>Progres ekspedisi</span>
                <span>
                  {turn} dari {MAX_TURNS}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-spice-amber to-spice-coral transition-all duration-500"
                  style={{ width: `${(turn / MAX_TURNS) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-spice-teal/10 bg-white/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900">
                Catatan pelayaran
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                {logs.map((log, index) => (
                  <li
                    key={`${log}-${index}`}
                    className="border-l-2 border-spice-amber/30 pl-3"
                  >
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-spice-teal/10 bg-white/80 p-6 shadow-sm backdrop-blur">
              {market && currentPort ? (
                <div className="mb-8 border-b border-neutral-100 pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="section-kicker">Pasar {currentPort}</p>
                      <h2 className="mt-1 text-lg font-bold text-neutral-900">
                        Harga hari ini
                      </h2>
                      <p className="mt-1 text-sm text-neutral-500">
                        Beli rendah, simpan di muatan, lalu jual saat harganya
                        naik.
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-spice-amber to-spice-coral text-white shadow-md">
                      <FontAwesomeIcon icon={faCoins} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {spices.map((spice) => {
                      const owned = cargo[spice.name] ?? 0;
                      const price = market[spice.name];
                      return (
                        <div
                          key={spice.name}
                          className="rounded-xl border-2 border-neutral-100 p-3 transition hover:border-spice-amber/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-3 w-3 rounded-full bg-gradient-to-r ${spice.gradient}`}
                              />
                              <span className="font-bold text-neutral-900">
                                {spice.name}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-spice-amber">
                              {price} emas/kg
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-neutral-500">
                              Muatan: {owned} kg
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => sellSpice(spice.name)}
                                disabled={!owned || health <= 0}
                                className="rounded-lg border-2 border-spice-coral/30 bg-spice-coral-light px-3 py-1.5 text-xs font-bold text-spice-coral transition hover:bg-spice-coral hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Jual
                              </button>
                              <button
                                onClick={() => buySpice(spice.name)}
                                disabled={
                                  gold < price ||
                                  isOver ||
                                  Object.values(cargo).reduce(
                                    (sum, count) => sum + count,
                                    0,
                                  ) >= 8
                                }
                                className="rounded-lg bg-gradient-to-r from-spice-amber to-spice-coral px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Beli
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Pilih pelabuhan
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Pelabuhan yang sudah dikunjungi tidak dapat dipilih lagi.
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-spice-teal to-spice-indigo text-white shadow-md">
                  <FontAwesomeIcon icon={faSailboat} className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {ports.map((port, index) => {
                  const unavailable =
                    isOver ||
                    visited.includes(port.name) ||
                    supplies < port.supplies;
                  return (
                    <button
                      key={port.name}
                      onClick={() => sailTo(port)}
                      disabled={unavailable}
                      className={`text-left rounded-xl border-l-4 ${portColors[index]} border border-neutral-100 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-200/50 disabled:cursor-not-allowed disabled:opacity-45`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold text-neutral-900">
                            {port.name}
                          </div>
                          <div className="text-xs font-semibold text-neutral-500">
                            {port.region}
                          </div>
                        </div>
                        <span className="rounded-full bg-spice-amber-light px-2 py-0.5 text-xs font-bold text-spice-amber-dark">
                          Pasar acak
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                        {port.description}
                      </p>
                      <div className="mt-3 flex justify-between text-xs font-semibold text-neutral-500">
                        <span>Bekal: {port.supplies}</span>
                        <span
                          className={port.danger > 40 ? "text-spice-rose" : ""}
                        >
                          Risiko: {port.danger}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {isOver && (
              <div className="mt-6 rounded-2xl border border-spice-amber/10 bg-white/80 p-8 text-center shadow-lg shadow-spice-amber/5 backdrop-blur">
                <span
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${
                    isSuccess
                      ? "bg-gradient-to-br from-spice-amber to-spice-coral shadow-spice-amber/25"
                      : "bg-gradient-to-br from-neutral-600 to-neutral-800 shadow-neutral-600/25"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={isSuccess ? faTrophy : faGamepad}
                    className="h-7 w-7"
                  />
                </span>
                <h3 className="mt-3 text-xl font-bold text-neutral-900">
                  {isSuccess ? "Ekspedisi berhasil" : "Ekspedisi berakhir"}
                </h3>
                <p className="mt-1 text-neutral-600">
                  {isSuccess
                    ? `Kamu mengumpulkan ${gold} emas dan tiba dengan selamat.`
                    : "Sumber daya atau kondisi kapalmu tidak cukup untuk melanjutkan."}
                </p>
                <button
                  onClick={restart}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-spice-amber to-spice-coral px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-spice-amber/25 transition hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" />
                  Mulai ulang
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
