import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.mainContainer}>
      {/* Background Video */}
      <video
        className={styles.desktopVideo}
        src="/videos/vid1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Mobile Video */}
      <video
        className={styles.mobileVideo}
        src="/videos/mobileHero1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className={styles.overlay} />

      {/* Hero Content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>AMAN ESTATE AGENCY</p>

        <h1 className={styles.headingTxt}>
          Find a place worth calling home.
        </h1>

        <p className={styles.description}>
          Discover exceptional properties selected for the way you want to live.
        </p>

        {/* Property Search */}
        <div className={styles.searchBox}>
          <div className={styles.searchTabs}>
            <button type="button" className={styles.activeTab}>
              Buy
            </button>

            <button type="button">
              Rent
            </button>
          </div>

          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="Search by city or locality"
            />

            <button type="button" className={styles.searchButton}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
};

export default Hero;