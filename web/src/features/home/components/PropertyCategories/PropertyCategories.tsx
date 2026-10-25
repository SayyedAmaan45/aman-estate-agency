import Link from "next/link";
import Image from "next/image";

import styles from "./PropertyCategories.module.css";

const categoriesList = [
  {
    id: 1,
    name: "APARTMENTS",
    value: "apartments",
    image: "/images/categories/apartment.jpg",
  },
  {
    id: 2,
    name: "VILLAS",
    value: "villas",
    image: "/images/categories/villa.jpg",
  },
  {
    id: 3,
    name: "HOUSES",
    value: "houses",
    image: "/images/categories/house.jpg",
  },
  {
    id: 4,
    name: "COMMERCIAL",
    value: "commercial",
    image: "/images/categories/commercial.jpg",
  },
];

const PropertyCategories = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>

        <p className={styles.eyebrow}>
          PROPERTY CATEGORIES
        </p>

        <div className={styles.introduction}>
          <div className={styles.headingSection}>
            <h2 className={styles.heading}>
              Find the right space
              <br />
              for the way you live.
            </h2>

            <p className={styles.description}>
              Explore thoughtfully selected properties across
              residential and commercial spaces.
            </p>
          </div>
        </div>

        <div className={styles.categoryGrid}>
          {categoriesList.map((category) => (
            <Link
              key={category.id}
              href={`/properties?type=${category.value}`}
              className={styles.categoryCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />

                <div className={styles.imageOverlay} />

                <div className={styles.categoryContent}>
                  <span className={styles.categoryNumber}>
                    {String(category.id).padStart(2, "0")}
                  </span>

                  <span className={styles.categoryName}>
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PropertyCategories;
