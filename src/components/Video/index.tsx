import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.css";

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
  const [loaded, setLoaded] = useState(false);
  const videoStateManage = () => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("loadeddata", () => {
      video.style.opacity = "1";
      setLoaded(true);
    });
    video.addEventListener("error", (event: any) => {
      console.error("Error al cargar el video:", event);
    });
    video.addEventListener("pause", () => {
      if (!video.ended) {
        !pause && video.play();
      }
    });
  };
  useEffect(() => {
    videoStateManage();
  }, [videoRef]);

  useEffect(() => {
    if (!loaded) return;
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (pause) {
      setTimeout(() => video.pause(), 2000);
      video.style.opacity = "0";
      return;
    }
    video.play();
    video.style.opacity = "1";
  }, [videoRef, pause]);

  return (
    <div className={styles.video_container}>
      <video className={className} ref={videoRef} {...options}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};
