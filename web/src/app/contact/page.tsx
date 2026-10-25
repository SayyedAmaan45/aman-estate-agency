"use client";

import { useCallback, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Toast, { type ToastType } from "@/components/common/Toast/Toast";
import { useCreateEnquiryMutation } from "@/services/api/enquiryApi";

export default function ContactPage() {
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      enquiryType: String(formData.get("enquiryType") ?? "") as
        | "buy"
        | "rent"
        | "sell"
        | "invest"
        | "other",
      budget: String(formData.get("budget") ?? ""),
      preferredLocation: String(
        formData.get("preferredLocation") ?? ""
      ).trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      await createEnquiry(body).unwrap();

      form.reset();

      setToast({
        type: "success",
        message: "Enquiry sent successfully!",
      });
    } catch (error) {
      console.error("Failed to submit enquiry:", error);

      setToast({
        type: "error",
        message: "Unable to send your enquiry. Please try again.",
      });
    }
  };

  return (
    <main className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            GET IN TOUCH
          </span>

          <h1 className={styles.heroTitle}>
            Every great move
            <br />
            <span>starts with a conversation.</span>
          </h1>

          <p className={styles.heroDescription}>
            Whether you are looking for a new home, exploring an investment,
            or considering your next move, we are here to understand what
            matters to you.
          </p>

          <a href="#contact-form" className={styles.heroLink}>
            Tell us what you are looking for
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.heroVisual}>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
            alt="Contemporary residence with warm natural materials and refined architecture"
            fetchPriority="high"
          />

          <div className={styles.imageCaption}>
            <span className={styles.captionDot} />
            A thoughtful start to your property journey.
          </div>

          <span className={styles.imageIndex}>01 / 01</span>
        </div>

        <div className={styles.heroBottom}>
          <span>AMAN ESTATE AGENCY</span>
          <span>PROPERTY, WITH A PERSONAL TOUCH</span>
        </div>
      </section>

      {/* Contact and form */}
      <section className={styles.contactSection} id="contact-form">
        <aside className={styles.contactInfo}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            LET&apos;S CONNECT
          </span>

          <h2 className={styles.sectionTitle}>
            Tell us a little
            <br />
            <span>about your plans.</span>
          </h2>

          <p className={styles.infoDescription}>
            A property search begins with understanding your priorities.
            Share a few details and help us understand what you have in mind.
          </p>

          <div className={styles.infoDivider} />

          <div className={styles.infoItem}>
            <span className={styles.infoNumber}>01</span>
            <div>
              <h3>Buying a property</h3>
              <p>
                Find a space that fits your needs, preferences, and plans for
                the future.
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoNumber}>02</span>
            <div>
              <h3>Renting a property</h3>
              <p>
                Explore options that work for your lifestyle and practical
                requirements.
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoNumber}>03</span>
            <div>
              <h3>Listing or investing</h3>
              <p>
                Tell us about your property or investment interests so we can
                understand your goals.
              </p>
            </div>
          </div>

          <div className={styles.browseCard}>
            <span className={styles.browseEyebrow}>STILL EXPLORING?</span>
            <p>Discover properties before deciding on your next step.</p>
            <Link href="/properties" className={styles.browseLink}>
              Browse properties <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.formHeading}>
            <span className={styles.formEyebrow}>YOUR ENQUIRY</span>
            <h2>How can we help?</h2>
            <p>
              Complete the details below. Fields marked with an asterisk are
              required.
            </p>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="fullName">
                  Full name <span>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  maxLength={20}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiryType">
                  I am interested in <span>*</span>
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select an enquiry type
                  </option>
                  <option value="buy">Buying a property</option>
                  <option value="rent">Renting a property</option>
                  <option value="sell">Selling a property</option>
                  <option value="invest">Property investment</option>
                  <option value="other">Other enquiry</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="budget">Approximate budget</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="">Select a budget (optional)</option>
                  <option value="under-25-lakh">Under ₹25 lakh</option>
                  <option value="25-50-lakh">₹25–50 lakh</option>
                  <option value="50-lakh-1-crore">
                    ₹50 lakh–₹1 crore
                  </option>
                  <option value="1-2-crore">₹1–2 crore</option>
                  <option value="above-2-crore">Above ₹2 crore</option>
                  <option value="undecided">Not decided yet</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="preferredLocation">
                  Preferred location
                </label>
                <input
                  id="preferredLocation"
                  name="preferredLocation"
                  type="text"
                  placeholder="Area or city"
                  maxLength={150}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">
                Tell us more <span>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Share your requirements, preferred property type, timeline, or any questions you have..."
                rows={5}
                minLength={10}
                maxLength={2000}
                required
              />
              <span className={styles.fieldHint}>
                The more you share, the better we can understand your
                requirements.
              </span>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Sending enquiry..." : "Send my enquiry"}
              <span aria-hidden="true">↗</span>
            </button>

            <p className={styles.formDisclaimer}>
              Your details will be used to process your property enquiry.
              Please avoid including passwords or other sensitive information.
            </p>
          </form>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={styles.closingSection}>
        <div className={styles.closingContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            YOUR NEXT CHAPTER
          </span>

          <h2>
            The right place
            <br />
            <span>begins with you.</span>
          </h2>

          <p>
            Take your time, explore your options, and move forward when
            you&apos;re ready.
          </p>

          <Link href="/properties" className={styles.closingButton}>
            Explore properties <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.closingMark} aria-hidden="true">
          A.
        </div>
      </section>

      {/* Temporary Toast Testing - Remove after testing */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 999,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <button
          type="button"
          onClick={() =>
            setToast({
              type: "success",
              message: "Success toast is working!",
            })
          }
        >
          Test success
        </button>

        <button
          type="button"
          onClick={() =>
            setToast({
              type: "error",
              message: "Error toast is working!",
            })
          }
        >
          Test error
        </button>

        <button
          type="button"
          onClick={() =>
            setToast({
              type: "warning",
              message: "Warning toast is working!",
            })
          }
        >
          Test warning
        </button>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
        />
      )}
    </main>
  );
}
