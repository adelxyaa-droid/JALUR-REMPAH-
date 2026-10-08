import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBrain,
  faGamepad,
  faCirclePlay,
  faArrowRight,
  faScroll,
  faAnchor,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LottieSpiceMap from "@/components/LottieSpiceMap";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    title: "Penjelasan",
    description: "Sejarah, rempah, dan rute jalur rempah Nusantara.",
    href: "/penjelasan",
    icon: faBookOpen,
    color: "spice-amber",
    gradient: "from-amber-400 to-orange-500",
    border: "border-t-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    title: "Quiz",
    description: "Uji pengetahuanmu lewat kuis interaktif.",
    href: "/quiz",
    icon: faBrain,
    color: "spice-purple",
    gradient: "from-purple-400 to-indigo-500",
    border: "border-t-purple-400",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    title: "Game",
    description: "Rasakan jadi pedagang rempah di laut Nusantara.",
    href: "/game",
    icon: faGamepad,
    color: "spice-teal",
    gradient: "from-teal-400 to-cyan-500",
    border: "border-t-teal-400",
    bg: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    title: "Video",
    description: "Tonton video edukatif seputar kejayaan rempah.",
    href: "/video",
    icon: faCirclePlay,
    color: "spice-coral",
    gradient: "from-rose-400 to-pink-500",
    border: "border-t-rose-400",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
];

const milestones = [
  {
    label: "Masa Awal",
    period: "Abad ke-7 hingga ke-15",
    text: "Rempah Nusantara mulai dikenal pedagang India dan Tiongkok.",
    detail:
      "Pelabuhan-pelabuhan di Nusantara tumbuh sebagai titik temu budaya, bahasa, dan pengetahuan dari berbagai penjuru Asia.",
    icon: faScroll,
    color: "from-amber-400 to-orange-500",
    dotColor: "bg-amber-400",
    borderColor: "border-t-amber-400",
  },
  {
    label: "Era Kolonial",
    period: "Abad ke-16 hingga ke-19",
    text: "Portugis, Belanda, dan Spanyol berebut monopoli rempah.",
    detail:
      "Nilai cengkeh dan pala mendorong pelayaran jarak jauh sekaligus membawa perebutan kuasa dan perubahan besar bagi masyarakat Maluku.",
    icon: faAnchor,
    color: "from-rose-400 to-pink-500",
    dotColor: "bg-rose-400",
    borderColor: "border-t-rose-400",
  },
  {
    label: "Warisan Kini",
    period: "Masa kini",
    text: "Jalur rempah diakui sebagai memori kolektif dunia oleh UNESCO.",
    detail:
      "Jejaknya masih terlihat dalam tradisi, kuliner, pelabuhan, dan cerita masyarakat yang terus dirawat lintas generasi.",
    icon: faSeedling,
    color: "from-teal-400 to-emerald-500",
    dotColor: "bg-teal-400",
    borderColor: "border-t-teal-400",
  },
];

export default function Home() {
  return (
    <div className="home-scroll flex flex-col">
      {/* Hero */}
      <section className="gradient-hero -mt-16 flex min-h-svh items-center border-b border-spice-amber/20 pt-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <ScrollReveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-spice-amber/10 px-4 py-1.5 text-sm font-semibold text-spice-amber-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-spice-coral animate-pulse" />
                Ruang Belajar Jalur Rempah
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                Jejak rempah yang menghubungkan{" "}
                <span className="gradient-text-amber">Indonesia</span> dengan{" "}
                <span className="gradient-text-ocean">dunia</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
                Sejak berabad-abad lalu, Nusantara menjadi pusat perdagangan
                rempah dunia. Pelajari sejarah, geografi, budaya, dan warisan
                jalur rempah melalui artikel, video, kuis, dan simulasi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-spice-amber to-spice-coral px-6 py-3 text-sm font-bold text-white shadow-lg shadow-spice-amber/25 transition hover:shadow-xl hover:shadow-spice-amber/30 hover:-translate-y-0.5"
                >
                  Mulai Quiz
                  <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/penjelasan"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-spice-amber/30 bg-white/80 px-6 py-3 text-sm font-bold text-spice-amber-dark backdrop-blur transition hover:bg-spice-amber-light hover:border-spice-amber/50"
                >
                  Baca Penjelasan
                </Link>
              </div>
            </div>
          </ScrollReveal>
          <div className="lg:scale-125">
            <LottieSpiceMap />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="belajar"
        className="home-section gradient-warm flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="section-kicker">Jelajahi pengetahuan</p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              Pilih cara belajarmu
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((f, index) => (
              <ScrollReveal key={f.title} delay={index * 70} className="h-full">
                <Link
                  href={f.href}
                  className={`group flex h-full flex-col rounded-2xl border-2 border-t-4 ${f.border} ${f.bg} bg-white/80 backdrop-blur p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-lg`}>
                      <FontAwesomeIcon icon={f.icon} className="h-5 w-5" />
                    </span>
                    <span className={`text-xs font-bold ${f.text}`}>
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-bold text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {f.description}
                  </p>
                  <span className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${f.text}`}>
                    Pelajari
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-3 w-3 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Route map */}
      <section className="home-section gradient-ocean flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl border-l-4 border-spice-teal pl-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                Rute pelayaran rempah Nusantara
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-neutral-600">
                Dari Maluku sebagai pusat cengkeh dan pala, rempah disebarkan
                melalui jaringan pelayaran ke Sulawesi, Jawa, hingga Sumatera
                sebelum diteruskan ke pasar dunia.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-600">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-spice-teal to-spice-indigo shadow-sm" />
                  Pelabuhan utama
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-0.5 w-6 bg-gradient-to-r from-spice-teal to-spice-indigo rounded-full" />
                  Rute perdagangan
                </span>
              </div>
              <Link
                href="/penjelasan#rute"
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-spice-teal/30 px-5 py-2.5 text-sm font-bold text-spice-teal-dark transition hover:bg-spice-teal-light"
              >
                Baca penjelasan rute
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="home-section gradient-spice flex min-h-svh items-center border-t border-spice-amber/20">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <ScrollReveal>
            <p className="section-kicker">Garis waktu</p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              Perjalanan singkat
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">
              Dari jaringan dagang antarpulau hingga warisan budaya yang masih
              hidup, berikut tiga bab penting dalam perjalanan rempah Nusantara.
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {milestones.map((m, index) => (
              <ScrollReveal key={m.label} delay={index * 100}>
                <div className={`h-full rounded-2xl border-t-4 ${m.borderColor} bg-white/80 backdrop-blur p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white shadow-md`}>
                      <FontAwesomeIcon icon={m.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                      {m.period}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">
                    {m.label}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-neutral-700">
                    {m.text}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {m.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
