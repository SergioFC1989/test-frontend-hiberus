import Image from "next/image";
import styles from "./custom-text-input-search.module.css";

interface CustomTextInputSearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const CustomTextInputSearch = ({
  onChange,
  value
}: CustomTextInputSearchProps) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.iconSearch}
        src="/image/icon-search.svg"
        alt="icon-search-svg"
        width={16}
        height={16}
      />
      <input
        type="text"
        className={styles.textInputSearch}
        placeholder="SEARCH A CHARACTER..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
