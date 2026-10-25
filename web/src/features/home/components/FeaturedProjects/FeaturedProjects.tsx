import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./FeaturedProjects.module.css";

const FeaturedProjects = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.headingSection}>
            <p className={styles.eyebrow}>
              FEATURED PROJECTS
            </p>

            <h2 className={styles.heading}>
              Spaces with character.
              <br />
              Places with a story.
            </h2>

            <p className={styles.description}>
              Discover thoughtfully designed spaces where
              architecture, location and lifestyle come together.
            </p>
          </div>
        </div>

        <div className={styles.projectWrapper}>
          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              src="/videos/vid2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className={styles.videoOverlay} />

            <div className={styles.projectInfo}>
              <div className={styles.projectMeta}>
                <span>MUMBAI</span>
                <span className={styles.metaDivider} />
                <span>RESIDENTIAL</span>
              </div>

              <h3 className={styles.projectTitle}>
                Luxury Residence
              </h3>
            </div>

            <Link
              href="/projects"
              className={styles.projectButton}
            >
              <span>Explore Project</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
