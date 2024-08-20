import { Loader } from "@/components/loader/loader";
import { ComicPage } from "@/types";
import Image from "next/image";
import styles from "./comic-list.module.css";

interface ComicListProps {
  comics: ComicPage[] | [];
  isLoading?: boolean;
}

export const ComicList = ({ comics, isLoading }: ComicListProps) => {
  console.log(isLoading);
  return (
    <section className={styles.container}>
      <h1>COMICS</h1>
      {isLoading ? (
        <Loader color="dark" />
      ) : (
        <div className={styles.comic}>
          {!comics.length ? (
            <h3>Without comics</h3>
          ) : (
            comics.map((item) => (
              <div key={item.name} className={styles.cardComic}>
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={170}
                  height={270}
                />
                <h3 className={styles.name} title={item.name}>
                  {item.name}
                </h3>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};
