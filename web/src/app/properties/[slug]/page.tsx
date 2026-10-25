"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetPropertyBySlugQuery } from "@/features/properties/propertyApi";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

export default function PropertyDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const {
    data: response,
    isLoading,
    isError,
  } = useGetPropertyBySlugQuery(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const property = response?.data;
  const images = property?.images ?? [];

  const getImageUrl = (image: string) =>
    image.startsWith("http")
      ? image
      : `http://localhost:5000${image.startsWith("/") ? "" : "/"}${image}`;

  const showPreviousImage = useCallback(() => {
    setActiveImage((current) =>
      current <= 0 ? images.length - 1 : current - 1
    );
  }, [images.length]);

  const showNextImage = useCallback(() => {
    setActiveImage((current) =>
      current >= images.length - 1 ? 0 : current + 1
    );
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, showPreviousImage, showNextImage]);

  useEffect(() => {
    setActiveImage(0);
    setIsLightboxOpen(false);
  }, [slug]);

  if (isLoading) {
    return (
      <main className={styles.statePage}>
        <p>Loading property details...</p>
      </main>
    );
  }

  if (isError || !property) {
    return (
      <main className={styles.statePage}>
        <h1>Property not found</h1>
        <p>The property may have been removed or the link may be incorrect.</p>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(property.price);

  const amenities = property.amenities ?? [];

  return (
    <main className={styles.detailsPage}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/properties">Properties</a>
        <span>/</span>
        <span className={styles.currentBreadcrumb}>{property.title}</span>
      </nav>

      {/* Interactive Property Gallery */}
      <section className={styles.gallerySection} aria-label="Property images">
        {images.length > 0 ? (
          <>
            <div className={styles.galleryGrid}>
              <button
                type="button"
                className={`${styles.galleryImage} ${styles.mainImage}`}
                onClick={() => setIsLightboxOpen(true)}
                aria-label={`View image ${activeImage + 1} of ${images.length}`}
              >
                <img
                  src={getImageUrl(images[activeImage])}
                  alt={`${property.title} - Image ${activeImage + 1}`}
                  fetchPriority="high"
                />
                <span className={styles.viewImageLabel}>
                  <span aria-hidden="true">⤢</span>
                  View gallery
                </span>
              </button>

              <div className={styles.thumbnailGrid}>
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`${styles.galleryImage} ${styles.thumbnail} ${
                      activeImage === index ? styles.activeThumbnail : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={activeImage === index}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${property.title} thumbnail ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.galleryFooter}>
              <span>
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className={styles.allPhotosButton}
              >
                View all {images.length} photos <span aria-hidden="true">↗</span>
              </button>
            </div>

            {isLightboxOpen && (
              <div
                className={styles.lightbox}
                role="dialog"
                aria-modal="true"
                aria-label="Property image gallery"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setIsLightboxOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={styles.closeLightbox}
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close gallery"
                >
                  ×
                </button>

                <span className={styles.lightboxCounter}>
                  {activeImage + 1} / {images.length}
                </span>

                {images.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.lightboxArrow} ${styles.previousArrow}`}
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}

                <img
                  className={styles.lightboxImage}
                  src={getImageUrl(images[activeImage])}
                  alt={`${property.title} - Image ${activeImage + 1}`}
                />

                {images.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.lightboxArrow} ${styles.nextArrow}`}
                    onClick={showNextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={styles.galleryFallback}>
            <span>AMAN ESTATE AGENCY</span>
            <p>Images coming soon</p>
          </div>
        )}
      </section>

      {/* Property Overview */}
      <section className={styles.overviewSection}>
        <div className={styles.overviewHeader}>
          <div className={styles.propertyInfo}>
            <span className={styles.listingType}>
              For {property.listingType}
            </span>

            <h1 className={styles.propertyTitle}>{property.title}</h1>

            <p className={styles.propertyLocation}>
              <span aria-hidden="true">⌖</span>
              {property.locality}, {property.city}
            </p>

            <p className={styles.propertyAddress}>{property.address}</p>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>
              {property.listingType === "rent" ? "Monthly Rent" : "Asking Price"}
            </span>
            <p className={styles.propertyPrice}>{formattedPrice}</p>
            {property.listingType === "rent" && (
              <span className={styles.priceNote}>per month</span>
            )}
          </div>
        </div>

        <div className={styles.propertySpecs}>
          {property.bhk !== undefined && (
            <div className={styles.specItem}>
              <span className={styles.specIcon} aria-hidden="true">⌂</span>
              <div>
                <span className={styles.specValue}>{property.bhk} BHK</span>
                <span className={styles.specLabel}>Bedrooms</span>
              </div>
            </div>
          )}

          {property.bathrooms !== undefined && (
            <div className={styles.specItem}>
              <span className={styles.specIcon} aria-hidden="true">◷</span>
              <div>
                <span className={styles.specValue}>{property.bathrooms}</span>
                <span className={styles.specLabel}>Bathrooms</span>
              </div>
            </div>
          )}

          <div className={styles.specItem}>
            <span className={styles.specIcon} aria-hidden="true">↔</span>
            <div>
              <span className={styles.specValue}>
                {property.area.toLocaleString("en-IN")}
              </span>
              <span className={styles.specLabel}>Area (sq. ft.)</span>
            </div>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specIcon} aria-hidden="true">◇</span>
            <div>
              <span className={styles.specValue}>
                {property.furnishing.replace("-", " ")}
              </span>
              <span className={styles.specLabel}>Furnishing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description and Enquiry */}
      <section className={styles.detailsContent}>
        <div className={styles.descriptionSection}>
          <span className={styles.sectionEyebrow}>PROPERTY DETAILS</span>
          <h2 className={styles.sectionTitle}>About this property</h2>

          <p className={styles.descriptionText}>
            {property.description || "Property description is not available yet."}
          </p>

          {amenities.length > 0 && (
            <div className={styles.amenitiesSection}>
              <h3 className={styles.subheading}>Features & amenities</h3>
              <ul className={styles.amenitiesList}>
                {amenities.map((amenity, index) => (
                  <li key={`${amenity}-${index}`}>
                    <span aria-hidden="true">✓</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className={styles.enquirySection}>
          <span className={styles.sectionEyebrow}>TAKE THE NEXT STEP</span>
          <h2>Interested in this property?</h2>
          <p>
            Connect with our team to learn more or arrange a property visit.
          </p>

          <a
            className={styles.enquiryButton}
            href={`mailto:info@amanestate.com?subject=${encodeURIComponent(
              `Property enquiry: ${property.title}`
            )}&body=${encodeURIComponent(
              `Hello Aman Estate Agency,\n\nI am interested in ${property.title} located in ${property.locality}, ${property.city}.\n\nPlease share more details.`
            )}`}
          >
            Enquire about property <span aria-hidden="true">↗</span>
          </a>

          <p className={styles.enquiryNote}>
            Mention the property name when contacting us.
          </p>
        </aside>
      </section>
    </main>
  );
}