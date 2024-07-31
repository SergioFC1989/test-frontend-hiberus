"use client";

import { useEffect, useRef } from "react";
import styles from "./custom-corner-card.module.css";

export const CustomCornerCard = ({
  width = 15,
  height = 15
}: {
  width?: number;
  height?: number;
}) => {
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cornerRef.current) {
      cornerRef.current.style.setProperty("--width-corner", `${width}px`);
      cornerRef.current.style.setProperty("--height-corner", `${height}px`);
    }
  }, [height, width]);

  return (
    <div className={styles.container}>
      <div className={styles.corner} ref={cornerRef}></div>
    </div>
  );
};
