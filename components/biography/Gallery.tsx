"use client";

import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  ImageOff,
  Images,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryCategories, galleryItems } from "@/data/swayam-sharma";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Id of the tile that opened the viewer, so focus can be restored to it. */
  const [triggerId, setTriggerId] = useState<string | null>(null);

  const categories = useMemo(() => ["All", ...galleryCategories], []);

  // Compute item counts per category for badge counters
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: galleryItems.length };
    for (const cat of galleryCategories) {
      counts[cat] = galleryItems.filter((i) => i.category === cat).length;
    }
    return counts;
  }, []);

  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const lightboxItem =
    lightboxIndex === null ? null : (visibleItems[lightboxIndex] ?? null);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((index) =>
      index === null
        ? index
        : (index - 1 + visibleItems.length) % visibleItems.length,
    );
  }, [visibleItems.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? index : (index + 1) % visibleItems.length,
    );
  }, [visibleItems.length]);

  useEffect(() => {
    if (!lightboxItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        goToNext();
        return;
      }
      if (event.key === "ArrowLeft") {
        goToPrevious();
        return;
      }
      // Keep Tab focus inside the dialog while it is open.
      if (event.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => !element.hasAttribute("disabled"));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // Return focus to the tile that opened the viewer.
      if (triggerId) {
        document.getElementById(triggerId)?.focus();
      }
    };
  }, [lightboxItem, goToNext, goToPrevious, triggerId]);

  return (
    <div className="mt-8">
      {/* Category filter pills */}
      <div
        className="flex flex-wrap items-center gap-2.5 pb-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {categories.map((category) => {
          const isSelected = activeCategory === category;
          const count = categoryCounts[category] ?? 0;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
                setTriggerId(null);
              }}
              aria-pressed={isSelected}
              className={`group inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm ${
                isSelected
                  ? "border-accent bg-accent text-white shadow-md shadow-accent/25"
                  : "border-border/80 bg-surface/90 text-foreground-muted hover:border-accent/40 hover:bg-surface hover:text-foreground"
              }`}
            >
              <span>{category}</span>
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-surface-soft text-foreground-muted group-hover:text-accent-ink"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.id} className="flex">
            <figure className="group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-border/80 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
              <button
                type="button"
                id={`gallery-tile-${item.id}`}
                onClick={() => {
                  setTriggerId(`gallery-tile-${item.id}`);
                  setLightboxIndex(index);
                }}
                aria-label={`Open image: ${item.caption}`}
                className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                {/* Photo frame with smooth zoom and overlays */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover ${item.objectPosition ?? "object-[center_24%]"} transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
                      />
                      {/* Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />

                      {/* Top floating badges */}
                      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-md shadow-xs">
                          <Camera className="h-3 w-3 text-white/80" />
                          <span className="max-w-[170px] truncate sm:max-w-[200px]">
                            {item.category.replace(/—.*/, "").trim()}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-accent group-hover:scale-105"
                        >
                          <Expand className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      {/* Bottom image metadata badge */}
                      {item.date ? (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm border border-white/10">
                          <Calendar className="h-3 w-3 text-accent" />
                          <span>{item.date}</span>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-soft px-4 text-center">
                      <ImageOff className="h-8 w-8 text-foreground-faint" aria-hidden="true" />
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground-muted">
                        Photo pending
                      </p>
                    </div>
                  )}
                </div>

                {/* Card textual details */}
                <figcaption className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-accent-ink">
                      {item.category}
                    </p>
                    <h3 className="mt-1.5 font-heading text-base font-extrabold leading-snug text-foreground transition-colors group-hover:text-accent-deep sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium leading-relaxed text-foreground-muted sm:text-sm line-clamp-2">
                      {item.caption}
                    </p>
                  </div>

                  {/* Card footer CTA */}
                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs font-bold text-foreground-muted">
                    <span className="inline-flex items-center gap-1.5 text-accent-ink group-hover:text-accent transition-colors">
                      <span>View Photograph</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="rounded-md bg-surface-soft px-2 py-0.5 text-[10px] font-semibold text-foreground-muted">
                      HD Photo
                    </span>
                  </div>
                </figcaption>
              </button>
            </figure>
          </li>
        ))}
      </ul>

      {visibleItems.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface-soft/60 p-8 text-center">
          <p className="text-sm font-semibold text-foreground-muted">
            No photographs have been added for this category yet.
          </p>
        </div>
      ) : null}

      {/* PREMIUM LIGHTBOX MODAL */}
      {lightboxItem ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.caption}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-6 lg:p-8 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] border border-white/15 bg-surface-deep text-white shadow-2xl backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold text-white">
                  Photo {(lightboxIndex ?? 0) + 1} of {visibleItems.length}
                </span>
                <span className="hidden text-xs text-white/70 sm:inline">
                  {lightboxItem.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Arrow navigation buttons in header */}
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous photograph"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next photograph"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close image viewer"
                  className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Stage */}
            <div className="relative flex min-h-[320px] max-h-[64vh] w-full flex-1 items-center justify-center bg-black/60 sm:min-h-[460px]">
              {lightboxItem.image ? (
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain p-2 sm:p-4"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <Images className="h-10 w-10 text-white/40" aria-hidden="true" />
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/75">
                    Photograph not yet supplied
                  </p>
                  <p className="max-w-sm text-xs leading-6 text-white/60">
                    This image is reserved for {lightboxItem.caption.toLowerCase()}.
                  </p>
                </div>
              )}

              {/* Side Floating Next/Previous Buttons on Desktop */}
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent sm:flex"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent sm:flex"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Caption & Details Footer */}
            <div className="border-t border-white/10 bg-surface-deep/95 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-heading text-base font-extrabold text-white sm:text-lg">
                  {lightboxItem.title}
                </p>
                {lightboxItem.date ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-accent">
                    <Calendar className="h-3 w-3" />
                    {lightboxItem.date}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-white/75 sm:text-sm">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
