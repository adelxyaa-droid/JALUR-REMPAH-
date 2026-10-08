"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faSeedling,
  faGlobe,
  faLandmark,
  faDrum,
  faBowlFood,
  faWind,
  faClockRotateLeft,
  faPeopleGroup,
  faArrowRightLong,
  faArrowLeftLong,
  faArrowsLeftRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import LottieSpiceMap from "@/components/LottieSpiceMap";
import RealSpiceMap from "@/components/RealSpiceMap";
import ScrollReveal from "@/components/ScrollReveal";

type Spice = {
  name: string;
  origin: string;
  desc: string;
  image: string;
  icon: IconDefinition;
  color: string;
  gradient: string;
};

const spices: Spice[] = [
  {
    name: "Cengkeh",
    origin: "Maluku Utara: Ternate, Tidore, Makian, Bacan",
    desc: "Digunakan sebagai bumbu, pengawet makanan, obat, dan bahan parfum. Nilainya yang tinggi mendorong ekspedisi bangsa Eropa.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Bumbu_dan_Rempah_-_rempah.jpg/960px-Bumbu_dan_Rempah_-_rempah.jpg",
    icon: faSeedling,
    color: "text-amber-600",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Pala",
    origin: "Kepulauan Banda, Maluku",
    desc: "Biji pala dan selaput bijinya, fuli, menjadi komoditas mewah di Eropa. Keduanya membuat Banda kaya sekaligus menjadi sasaran perebutan kekuasaan.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nutmeg%20fruit.jpg?width=900",
    icon: faSeedling,
    color: "text-rose-600",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Lada",
    origin: "Banten, Lampung, Aceh, Sumatera Selatan",
    desc: "Komoditas perdagangan utama untuk bumbu dan pengawet yang mendorong tumbuhnya pelabuhan seperti Banten.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Black_peppercorns_gn.jpg/960px-Black_peppercorns_gn.jpg",
    icon: faSeedling,
    color: "text-teal-600",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "Kayu Manis",
    origin: "Kerinci, Jambi, Sumatera Barat",
    desc: "Dipakai sebagai bumbu, obat, dan pengawet alami serta diperdagangkan melalui pelabuhan Sumatra.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cinnamon%20sticks.jpg?width=900",
    icon: faSeedling,
    color: "text-purple-600",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    name: "Kapur Barus",
    origin: "Barus, Sumatera Utara",
    desc: "Komoditas aromatik untuk pengobatan, ritual, dan pembalseman yang membuat Barus dikenal dalam jaringan niaga Asia.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Camphor_Cubes.jpg?width=900",
    icon: faSeedling,
    color: "text-emerald-600",
    gradient: "from-emerald-400 to-teal-500",
  },
];

const chronology = [
  {
    period: "Praaksara",
    title: "Pelayaran Austronesia",
    desc: "Pelaut Austronesia mengembangkan perahu bercadik dan jaringan pelayaran luas dari Asia Tenggara hingga Madagaskar dan Afrika Timur. Jejak perdagangan rempah dengan dunia kuno terus dikaji melalui bukti arkeologis dan sumber tertulis.",
    detail:
      "Kemahiran membaca angin, arus, bintang, dan musim membuat pelaut Austronesia mampu menempuh jarak jauh dengan perahu bercadik. Jaringan ini menghubungkan kepulauan Indonesia dengan pesisir Asia Tenggara, Samudra Hindia, Madagaskar, hingga Afrika Timur. Walaupun belum berbentuk perdagangan rempah seperti pada masa kemudian, pertukaran bahan alam dan pengetahuan telah membangun fondasi jalur maritim Nusantara.",
    route: "Asia Tenggara → Nusantara → Madagaskar → Afrika Timur",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    period: "Abad ke-4–15",
    title: "Kerajaan maritim",
    desc: "Sriwijaya berkembang sebagai entrepôt di sekitar Selat Malaka dan Selat Sunda. Majapahit memperkuat hubungan antarpulau dalam jaringan perdagangan Nusantara.",
    detail:
      "Sriwijaya menguasai simpul strategis di sekitar Selat Malaka dan Selat Sunda, tempat kapal singgah, bertukar muatan, dan menunggu perubahan angin. Pada masa Majapahit, hubungan antarpulau semakin kuat melalui pelabuhan dan jaringan politik yang menghubungkan Jawa, Sumatra, Kalimantan, Sulawesi, hingga Maluku.",
    route: "Selat Malaka → Selat Sunda → Jawa → Maluku",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    period: "Abad ke-15–16",
    title: "Kesultanan dan emporium",
    desc: "Malaka menjadi pusat pertemuan pedagang Asia dan Eropa. Ternate dan Tidore menjadi pusat politik serta perdagangan cengkih di Maluku.",
    detail:
      "Malaka menjadi emporium kosmopolitan yang mempertemukan pedagang dari Gujarat, Arab, Persia, Tiongkok, dan Nusantara. Dari sana, kapal melanjutkan perjalanan menuju pusat cengkih di Ternate dan Tidore. Kesultanan di Maluku mengatur produksi, hubungan dagang, dan akses menuju pulau-pulau penghasil rempah.",
    route: "India dan Arab → Malaka → Sulawesi → Ternate dan Tidore",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    period: "Abad ke-16–20",
    title: "Monopoli dan kolonialisme",
    desc: "Portugis merebut Malaka pada 1511 dan mencapai Maluku pada 1512. Perjanjian Zaragoza 1521 membagi wilayah operasi Spanyol dan Portugis. VOC berdiri pada 1602 dan memaksakan monopoli melalui pelayaran hongi dengan kora-kora, ekstirpasi, serta kekerasan di Banda pada 1621 di bawah JP Coen. Perjanjian Breda 1667 mengatur pertukaran Pulau Run dengan Manhattan.",
    detail:
      "Kedatangan Portugis dan Spanyol mengubah persaingan dagang menjadi perebutan kendali politik dan militer. Setelah VOC berdiri pada 1602, monopoli dipaksakan melalui perjanjian, benteng, pelayaran hongi, dan ekstirpasi. Kekerasan di Banda pada 1621 menghancurkan masyarakat penghasil pala, sementara Perjanjian Breda pada 1667 mengatur pertukaran Pulau Run dengan Manhattan dan memperlihatkan betapa tingginya nilai komoditas rempah dalam politik global.",
    route: "Lisbon → Tanjung Harapan → Malaka → Banda dan Maluku",
    gradient: "from-rose-400 to-pink-500",
  },
];

const impacts = [
  {
    title: "Bahasa dan masyarakat pelabuhan",
    desc: "Bahasa Melayu Pasar berkembang sebagai lingua franca. Pelabuhan menjadi masyarakat kosmopolitan dengan perjumpaan orang Nusantara, Arab, Gujarat, Tiongkok, dan Eropa, termasuk terbentuknya Kampung Arab, Pecinan, dan Koja.",
    icon: faPeopleGroup,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Akulturasi budaya",
    desc: "Pertukaran perdagangan membentuk kuliner seperti gulai dan kari, tradisi jamu, masjid beratap tumpang, serta kesenian seperti gambus.",
    icon: faBowlFood,
    color: "from-rose-400 to-pink-500",
  },
  {
    title: "Perubahan dunia",
    desc: "Perburuan rempah ikut mendorong Age of Discovery atau Era Penjelajahan Samudra, yang mengubah peta politik dan ekonomi dunia dari tatanan feodal menuju kapitalisme global.",
    icon: faGlobe,
    color: "from-teal-400 to-cyan-500",
  },
];

const routes = [
  {
    name: "Rute Barat",
    path: "Eropa → Timur Tengah → India → Selat Malaka",
    desc: "Rute paling ramai yang mengalirkan cengkeh, pala, dan lada dari Maluku ke pasar dunia.",
    icon: faArrowRightLong,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Rute Timur",
    path: "Tiongkok & Jepang → Sulawesi → Maluku",
    desc: "Menghubungkan Maluku dengan pasar Asia Timur lewat pelabuhan di Nusantara timur.",
    icon: faArrowLeftLong,
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "Rute Nusantara",
    path: "Maluku → Sulawesi → Jawa → Sumatera",
    desc: "Jaringan pelayaran antarpulau yang menjadi tulang punggung distribusi rempah.",
    icon: faArrowsLeftRight,
    gradient: "from-purple-400 to-indigo-500",
  },
];

const ports = [
  {
    name: "Ternate dan Tidore",
    region: "Maluku Utara",
    desc: "Pusat produksi dan perdagangan cengkih. Kedua kesultanan ini terhubung dengan Sulawesi, Jawa, dan jaringan pedagang Asia melalui pelabuhan-pelabuhan di Maluku.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ternate_in_sight.jpg/960px-Ternate_in_sight.jpg",
    color: "border-l-amber-400",
    bg: "bg-amber-50/50",
  },
  {
    name: "Kepulauan Banda",
    region: "Maluku Tengah",
    desc: "Wilayah utama penghasil pala dan fuli. Kapal dari berbagai wilayah datang untuk mengumpulkan komoditas yang kemudian dibawa ke pelabuhan perantara di Sulawesi dan Jawa.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/BandaBesarIslandSeenFromFortBelgica.JPG/960px-BandaBesarIslandSeenFromFortBelgica.JPG",
    color: "border-l-rose-400",
    bg: "bg-rose-50/50",
  },
  {
    name: "Makassar",
    region: "Sulawesi Selatan",
    desc: "Simpul penting yang menghubungkan Maluku dengan Jawa, Nusa Tenggara, dan jalur menuju Asia. Pelabuhan ini menjadi ruang pertukaran rempah, beras, kain, dan hasil laut.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Makassar%2C_March_2019_%28cropped%29.jpg/960px-Makassar%2C_March_2019_%28cropped%29.jpg",
    color: "border-l-teal-400",
    bg: "bg-teal-50/50",
  },
  {
    name: "Banten",
    region: "Jawa bagian barat",
    desc: "Pelabuhan lada yang ramai dan pintu masuk menuju pasar Asia. Letaknya di dekat Selat Sunda membuat Banten strategis bagi kapal yang bergerak antara Samudra Hindia dan Nusantara.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Banten_in_Indonesia.svg/960px-Banten_in_Indonesia.svg.png",
    color: "border-l-purple-400",
    bg: "bg-purple-50/50",
  },
  {
    name: "Aceh dan Barus",
    region: "Sumatera bagian utara",
    desc: "Aceh berperan sebagai pusat perdagangan di ujung barat Nusantara, sedangkan Barus dikenal melalui kapur barus. Keduanya terhubung dengan India, Arab, dan pesisir Afrika Timur.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85",
    color: "border-l-emerald-400",
    bg: "bg-emerald-50/50",
  },
  {
    name: "Malaka",
    region: "Semenanjung Melayu",
    desc: "Emporium besar tempat rempah dari Nusantara bertemu pedagang Gujarat, Arab, Persia, Tiongkok, dan Eropa sebelum diteruskan ke pasar yang lebih luas.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=85",
    color: "border-l-indigo-400",
    bg: "bg-indigo-50/50",
  },
];

const heritage = [
  {
    title: "Benteng & Pelabuhan",
    desc: "Benteng peninggalan Portugis dan Belanda di Ternate, Banda, dan Makassar jadi saksi kejayaan rempah.",
    icon: faLandmark,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Tradisi & Upacara",
    desc: "Festival seperti Legu Gam di Maluku merayakan hubungan budaya dengan rempah.",
    icon: faDrum,
    color: "from-rose-400 to-pink-500",
  },
  {
    title: "Jamu & Kuliner",
    desc: "Kekayaan rempah melahirkan tradisi jamu dan kuliner khas yang kini dikenal dunia.",
    icon: faBowlFood,
    color: "from-teal-400 to-emerald-500",
  },
];

export default function Penjelasan() {
  const [selectedChronology, setSelectedChronology] = useState<
    (typeof chronology)[number] | null
  >(null);

  useEffect(() => {
    if (!selectedChronology) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedChronology(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedChronology]);

  return (
    <div className="-mt-20 flex w-full min-w-0 flex-col">
      <section className="gradient-hero">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-spice-amber/10 px-4 py-1.5 text-sm font-semibold text-spice-amber-dark">
            <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4" />
            Penjelasan
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Sejarah Jalur Rempah{" "}
            <span className="gradient-text-amber">Indonesia</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Jalur rempah adalah jaringan perdagangan yang menghubungkan
            Nusantara dengan dunia sejak zaman dahulu. Rempah-rempah kita begitu
            bernilai sehingga menjadi pemicu penjelajahan samudra dan turut
            mengubah peta dunia.
          </p>
        </div>
      </section>

      <section className="gradient-warm border-y border-spice-amber/20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-20 lg:py-20">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-spice-amber to-spice-coral text-white shadow-lg shadow-spice-amber/20">
              <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
            </div>
            <p className="section-kicker mt-6">Konteks sejarah</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
              Mengapa disebut jalur rempah?
            </h2>
          </div>
          <div className="border-l-4 border-spice-amber/30 pl-6 text-neutral-700 sm:pl-8">
            <div className="space-y-5 leading-relaxed">
              <p>
                Jalur Rempah adalah jaringan niaga bahari yang menghubungkan
                kepulauan Nusantara dengan India, Timur Tengah, Tiongkok, dan
                Eropa. Jaringan ini berpusat pada rute maritim, bukan satu jalan
                tunggal.
              </p>
              <p>
                Pelayaran memanfaatkan angin muson. Muson Barat, sekitar
                Oktober–Maret, membantu pelayaran menuju Nusantara; Muson Timur,
                sekitar April–September, membantu pelayaran kembali menuju
                Samudra Hindia atau Laut Tiongkok Selatan.
              </p>
              <p>
                Kerajaan maritim seperti Sriwijaya dan Majapahit membangun
                pengaruh dengan menguasai pelabuhan dan simpul laut strategis.
                Pola ini disebut thalassocracy, yaitu kekuatan yang bertumpu
                pada jaringan maritim.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-ocean border-b border-spice-teal/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-spice-teal to-spice-indigo text-white shadow-lg">
              <FontAwesomeIcon icon={faWind} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-neutral-900">
              Angin muson dan pelayaran
            </h2>
            <p className="mt-2 leading-relaxed text-neutral-600">
              Pengetahuan membaca musim membuat pelabuhan Nusantara terhubung
              secara berkala dengan pusat perdagangan dunia.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-l-4 border-spice-teal bg-white/80 p-5 shadow-sm">
              <h3 className="font-bold text-spice-teal-dark">Muson Barat</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                Oktober–Maret, mendukung pelayaran dari India, Arab, dan
                Tiongkok menuju Nusantara.
              </p>
            </div>
            <div className="rounded-2xl border-l-4 border-spice-indigo bg-white/80 p-5 shadow-sm">
              <h3 className="font-bold text-spice-indigo">Muson Timur</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                April–September, mendukung pelayaran keluar dari Nusantara
                menuju barat dan timur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-spice border-t border-spice-amber/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Rempah-rempah legendaris
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Komoditas berharga yang menjadikan Nusantara pusat peradaban
            perdagangan dunia.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spices.map((s) => (
              <div
                key={s.name}
                className="overflow-hidden rounded-2xl border border-spice-amber/10 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="h-36 bg-cover bg-center"
                  role="img"
                  aria-label={`Foto ${s.name}`}
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}
                    >
                      <FontAwesomeIcon icon={s.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-neutral-900">{s.name}</h3>
                      <p className="text-xs text-neutral-500">{s.origin}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-warm border-t border-spice-amber/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-spice-amber to-spice-coral text-white shadow-md">
              <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 w-4" />
            </span>
            <h2 className="text-2xl font-bold text-neutral-900">
              Kronologi singkat
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {chronology.map((item) => (
              <button
                type="button"
                key={item.period}
                onClick={() => setSelectedChronology(item)}
                className="group rounded-2xl border-t-4 border-t-spice-amber/30 bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`inline-flex rounded-full bg-gradient-to-r ${item.gradient} px-3 py-1 text-xs font-bold text-white`}
                >
                  {item.period}
                </span>
                <h3 className="mt-3 font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex text-xs font-bold text-spice-amber transition group-hover:text-spice-coral">
                  Buka kisah dan rute →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        id="rute"
        className="gradient-ocean border-t border-spice-teal/20"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Rute pelayaran rempah Nusantara
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-neutral-600">
            Dari Maluku sebagai pusat cengkih dan pala, rempah disebarkan
            melalui jaringan pelayaran ke Sulawesi, Jawa, hingga Sumatera
            sebelum diteruskan ke pasar dunia. Setiap pelabuhan memiliki peran
            berbeda sebagai tempat produksi, pengumpulan, pertukaran, atau
            pengiriman komoditas.
          </p>

          <div className="mt-8">
            <LottieSpiceMap />
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-neutral-900">
              Pelabuhan utama
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
              Pelabuhan-pelabuhan berikut membentuk rangkaian distribusi dari
              kebun rempah hingga pusat perdagangan internasional.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ports.map((port) => (
                <article
                  key={port.name}
                  className={`overflow-hidden rounded-2xl border-l-4 ${port.color} ${port.bg} shadow-sm transition hover:shadow-md`}
                >
                  <div
                    className="h-32 bg-cover bg-center"
                    role="img"
                    aria-label={`Foto ${port.name}`}
                    style={{ backgroundImage: `url(${port.image})` }}
                  />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-spice-amber-dark">
                      {port.region}
                    </p>
                    <h4 className="mt-2 font-bold text-neutral-900">
                      {port.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {port.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-5">
            {routes.map((r, routeIndex) => {
              const stops = r.path.split(" → ");

              return (
                <ScrollReveal key={r.name} delay={routeIndex * 100}>
                  <article className="rounded-2xl border border-spice-teal/10 bg-white/80 p-5 shadow-sm sm:p-6 transition hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${r.gradient} text-white shadow-md`}
                      >
                        <FontAwesomeIcon icon={r.icon} className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900">{r.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                          {r.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <RealSpiceMap
                        highlightedRoute={r.name}
                        routePath={stops}
                        compact
                      />
                    </div>

                    <div className="mt-6 overflow-x-auto pb-1">
                      <div className="flex min-w-max items-start">
                        {stops.map((stop, stopIndex) => (
                          <div
                            key={stop}
                            className="route-stop flex items-start"
                          >
                            <div className="flex w-32 flex-col items-center text-center sm:w-40">
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-spice-teal bg-white text-sm font-bold text-spice-teal-dark shadow-sm`}
                              >
                                {stopIndex + 1}
                              </span>
                              <span className="mt-2 text-xs font-medium leading-tight text-neutral-700">
                                {stop}
                              </span>
                            </div>
                            {stopIndex < stops.length - 1 && (
                              <div className="route-connector mt-4 flex w-10 items-center text-spice-teal sm:w-16">
                                <span className="h-px flex-1 bg-gradient-to-r from-spice-teal/40 to-spice-teal" />
                                <FontAwesomeIcon
                                  icon={faArrowRightLong}
                                  className="h-3 w-3"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gradient-spice border-t border-spice-amber/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="section-kicker">Relevansi hari ini</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold text-neutral-900 sm:text-3xl">
            Merawat ingatan, menghidupkan kembali jaringan
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600">
            Jalur Rempah menjadi bagian dari diplomasi budaya Indonesia dan
            mendukung gagasan Poros Maritim Dunia. Pelestarian pelabuhan,
            pengetahuan rempah, dan tradisi masyarakat membantu mengajukan
            jaringan ini sebagai warisan budaya dunia kepada UNESCO.
          </p>
        </div>
      </section>

      <section className="gradient-warm w-full">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Warisan yang tersisa
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Jejak jalur rempah masih hidup dalam budaya dan kehidupan masyarakat
            Indonesia hingga kini.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[...heritage, ...impacts].map((h) => (
              <div
                key={h.title}
                className="rounded-2xl bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${h.color} text-white shadow-md`}
                >
                  <FontAwesomeIcon icon={h.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold text-neutral-900">{h.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedChronology &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="chronology-modal-title"
            className="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setSelectedChronology(null)}
          >
            <div
              className="max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#fffaf3] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5 border-b border-spice-amber/15 px-5 py-5 sm:px-8">
                <div>
                  <p className="section-kicker">{selectedChronology.period}</p>
                  <h2
                    id="chronology-modal-title"
                    className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl"
                  >
                    {selectedChronology.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedChronology(null)}
                  aria-label="Tutup detail kronologi"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spice-amber-light text-spice-amber-dark transition hover:bg-spice-amber hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-50/80 via-white/40 to-indigo-100/70 p-2">
                  <RealSpiceMap
                    highlightedRoute={selectedChronology.title}
                    routePath={selectedChronology.route.split(" → ")}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-spice-teal-dark">
                    Rute pelayaran
                  </p>
                  <p className="mt-3 rounded-xl bg-spice-amber-light/70 px-4 py-3 text-sm font-bold leading-relaxed text-spice-amber-dark">
                    {selectedChronology.route}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-neutral-700">
                    {selectedChronology.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
