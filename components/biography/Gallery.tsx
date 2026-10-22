"use client";

import Image from "next/image";
import { ImageOff, Images, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryCategories, galleryItems } from "@/data/swayam-sharma";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Id of the tile that opened the viewer, so focus can be restored to it. */
  const [triggerId, setTriggerId] = useState<string | null>(null);

  const categories = useMemo(() => ["All", ...galleryCategories], []);

  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const lightboxItem =
    lightboxIndex === null ? null : (visibleItems[lightboxIndex] ?? null);

  useEffect(() => {
    if (!lightboxItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex(
          (index) =>
            index === null ? index : (index + 1) % visibleItems.length,
        );
        return;
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (index) =>
            index === null
              ? index
              : (index - 1 + visibleItems.length) % visibleItems.length,
        );
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
  }, [lightboxItem, visibleItems.length, triggerId]);

  return (
    <div className="mt-8">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setLightboxIndex(null);
              setTriggerId(null);
            }}
            aria-pressed={activeCategory === category}
            className={`min-h-11 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activeCategory === category
                ? "border-accent bg-accent text-white shadow-sm shadow-accent/25"
                : "border-border bg-surface text-foreground-muted hover:border-accent hover:text-accent-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.id}>
            <figure className="group overflow-hidden rounded-card border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <button
                type="button"
                id={`gallery-tile-${item.id}`}
                onClick={() => {
                  setTriggerId(`gallery-tile-${item.id}`);
                  setLightboxIndex(index);
                }}
                aria-label={`Open image: ${item.caption}`}
                className="block w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-soft px-4 text-center">
                      <ImageOff className="h-8 w-8 text-foreground-faint" aria-hidden="true" />
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground-muted">
                        Photo pending
                      </p>
                    </div>
                  )}
                </div>
              </button>
              <figcaption className="px-4 py-3">
                <p className="text-sm font-bold leading-6 text-foreground">
                  {item.caption}
                </p>
                <p className="mt-1 text-xs font-semibold text-foreground-muted">
                  {item.category}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {visibleItems.length === 0 ? (
        <p className="mt-6 text-sm font-semibold text-foreground-muted">
          No photographs have been added for this category yet.
        </p>
      ) : null}
      {/* LIGHTBOX */}
      {lightboxItem ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-deep/92 p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-card bg-surface shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image viewer"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface/92 text-foreground shadow-md backdrop-blur transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-surface-soft">
              {lightboxItem.image ? (
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface-soft px-6 text-center">
                  <Images className="h-10 w-10 text-foreground-faint" aria-hidden="true" />
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-foreground-muted">
                    Photograph not yet supplied
                  </p>
                  <p className="max-w-sm text-sm leading-6 text-foreground-muted">
                    This image is reserved for {lightboxItem.caption.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
            <div className="px-5 py-4 sm:px-6">
              <p className="font-heading text-lg font-bold text-foreground">
                {lightboxItem.caption}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground-muted">
                {lightboxItem.category}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
