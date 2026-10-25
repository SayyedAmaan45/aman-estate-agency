import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import styles from "./Footer.module.css";

const exploreLinks = [
  { name: "Buy", href: "/buy" },
  { name: "Rent", href: "/rent" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className={styles.mainContainer}>
      <div className={styles.container}>
        {/* Main Footer */}
        <div className={styles.topSection}>
          {/* Brand */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              Aman Estate Agency
            </Link>

            <p className={styles.tagline}>
              A considered approach to finding
              <br className={styles.desktopBreak} />
              exceptional places to live, work and invest.
            </p>

            <Link
              href="/contact"
              className={styles.enquireButton}
            >
              <span>Start an Enquiry</span>

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* Navigation + Contact */}
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <p className={styles.columnTitle}>
                EXPLORE
              </p>

              <nav className={styles.navigation}>
                {exploreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={styles.navLink}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className={styles.contactColumn}>
              <p className={styles.columnTitle}>
                GET IN TOUCH
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <MapPin
                    size={15}
                    strokeWidth={1.4}
                  />

                  <span>
                    Mumbai, Maharashtra
                  </span>
                </div>

                <a
                  href="tel:+919999999999"
                  className={styles.contactItem}
                >
                  <Phone
                    size={15}
                    strokeWidth={1.4}
                  />

                  <span>
                    +91 99999 99999
                  </span>
                </a>

                <a
                  href="mailto:hello@amanestateagency.com"
                  className={styles.contactItem}
                >
                  <Mail
                    size={15}
                    strokeWidth={1.4}
                  />

                  <span>
                    hello@amanestateagency.com
                  </span>
                </a>
              </div>

              <div className={styles.socialLinks}>
                <a
                  href="#"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  IG
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className={styles.socialLink}
                >
                  IN
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Editorial Brand */}
        <div className={styles.brandLine}>
          <span>AMAN</span>
        </div>

        {/* Bottom Footer */}
        <div className={styles.bottomSection}>
          <span>
            © {new Date().getFullYear()} Aman Estate Agency
          </span>

          <div className={styles.legalLinks}>
            <Link href="/privacy">
              Privacy
            </Link>

            <Link href="/terms">
              Terms
            </Link>
          </div>

          <span className={styles.locationText}>
            Mumbai, Maharashtra
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;