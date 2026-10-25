import Image from "next/image";
import styles from "./WhyAman.module.css";

const expertList = [
    {
        id: "01",
        name: "Curated Selection",
        description:
            "Thoughtfully selected properties chosen for quality, location and long-term value.",
    },
    {
        id: "02",
        name: "Local Expertise",
        description:
            "A clear understanding of Mumbai's neighbourhoods, markets and opportunities.",
    },
    {
        id: "03",
        name: "Personal Approach",
        description:
            "Straightforward guidance tailored to your needs, priorities and way of living.",
    },
    {
        id: "04",
        name: "Built on Trust",
        description:
            "Transparent communication and dependable support from enquiry to completion.",
    },
];

const WhyAman = () => {
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>

                {/* SECTION LABEL */}

                <p className={styles.eyebrow}>
                    WHY AMAN
                </p>

                {/* INTRODUCTION */}

                <div className={styles.introduction}>

                    <div className={styles.headingSection}>
                        <h2 className={styles.heading}>
                            A more considered way
                            <br />
                            to find your place.
                        </h2>

                        <p className={styles.description}>
                            We believe finding a property should feel
                            personal, clear and considered.
                        </p>
                    </div>

                    {/* IMAGE */}

                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/why-aman.jpg"
                            alt="Refined modern living space"
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 45vw"
                        />
                    </div>

                </div>

                {/* PRINCIPLES */}

                <div className={styles.expertList}>
                    {expertList.map((item) => (
                        <div
                            key={item.id}
                            className={styles.expertItem}
                        >
                            <span className={styles.expertNumber}>
                                {item.id}
                            </span>

                            <div className={styles.expertContent}>
                                <h3 className={styles.expertName}>
                                    {item.name}
                                </h3>

                                <p className={styles.expertDescription}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyAman;