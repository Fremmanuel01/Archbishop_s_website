"use client";
import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { urlFor } from "@/lib/sanity/image";
import { getYouTubeId, formatDate } from "@/lib/utils";

interface VideoItem {
  _id: string;
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnail?: object;
  videoUrl?: string;
  videoFile?: { asset?: { url?: string } };
}

interface Props {
  items: VideoItem[];
  locale: string;
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function buildEmbedUrl(url: string): string | null {
  const yt = getYouTubeId(url);
  if (yt) return `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0`;
  const vm = getVimeoId(url);
  if (vm) return `https://player.vimeo.com/video/${vm}?autoplay=1`;
  return null;
}

export default function VideoGrid({ items, locale }: Props) {
  const [active, setActive] = useState<VideoItem | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-center text-navy/60 py-20">
        No videos available yet.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((video) => {
          const thumb = video.thumbnail
            ? urlFor(video.thumbnail).width(640).height(360).format("webp").url()
            : null;
          const ytId = video.videoUrl ? getYouTubeId(video.videoUrl) : null;
          const fallbackThumb = ytId
            ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`
            : null;
          const imgSrc = thumb ?? fallbackThumb;

          return (
            <button
              key={video._id}
              onClick={() => setActive(video)}
              className="card-surface group overflow-hidden text-left"
              aria-label={`Play ${video.title}`}
            >
              <div className="aspect-video overflow-hidden bg-[#f5f0e8] relative">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-4xl text-gold/20">▶</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-navy text-xl ml-1">▶</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                {video.publishedAt && (
                  <p className="text-[10px] text-navy/60 mb-2">
                    {formatDate(video.publishedAt, locale)}
                  </p>
                )}
                <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors line-clamp-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-xs text-navy/60 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 animate-fade-in" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
              <Dialog.Title className="font-heading text-2xl text-cream mb-3">
                {active?.title}
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                Video player
              </Dialog.Description>
              <div className="relative aspect-video bg-black border border-gold/30 shadow-gold">
                {active?.videoUrl && buildEmbedUrl(active.videoUrl) ? (
                  <iframe
                    src={buildEmbedUrl(active.videoUrl)!}
                    title={active.title}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : active?.videoFile?.asset?.url ? (
                  <video
                    src={active.videoFile.asset.url}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-cream/70">
                    No playable source
                  </div>
                )}
              </div>
              <Dialog.Close className="mt-4 text-[10px] uppercase tracking-widest text-cream/80 hover:text-gold transition-colors">
                Close ✕
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
