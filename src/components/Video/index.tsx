import React, { useRef, useEffect, useState } from "react";
import styles  from "./styles.module.css";

interface VideoPlayerProps {
  src: string;
  className?: string;
  pause?: boolean;
  cacheKey?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export const Video: React.FC<VideoPlayerProps> = ({
  src,
  cacheKey = "video-cache",
  pause = false,
  className = "",
  ...options
}: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStateManage = () => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("error", (event: any) => {
      console.error("Error al cargar el video:", event);
    });
    video.addEventListener("pause", () => {
      // if (!video.ended) {
      //   video.play();
      // }
    });
  };
  useEffect(() => {
    videoStateManage();
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (pause) {
      videoRef.current.pause();
      return;
    }
    videoRef.current.play();
  }, [videoRef, pause]);

  return (
    <div className={styles.video_container}>
      <video className={className} ref={videoRef} {...options}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};
