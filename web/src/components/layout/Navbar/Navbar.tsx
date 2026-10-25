"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navbarItems = [
    {
        id: 1,
        name: "Buy",
        value: "/buy",
    },
    {
        id: 2,
        name: "Rent",
        value: "/rent",
    },
    {
        id: 3,
        name: "Properties",
        value: "/properties",
    },
    {
        id: 4,
        name: "About",
        value: "/about",
    },
    {
        id: 5,
        name: "Contact",
        value: "/contact",
    },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";


        return () => {
            document.body.style.overflow = "";
        };


    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={styles.mainContainer}> <div className={styles.navbarInner}>
            {/* Logo */}
            <div className={styles.logoSection}> <Link href="/" className={styles.logoText} onClick={closeMenu}>
                Aman Estate Agency </Link> </div>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNavigation}>
                {navbarItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.value}
                        className={styles.navOption}
                    >
                        {item.name}
                    </Link>
                ))}

                <Link href="/contact" className={styles.enquireButton}>
                    <span>Enquire Now</span>
                    <ArrowUpRight size={16} strokeWidth={1.8} />
                </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
                type="button"
                className={styles.menuButton}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? (
                    <X size={24} strokeWidth={1.7} />
                ) : (
                    <Menu size={24} strokeWidth={1.7} />
                )}
            </button>
        </div>

            {/* Mobile Navigation */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""
                    }`}
            >
                <nav className={styles.mobileNavigation}>
                    {navbarItems.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.value}
                            className={styles.mobileNavOption}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileNavNumber}>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className={styles.mobileNavName}>{item.name}</span>

                            <ArrowUpRight
                                className={styles.mobileNavArrow}
                                size={20}
                                strokeWidth={1.5}
                            />
                        </Link>
                    ))}

                    <Link
                        href="/contact"
                        className={styles.mobileEnquireButton}
                        onClick={closeMenu}
                    >
                        <span>Enquire Now</span>
                        <ArrowUpRight size={18} strokeWidth={1.7} />
                    </Link>
                </nav>

                <div className={styles.mobileMenuFooter}>
                    <span>Mumbai, Maharashtra</span>
                    <span>Aman Estate Agency</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
