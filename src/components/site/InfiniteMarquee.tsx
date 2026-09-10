"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";

export default function InfiniteMarquee({
  children,
  duration = 42,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  const copies = [0, 1].map((copy) =>
    Children.map(children, (child, i) =>
      isValidElement(child)
        ? cloneElement(child, { key: `${copy}-${i}` })
        : child
    )
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[var(--marquee-fade)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[var(--marquee-fade)] to-transparent" />
      <div
        className="flex w-max gap-5 sm:gap-6 py-2 hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animation: `marquee-left ${duration}s linear infinite` }}
      >
        {copies.map((copy, i) => (
          <div key={i} className="flex gap-5 sm:gap-6">
            {copy}
          </div>
        ))}
      </div>
    </div>
  );
}
