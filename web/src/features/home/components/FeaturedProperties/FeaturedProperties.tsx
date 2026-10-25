"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useGetPropertiesQuery } from "@/features/properties/propertyApi";
import PropertyCard from "@/features/properties/components/PropertyCard/PropertyCard";

import styles from "./FeaturedProperties.module.css";

const FeaturedProperties = () => {
  const { data, isLoading, error } = useGetPropertiesQuery({

  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const properties = data?.data ?? [];

  //  RESPONSIVE CARD COUNT

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 768) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1000) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  //  CAROUSEL LIMIT

  const maxIndex = Math.max(
    properties.length - visibleCards,
    0
  );

  //  KEEP INDEX VALID

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  //  PREVIOUS

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  //  NEXT

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, maxIndex)
    );
  };

  //  TOUCH START

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
  };

  //  TOUCH MOVE

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current = event.touches[0].clientX;
  };

  //  TOUCH END

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  //  LOADING

  if (isLoading) {
    return (
      <section className={styles.mainContainer}>
        <div className={styles.container}>
          <p className={styles.loadingText}>
            Loading properties...
          </p>
        </div>
      </section>
    );
  }

  //  ERROR

  if (error) {
    return (
      <section className={styles.mainContainer}>
        <div className={styles.container}>
          <p className={styles.errorText}>
            Unable to load properties.
          </p>
        </div>
      </section>
    );
  }


  //  EMPTY

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>

        {/* SECTION HEADER */}

        <div className={styles.sectionHeader}>
          <div className={styles.headingSection}>
            <p className={styles.eyebrow}>
              OUR COLLECTION
            </p>

            <h2 className={styles.heading}>
              Featured Properties
            </h2>

            <p className={styles.description}>
              Exceptional spaces, carefully selected
              for the way you want to live.
            </p>
          </div>

          <Link
            href="/properties"
            className={styles.viewAll}
          >
            <span>View All Properties</span>

            <ArrowRight
              size={16}
              strokeWidth={1.7}
            />
          </Link>
        </div>

        {/*  CAROUSEL */}

        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.carouselTrack}
            style={
              {
                "--carousel-index": currentIndex,
              } as React.CSSProperties
            }
          >
            {properties.map((property) => (
              <div
                key={property._id}
                className={styles.carouselItem}
              >
                <PropertyCard
                  property={property}
                />
              </div>
            ))}
          </div>

          {/* PREVIOUS BUTTON  */}

          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous properties"
            className={`${styles.controlButton} ${styles.previousButton}`}
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.6}
            />
          </button>

          {/* NEXT BUTTON */}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next properties"
            className={`${styles.controlButton} ${styles.nextButton}`}
          >
            <ArrowRight
              size={18}
              strokeWidth={1.6}
            />
          </button>
        </div>

        {/* CAROUSEL FOOTER */}

        <div className={styles.carouselFooter}>
          <div className={styles.carouselProgress}>
            <span>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>

            <span className={styles.progressLine} />

            <span>
              {String(properties.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;