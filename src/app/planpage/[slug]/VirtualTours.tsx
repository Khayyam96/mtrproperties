"use client";

import { useMemo, useRef, useState } from "react";
import { Typography, Row, Col } from "antd";
import { CaretRightFilled, CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";

const { Title } = Typography;

export type TVirtualTour = {
  id: string;
  title: string;
  poster: string;
  videoPath: string;
};

type Props = {
  tours?: TVirtualTour[];
  className?: string;
};

const defaultTours: TVirtualTour[] = [
  {
    id: "1",
    title: "Modern Kitchen Tour",
    poster: "/yacht.jpg",
    videoPath: "/tour.mp4",
  },
];

export default function VirtualTours({ tours, className }: Props) {
  const data = useMemo(() => (tours?.length ? tours : defaultTours), [tours]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const active = data.find((t) => t.id === playingId) || null;

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

  return (
    <section className={classNames("virtual-tours", className)}>
      <div className="vt-container">
        <Title level={3} className="section-title">
          VIRTUAL TOURS
        </Title>

        <Row justify="center">
          <Col xs={24} md={22} lg={20} xl={16}>
            <div className={classNames("tour-card", { "is-playing": !!active })}>
              {!active && (
                <>
                  <img
                    className="thumb"
                    src={data[0].poster}
                    alt={data[0].title}
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="play-btn"
                    aria-label={`Play ${data[0].title}`}
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
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
