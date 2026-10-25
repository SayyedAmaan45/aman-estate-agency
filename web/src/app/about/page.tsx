
import Link from "next/link";
import styles from "./page.module.css";

const values = [
  {
    number: "01",
    title: "Trust & transparency",
    description:
      "Clear communication and honest guidance at every stage of your property journey.",
  },
  {
    number: "02",
    title: "A personal approach",
    description:
      "We take the time to understand your needs, preferences, and priorities before exploring your options.",
  },
  {
    number: "03",
    title: "Attention to detail",
    description:
      "From the first conversation to the finer details, we believe every part of the experience matters.",
  },
  {
    number: "04",
    title: "Long-term relationships",
    description:
      "Our aim is to build lasting relationships through thoughtful service and dependable support.",
  },
];

const steps = [
  {
    number: "01",
    title: "Understand your needs",
    description:
      "We begin by learning about your requirements, lifestyle, budget, and property goals.",
  },
  {
    number: "02",
    title: "Explore the possibilities",
    description:
      "We help you consider suitable options and understand the details that matter to you.",
  },
  {
    number: "03",
    title: "Move forward with confidence",
    description:
      "We guide you through the next steps with clear communication and personalized assistance.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            ABOUT AMAN ESTATE AGENCY
          </span>

          <h1 className={styles.heroTitle}>
            Finding a place.
            <br />
            <span>Creating a feeling.</span>
          </h1>

          <p className={styles.heroDescription}>
            Every property represents a possibility. We are here to help you
            explore those possibilities with clarity, care, and confidence.
          </p>

          <div className={styles.heroActions}>
            <Link href="/properties" className={styles.primaryButton}>
              Explore properties
              <span aria-hidden="true">↗</span>
            </Link>

            <Link href="/contact" className={styles.textLink}>
              Get in touch
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
              alt="Contemporary luxury residence with elegant architecture and natural materials"
              fetchPriority="high"
            />
          </div>

          <div className={styles.imageCaption}>
            <span className={styles.captionDot} />
            <span>Considered spaces. Meaningful possibilities.</span>
          </div>

          <span className={styles.heroImageIndex}>01 / 01</span>
        </div>

        <div className={styles.heroBottom}>
          <span>REAL ESTATE, WITH A PERSONAL TOUCH</span>
          <span className={styles.scrollLabel}>
            DISCOVER OUR APPROACH <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>

      {/* Introduction */}
      <section className={styles.introSection}>
        <div className={styles.introLabel}>
          <span className={styles.eyebrowLine} />
          <span>WHO WE ARE</span>
        </div>

        <div className={styles.introContent}>
          <h2 className={styles.introTitle}>
            Property is more than an address.
            <span> It is part of your story.</span>
          </h2>

          <div className={styles.introText}>
            <p>
              At Aman Estate Agency, we believe finding the right property
              should feel considered, personal, and well guided.
            </p>

            <p>
              Whether you are searching for a place to call home, exploring an
              investment, or considering your next move, our approach begins
              with understanding what matters to you.
            </p>

            <p>
              We aim to make the property journey easier to navigate through
              thoughtful guidance, clear communication, and attention to
              detail.
            </p>
          </div>
        </div>
      </section>

      {/* Story image */}
      <section className={styles.storySection}>
        <div className={styles.storyImage}>
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Warm, thoughtfully designed contemporary living space"
            loading="lazy"
          />

          <div className={styles.storyImageOverlay}>
            <span>THE RIGHT SPACE</span>
            <span>CAN CHANGE EVERYTHING.</span>
          </div>
        </div>

        <div className={styles.storyContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            OUR PERSPECTIVE
          </span>

          <h2 className={styles.sectionTitle}>
            A more thoughtful way to navigate real estate.
          </h2>

          <p>
            Property decisions are personal. They involve aspirations,
            practical considerations, and the future you want to create.
          </p>

          <p>
            That is why we believe the experience should be about more than
            listings. It should be about listening carefully, understanding
            your priorities, and helping you make informed decisions.
          </p>

          <p>
            Our focus is simple: put people first, communicate clearly, and
            approach every property journey with care.
          </p>

          <Link href="/properties" className={styles.underlinedLink}>
            Find your next possibility <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection}>
        <div className={styles.missionTop}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            OUR MISSION
          </span>

          <span className={styles.missionIndex}>A MORE PERSONAL EXPERIENCE</span>
        </div>

        <h2 className={styles.missionTitle}>
          To make every property decision feel
          <span> clearer, more considered, and more personal.</span>
        </h2>

        <div className={styles.missionBottom}>
          <p>
            Guided by your needs. Grounded in transparency. Focused on what
            comes next.
          </p>
          <span className={styles.missionMark} aria-hidden="true">
            A.
          </span>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              WHAT GUIDES US
            </span>

            <h2 className={styles.sectionTitle}>
              The principles behind
              <br />
              <span>every conversation.</span>
            </h2>
          </div>

          <p className={styles.sectionHeadingText}>
            Good service is built on the details people notice and the trust
            they feel throughout the process.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <article className={styles.valueCard} key={value.number}>
              <span className={styles.valueNumber}>{value.number}</span>

              <div className={styles.valueDivider} />

              <h3>{value.title}</h3>

              <p>{value.description}</p>

              <span className={styles.valueArrow} aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className={styles.approachSection}>
        <div className={styles.approachHeader}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            HOW WE WORK
          </span>

          <h2 className={styles.sectionTitle}>
            A journey shaped
            <br />
            <span>around you.</span>
          </h2>

          <p>
            Every requirement is different. Our approach starts with listening
            and continues with practical, personalized guidance.
          </p>
        </div>

        <div className={styles.stepsList}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              <span className={styles.stepArrow} aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaImage}>
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85"
            alt="Elegant contemporary residence with warm architectural details"
            loading="lazy"
          />
        </div>

        <div className={styles.ctaContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            YOUR NEXT CHAPTER
          </span>

          <h2>
            Let&apos;s find
            <br />
            <span>your place.</span>
          </h2>

          <p>
            Tell us what you are looking for. We would be happy to help you
            explore the possibilities.
          </p>

          <div className={styles.ctaActions}>
            <Link href="/properties" className={styles.ctaButton}>
              Explore properties <span aria-hidden="true">↗</span>
            </Link>

            <Link href="/contact" className={styles.ctaContactLink}>
              Speak with our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
