import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  MapPin,
  Ruler,
} from "lucide-react";

import type { Property } from "@/features/properties/property.types";

import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  const imageUrl = property.images?.[0]
    ? `http://localhost:5000${property.images[0]}`
    : "/images/property-placeholder.jpg";

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(property.price);

  const listingLabel =
    property.listingType === "sale" ? "For Sale" : "For Rent";

  const propertyTypeLabel = property.propertyType
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <article className={styles.card}>
      <Link
        href={`/properties/${property.slug}`}
        className={styles.imageWrapper}
      >
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 90vw, (max-width: 1000px) 50vw, 33vw"
          className={styles.propertyImage}
        />

        <div className={styles.imageOverlay} />

        <div className={styles.imageTop}>
          <span className={styles.listingBadge}>{listingLabel}</span>

          <span className={styles.imageArrow}>
            <ArrowUpRight size={19} strokeWidth={1.5} />
          </span>
        </div>

        <div className={styles.imageBottom}>
          <span className={styles.status}>
            {property.status.replace("-", " ")}
          </span>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.propertyMeta}>
          <span className={styles.propertyType}>
            {propertyTypeLabel}
          </span>

          <span className={styles.metaLine} />
        </div>

        <Link
          href={`/properties/${property.slug}`}
          className={styles.title}
        >
          {property.title}
        </Link>

        <div className={styles.location}>
          <MapPin size={14} strokeWidth={1.5} />
          <span>
            {property.locality}, {property.city}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.detailsRow}>
          {property.bhk !== undefined && (
            <div className={styles.detail}>
              <BedDouble size={15} strokeWidth={1.5} />
              <span>{property.bhk} BHK</span>
            </div>
          )}

          {property.bathrooms !== undefined && (
            <div className={styles.detail}>
              <Bath size={15} strokeWidth={1.5} />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}

          <div className={styles.detail}>
            <Ruler size={14} strokeWidth={1.5} />
            <span>{property.area} sq.ft</span>
          </div>
        </div>

        <div className={styles.priceRow}>
          <div>
            <span className={styles.priceLabel}>
              {property.listingType === "sale" ? "Price" : "Monthly Rent"}
            </span>

            <div className={styles.price}>
              ₹{formattedPrice}
              {property.listingType === "rent" && (
                <span className={styles.priceSuffix}> / month</span>
              )}
            </div>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className={styles.viewButton}
            aria-label={`View ${property.title}`}
          >
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;