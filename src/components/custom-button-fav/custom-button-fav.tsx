"use client";

import styles from "./custom-button-fav.module.css";

interface CustomButtonFavProps {
  width?: number;
  height?: number;
  disabled?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export const CustomButtonFav = ({
  width = 24,
  height = 24,
  disabled = false,
  isActive = false,
  onClick
}: CustomButtonFavProps) => {
  const _onClick = () => {
    onClick && onClick();
  };

  const stylesIcon = isActive ? styles.iconFilled : styles.iconOutlined;

  return (
    <button
      className={styles.containerButton}
      disabled={disabled}
      onClick={_onClick}
    >
      <svg
        className={stylesIcon}
        height={height}
        viewBox="0 0 24 24"
        width={width}
      >
        <path d="M12 3.86354L6 0.221924L0 3.86354V11.667L12 21.8982L24 11.667V3.86354L18 0.221924L12 3.86354Z" />
      </svg>
    </button>
  );
};
