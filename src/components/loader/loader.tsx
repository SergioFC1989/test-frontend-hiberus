"use client";

import { useEffect, useRef } from "react";
import styles from "./loader.module.css";

export const Loader = ({ color }: { color: "dark" | "light" }) => {
  const colorRef = useRef<HTMLSpanElement>(null);
  const _color = color === "dark" ? "black" : "white";

  useEffect(() => {
    if (colorRef.current) {
      colorRef.current.style.setProperty("--color-loader", _color);
    }
  }, [_color]);

  return <span ref={colorRef} className={styles.loader}></span>;
};
