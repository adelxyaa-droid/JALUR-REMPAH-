"use client";

import dynamic from "next/dynamic";

const RealSpiceMap = dynamic(() => import("./RealSpiceMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[28rem] w-full animate-pulse rounded-2xl bg-spice-teal-light/50 sm:h-[34rem]" />
  ),
});

export default function LottieSpiceMap() {
  return <RealSpiceMap />;
}
