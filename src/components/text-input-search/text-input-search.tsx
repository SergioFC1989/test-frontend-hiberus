import Image from "next/image";
import styles from "./text-input-search.module.css";

interface TextInputSearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

export const TextInputSearch = ({
  onChange,
  onKeyUp,
  value
}: TextInputSearchProps) => {
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
        data-testId="search-input"
        className={styles.textInputSearch}
        placeholder="SEARCH A CHARACTER..."
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};
