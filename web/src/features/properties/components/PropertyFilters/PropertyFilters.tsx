
"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import styles from "./PropertyFilters.module.css";
import { useState } from "react";

type PropertyFiltersProps = {
    filters: {
        listingType: string;
        propertyType: string;
        minPrice: string;
        maxPrice: string;
        city: string;
        locality: string;
        bhk: string;
        furnishing: string;
    };

    setFilters: React.Dispatch<
        React.SetStateAction<{
            listingType: string;
            propertyType: string;
            minPrice: string;
            maxPrice: string;
            city: string;
            locality: string;
            bhk: string;
            furnishing: string;
        }>
    >;
};

const listingTypes = [
    { id: 1, value: "sale", name: "Buy" },
    { id: 2, value: "rent", name: "Rent" },
];

const propertyTypes = [
    { id: 1, value: "", name: "All Types" },
    { id: 2, value: "apartment", name: "Apartment" },
    { id: 3, value: "villa", name: "Villa" },
    { id: 4, value: "house", name: "House" },
    { id: 5, value: "office", name: "Office" },
    { id: 6, value: "shop", name: "Shop" },
    { id: 7, value: "warehouse", name: "Warehouse" },
    { id: 8, value: "land", name: "Land" },
    { id: 9, value: "commercial", name: "Commercial" },
    { id: 10, value: "plot", name: "Plot" },
];

const priceRanges = [
    { id: 1, value: "", name: "Any Price" },
    { id: 2, value: "0-5000000", name: "Under ₹50 Lakh" },
    { id: 3, value: "5000000-10000000", name: "₹50 Lakh - ₹1 Cr" },
    { id: 4, value: "10000000-25000000", name: "₹1 Cr - ₹2.5 Cr" },
    { id: 5, value: "25000000-50000000", name: "₹2.5 Cr - ₹5 Cr" },
    { id: 6, value: "50000000-", name: "₹5 Cr+" },
];

const bhkList = [
    { id: 1, value: "", name: "Any BHK" },
    { id: 2, value: "1", name: "1 BHK" },
    { id: 3, value: "2", name: "2 BHK" },
    { id: 4, value: "3", name: "3 BHK" },
    { id: 5, value: "4", name: "4 BHK" },
    { id: 6, value: "5", name: "5+ BHK" },
];

const furnishingTypes = [
    { id: 1, value: "", name: "Any Furnishing" },
    { id: 2, value: "unfurnished", name: "Unfurnished" },
    { id: 3, value: "semi-furnished", name: "Semi-Furnished" },
    { id: 4, value: "fully-furnished", name: "Fully Furnished" },
];

const PropertyFilters = ({
    filters,
    setFilters,
}: PropertyFiltersProps) => {

    const [searchText, setSearchText] = useState(filters.city || filters.locality || "")

    return (
        <section className={styles.mainContainer}>
            <div className={styles.listingToggle}>
                {listingTypes.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                listingType: item.value,
                            }))
                        }
                        className={`${styles.toggleButton} ${filters.listingType === item.value ? styles.active : ""
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <div className={styles.searchRow}>
                <div className={styles.searchInputWrapper}>
                    <Search
                        size={18}
                        strokeWidth={1.5}
                        className={styles.searchIcon}
                    />

                    <input
                        type="text"
                        placeholder="Search by city or locality"
                        className={styles.searchInput}
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const search = searchText.trim();

                                setFilters((prev) => ({
                                    ...prev,
                                    city: search,
                                    locality: search,
                                }));
                            }
                        }} />
                </div>

                <button
                    type="button"
                    className={styles.searchButton}
                    onClick={()=>{
                        const search=searchText.trim();

                        setFilters((prev)=>({
                            ...prev,
                            city:search,
                            locality:search
                        }))
                    }}
                >
                    <span>Search</span>
                    <Search size={17} strokeWidth={1.5} />
                </button>
            </div>

            <div className={styles.filtersHeader}>
                <div className={styles.filtersTitle}>
                    <SlidersHorizontal
                        size={15}
                        strokeWidth={1.5}
                    />
                    <span>FILTER PROPERTIES</span>
                </div>

                <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() =>
                        setFilters({
                            listingType: "",
                            propertyType: "",
                            minPrice: "",
                            maxPrice: "",
                            city: "",
                            locality: "",
                            bhk: "",
                            furnishing: "",
                        })
                    }
                >
                    Clear Filters
                </button>
            </div>

            <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                    <label htmlFor="propertyType">
                        Property Type
                    </label>

                    <select
                        id="propertyType"
                        value={filters.propertyType}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                propertyType: e.target.value
                            }))
                        }
                    >
                        {propertyTypes.map((item) => (
                            <option
                                key={item.id}
                                value={item.value}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="priceRange">
                        Price Range
                    </label>

                    <select
                        id="priceRange"
                        value={filters.minPrice || filters.maxPrice ?
                            `${filters.minPrice}-${filters.maxPrice}` : ""
                        }
                        onChange={
                            (e) => {
                                const [minPrice = "", maxPrice = ""] = e.target.value.split("-");
                                setFilters((prev) => ({
                                    ...prev, minPrice, maxPrice
                                }))
                            }
                        }
                    >
                        {priceRanges.map((item) => (
                            <option
                                key={item.id}
                                value={item.value}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="bhk">
                        BHK
                    </label>

                    <select
                        id="bhk"
                        value={filters.bhk}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                bhk: e.target.value,
                            }))
                        }
                    >
                        {bhkList.map((item) => (
                            <option
                                key={item.id}
                                value={item.value}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="furnishing">
                        Furnishing
                    </label>

                    <select
                        id="furnishing"
                        value={filters.furnishing}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                furnishing: e.target.value,
                            }))
                        }
                    >
                        {furnishingTypes.map((item) => (
                            <option
                                key={item.id}
                                value={item.value}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
};

export default PropertyFilters;
