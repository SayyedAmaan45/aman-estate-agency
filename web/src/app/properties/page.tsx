"use client";

import PropertyCard from "@/features/properties/components/PropertyCard/PropertyCard";
import { useGetPropertiesQuery } from "@/features/properties/propertyApi";

import styles from "./PropertiesPage.module.css";
import PropertyFilters from "@/features/properties/components/PropertyFilters/PropertyFilters";
import { useState } from "react";
import Pagination from "@/features/properties/components/Pagination/Pagination";

const initialFilter = {
  listingType: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  city: '',
  locality: "",
  bhk: '',
  furnishing: '',
}

const PropertiesPage = () => {
  const [filterVal, setFilterVal] = useState(initialFilter)
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const {
    data: properties,
    isLoading,
    error,
  } = useGetPropertiesQuery({
    listingType: filterVal.listingType,
    propertyType: filterVal.propertyType,
    minPrice: filterVal.minPrice,
    maxPrice: filterVal.maxPrice,
    city: filterVal.city,
    locality: filterVal.locality,
    bhk: filterVal.bhk,
    furnishing: filterVal.furnishing,
    page: currentPage,
    limit: limit,
    sortBy,
    order
  });

  if (isLoading) {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <p className={styles.stateMessage}>
            Loading properties...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <p className={styles.stateMessage}>
            Something went wrong while loading properties.
          </p>
        </div>
      </main>
    );
  }

  const propertyList = properties?.data ?? [];

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <section className={styles.headerSection}>
          <p className={styles.eyebrow}>
            OUR COLLECTION
          </p>

          <h1 className={styles.heading}>
            Find a place
            <br />
            worth calling home.
          </h1>

          <p className={styles.description}>
            Explore thoughtfully selected properties across
            residential and commercial spaces.
          </p>
        </section>


        <section className={styles.propertiesSection}>

          <PropertyFilters
            filters={filterVal}
            setFilters={(nextFilters) => {
              setFilterVal(nextFilters);
              setCurrentPage(1);
            }}
          />

          <div className={styles.resultsHeader}>
            <select
              className={styles.sortSelect}
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [nextSortBy, nextOrder] = e.target.value.split("-");
                setSortBy(nextSortBy);
                setOrder(nextOrder);
                setCurrentPage(1);
              }}
              aria-label="Sort properties"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-asc">Area: Small to Large</option>
              <option value="area-desc">Area: Large to Small</option>
            </select>
            <p className={styles.resultsCount}>
              {propertyList.length}{" "}
              {propertyList.length === 1
                ? "Property"
                : "Properties"}
            </p>
          </div>

          {propertyList.length === 0 ? (
            <p className={styles.stateMessage}>
              No properties found.
            </p>
          ) : (
            <>
              <div className={styles.propertyGrid}>
                {propertyList.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
              <div>
                {properties?.pagination && (
                  <Pagination
                    currentPage={properties.pagination.currentPage}
                    totalPages={properties.pagination.totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default PropertiesPage;