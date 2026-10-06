import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { galleryCategories, galleryItems } from '../data/gallery.ts';
import type { GalleryCategory } from '../data/gallery.ts';
import { asset } from '../lib/assets.ts';

type Filter = 'All' | GalleryCategory;

export function MemeGallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible =
    filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter);
  const active = activeIndex === null ? null : visible[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  function chooseFilter(next: Filter) {
    setFilter(next);
    setActiveIndex(null);
  }

  function step(delta: number) {
    setActiveIndex((current) => {
      if (current === null || visible.length === 0) return current;
      return (current + delta + visible.length) % visible.length;
    });
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  function onDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  }

  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 id="gallery-title">MEME GALLERY</h2>
        <div className="filters" role="toolbar" aria-label="Meme categories">
          {(['All', ...galleryCategories] as const).map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? 'filter is-active' : 'filter'}
              aria-pressed={filter === category}
              onClick={() => chooseFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="masonry">
          {visible.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className="masonry-item"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={asset(item.src)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
              <span>{item.category}</span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby="lightbox-title"
        onClose={() => setActiveIndex(null)}
        onClick={onDialogClick}
        onKeyDown={onDialogKey}
      >
        {active ? (
          <div className="lightbox-body">
            <button type="button" className="lightbox-close" onClick={() => dialogRef.current?.close()}>
              <X aria-hidden="true" />
              <span className="sr-only">Close gallery</span>
            </button>
            <img src={asset(active.src)} alt={active.alt} width={active.width} height={active.height} />
            <div className="lightbox-meta">
              <h3 id="lightbox-title">{active.title}</h3>
              <p>{active.category}</p>
            </div>
            <div className="lightbox-nav">
              <button type="button" className="btn btn-secondary" onClick={() => step(-1)}>
                <ChevronLeft aria-hidden="true" />
                Previous
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => step(1)}>
                Next
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
