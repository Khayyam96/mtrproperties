"use client";

import { useMemo, useRef, useState } from "react";
import { Typography, Row, Col } from "antd";
import { CaretRightFilled, CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Image from "next/image";

const { Title } = Typography;

export type TVirtualTour = {
  id: string;
  title: string;
  poster?: string;     // optional poster
  videoPath: string;   // local MP4 və ya YouTube/Vimeo URL
};

type Props = {
  tours?: TVirtualTour[];
  className?: string;
};

const defaultTours: TVirtualTour[] = [
  { id: "1", title: "Modern Kitchen Tour", poster: "/yacht.jpg", videoPath: "/tour.mp4" },
];

/* ---------------- Helpers ---------------- */
function isYouTubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function parseYouTubeId(url: string): { id: string | null; start: number } {
  try {
    const u = new URL(url);
    let id: string | null = null;

    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/embed/")[1] || null;
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/shorts/")[1] || null;
    }

    if (u.hostname === "youtu.be") {
      id = (u.pathname || "").replace("/", "") || null;
    }

    let start = 0;
    const t = u.searchParams.get("t") || u.searchParams.get("start");
    if (t) start = parseYouTubeTimeToSeconds(t);

    return { id, start };
  } catch {
    return { id: null, start: 0 };
  }
}

function parseYouTubeTimeToSeconds(t: string): number {
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  let total = 0;
  const h = t.match(/(\d+)h/);
  const m = t.match(/(\d+)m/);
  const s = t.match(/(\d+)s/);
  if (h) total += parseInt(h[1], 10) * 3600;
  if (m) total += parseInt(m[1], 10) * 60;
  if (s) total += parseInt(s[1], 10);
  return total || 0;
}

function toYouTubeEmbed(url: string): string | null {
  const { id, start } = parseYouTubeId(url);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (start > 0) params.set("start", String(start));
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export default function VirtualTours({ tours, className }: Props) {
  const data = useMemo(() => (tours?.length ? tours : defaultTours), [tours]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const active = data.find((t) => t.id === playingId) || null;
  const isActiveYouTube = active ? isYouTubeUrl(active.videoPath) : false;
  const ytEmbed = active && isActiveYouTube ? toYouTubeEmbed(active.videoPath) : null;

  const handlePlay = (id: string) => {
    setPlayingId(id);
    setPaused(false);
  };

  const handleClose = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
    }
    setPlayingId(null);
    setPaused(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const posterSrc = data[0]?.poster || "/yacht.jpg";

  return (
    <section className={classNames("virtual-tours", className)}>
      <div className="vt-container">
        <Title level={3} className="section-title">VIRTUAL TOURS</Title>

        <Row justify="center">
          <Col xs={24} md={22} lg={20} xl={16}>
            <div className={classNames("tour-card", { "is-playing": !!active })}>
              {!active && (
                <>
                  <div className="thumb-wrap">
                    <Image
                      className="thumb"
                      src={posterSrc}
                      alt={data[0]?.title || "Virtual Tour"}
                      fill
                      sizes="(max-width: 576px) 100vw, (max-width: 992px) 90vw, 66vw"
                      priority={false}
                    />
                  </div>

                  <button
                    type="button"
                    className="play-btn"
                    aria-label={`Play ${data[0]?.title || "Virtual Tour"}`}
                    onClick={() => handlePlay(data[0].id)}
                  >
                    <span className="play-circle">
                      <CaretRightFilled className="play-icon" />
                    </span>
                  </button>
                </>
              )}

              {active && (
                <div className="video-wrap">
                  <button
                    type="button"
                    className="close-btn"
                    aria-label="Close video"
                    onClick={handleClose}
                  >
                    <CloseOutlined />
                  </button>

                  {isActiveYouTube && ytEmbed ? (
                    <div className="iframe-ratio">
                      <iframe
                        key={ytEmbed}
                        src={ytEmbed}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={active.title}
                      />
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        key={active.videoPath}
                        src={active.videoPath}
                        autoPlay
                        muted
                        playsInline
                        preload="none"
                        onClick={togglePlay}
                        onPlay={() => setPaused(false)}
                        onPause={() => setPaused(true)}
                        onEnded={handleClose}
                        controls
                      />
                      {paused && (
                        <button
                          type="button"
                          className="center-play"
                          aria-label="Play video"
                          onClick={togglePlay}
                        >
                          <CaretRightFilled className="play-icon" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
