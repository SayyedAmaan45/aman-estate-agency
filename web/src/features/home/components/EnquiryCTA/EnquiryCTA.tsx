import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import styles from "./EnquiryCTA.module.css";

const EnquiryCTA = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>LET'S TALK</p>

          <h2 className={styles.heading}>
            Let&apos;s find a place
            <br />
            that feels right.
          </h2>

          <p className={styles.description}>
            Whether you are looking for a new home, an investment,
            or the right commercial space, we are here to help.
          </p>

          <Link href="/contact" className={styles.button}>
            <span>Enquire Now</span>

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className={styles.footerLine}>
          <span>Mumbai, Maharashtra</span>
          <span>Aman Estate Agency</span>
        </div>
      </div>
    </section>
  );
};

export default EnquiryCTA;