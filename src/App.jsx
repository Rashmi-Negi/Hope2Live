import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "./supabaseClient";

/* =========================================================
   REVEAL ANIMATION HELPER
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Logo({ navigate, dark = false }) {
  return (
    <button
      className={`brand ${dark ? "brand-dark" : ""}`}
      onClick={() => navigate("home")}
      aria-label="Go to Hope2Live home"
    >
      <span className="brand-mark">
        <span className="brand-mark-ring"></span>

        <svg
          className="brand-svg"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M24 42S7 31.7 7 18.5C7 12.4 11.4 8 16.9 8c3.1 0 5.6 1.5 7.1 3.9C25.5 9.5 28 8 31.1 8 36.6 8 41 12.4 41 18.5 41 31.7 24 42 24 42Z"
            fill="currentColor"
          />

          <path
            d="M24 15.2v14.4M16.8 22.4h14.4"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <span className="brand-pulse"></span>
      </span>

      <span className="brand-name">
        Hope<span>2</span>Live
      </span>
    </button>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  navigate,
  user,
  page,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (newPage) => {
    setMenuOpen(false);
    navigate(newPage);
  };

  return (
    <nav
      className={`navbar ${
        menuOpen ? "navbar-menu-open" : ""
      }`}
    >
      <div className="navbar-inner">

        <Logo navigate={navigate} />

        <div
          className={`nav-links ${
            menuOpen ? "mobile-open" : ""
          }`}
        >
          <button
            className={
              page === "home" ? "active" : ""
            }
            onClick={() => go("home")}
          >
            <span>Home</span>
          </button>

          <button
            className={
              page === "support" ? "active" : ""
            }
            onClick={() => go("support")}
          >
            <span>Find Support</span>
          </button>

          <button
            className={
              page === "how" ? "active" : ""
            }
            onClick={() => go("how")}
          >
            <span>How It Works</span>
          </button>

          <button
            className={
              page === "about" ? "active" : ""
            }
            onClick={() => go("about")}
          >
            <span>About</span>
          </button>

          <div className="mobile-nav-actions">
            {user ? (
              <button
                className="mobile-dashboard-button"
                onClick={() => go("dashboard")}
              >
                Dashboard
                <span>→</span>
              </button>
            ) : (
              <>
                <button
                  className="mobile-login-button"
                  onClick={() => go("login")}
                >
                  Log in
                </button>

                <button
                  className="mobile-join-button"
                  onClick={() => go("signup")}
                >
                  Join Hope2Live
                  <span>→</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <button
              className="nav-dashboard-button"
              onClick={() =>
                navigate("dashboard")
              }
            >
              <span className="nav-user-dot">
                <span></span>
              </span>

              Dashboard

              <span className="nav-arrow">
                →
              </span>
            </button>
          ) : (
            <>
              <button
                className="nav-login-button"
                onClick={() =>
                  navigate("login")
                }
              >
                Log in
              </button>

              <button
                className="nav-join-button"
                onClick={() =>
                  navigate("signup")
                }
              >
                Join Hope2Live
                <span>→</span>
              </button>
            </>
          )}
        </div>

        <button
          className={`mobile-menu-button ${
            menuOpen ? "is-open" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({ navigate }) {
  return (
    <main>

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-mini-badge">
            <span className="pulse-dot"></span>

            <span>
              A smarter way to connect blood support
            </span>
          </div>

          <p className="eyebrow hero-eyebrow">
            EVERY DROP CAN CREATE HOPE
          </p>

          <h1>
            When someone needs
            <br />
            blood,{" "}
            <span>
              hope should be closer.
            </span>
          </h1>

          <p className="hero-description">
            Hope2Live brings blood donors and people
            who need support closer together through
            simple, location-aware technology.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button hero-primary-button"
              onClick={() =>
                navigate("signup")
              }
            >
              Become a donor
              <span>→</span>
            </button>

            <button
              className="secondary-button hero-secondary-button"
              onClick={() =>
                navigate("support")
              }
            >
              I need blood support
              <span>↗</span>
            </button>

          </div>

          <div className="hero-trust-row">

            <div>
              <span className="trust-icon">
                ✓
              </span>

              <span>
                Simple registration
              </span>
            </div>

            <div>
              <span className="trust-icon">
                ⌖
              </span>

              <span>
                Location-aware
              </span>
            </div>

            <div>
              <span className="trust-icon">
                ♥
              </span>

              <span>
                Human connection
              </span>
            </div>

          </div>

        </div>

        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

          <div className="hero-grid-lines"></div>

          <div className="floating-chip chip-one">
            <span>🩸</span>
            Blood donor
          </div>

          <div className="floating-chip chip-two">
            <span>📍</span>
            Nearby support
          </div>

          <div className="hero-card">

            <div className="hero-card-top">

              <div className="hero-card-brand">
                <span className="hero-card-brand-icon">
                  ♥
                </span>

                <span>
                  Hope2Live
                </span>
              </div>

              <span className="hero-card-status">
                <span></span>
                CONNECTED
              </span>

            </div>

            <div className="hero-drop-wrapper">

              <div className="hero-drop-orbit orbit-a"></div>
              <div className="hero-drop-orbit orbit-b"></div>

              <div className="hero-drop-ring"></div>

              <div className="hero-blood-drop">
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M24 5C24 5 11 19.2 11 28.7C11 36.4 16.8 42 24 42s13-5.6 13-13.3C37 19.2 24 5 24 5Z"
                    fill="currentColor"
                  />

                  <path
                    d="M18 29.5c1.2 3.2 3.4 4.8 6.7 5.1"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity=".8"
                  />
                </svg>
              </div>

            </div>

            <p className="hero-card-eyebrow">
              THE POWER OF CONNECTION
            </p>

            <h3>
              One donor.
              <br />
              One connection.
              <br />
              More hope.
            </h3>

            <p className="hero-card-text">
              Your willingness to help can become
              someone's most important moment.
            </p>

            <div className="hero-card-footer">

              <div className="hero-card-avatars">

                <span>♥</span>
                <span>+</span>
                <span>♥</span>

              </div>

              <span>
                People helping people
              </span>

            </div>

          </div>

          <div className="hero-floating-stat">

            <span className="floating-stat-icon">
              ✦
            </span>

            <div>
              <strong>
                Every drop
              </strong>

              <small>
                carries hope
              </small>
            </div>

          </div>

        </div>

      </section>

      {/* QUICK IMPACT STRIP */}

      <section className="impact-strip">

        <div className="impact-strip-inner">

          <div className="impact-item">
            <strong>01</strong>
            <span>Register</span>
          </div>

          <div className="impact-line"></div>

          <div className="impact-item">
            <strong>02</strong>
            <span>Complete profile</span>
          </div>

          <div className="impact-line"></div>

          <div className="impact-item">
            <strong>03</strong>
            <span>Discover</span>
          </div>

          <div className="impact-line"></div>

          <div className="impact-item">
            <strong>04</strong>
            <span>Create hope</span>
          </div>

        </div>

      </section>

      {/* PATH */}

      <section className="path-section">

        <Reveal className="section-intro centered-intro">

          <p className="eyebrow">
            START WHERE YOU ARE
          </p>

          <h2>
            There are two ways to make
            <span> a difference.</span>
          </h2>

          <p>
            Whether you want to donate or need
            support, Hope2Live gives you a simple
            place to begin.
          </p>

        </Reveal>

        <div className="path-grid">

          <Reveal delay={80}>
            <div
              className="path-card donor-path-card"
              onClick={() =>
                navigate("signup")
              }
            >

              <div className="path-card-top">

                <div className="path-icon">
                  🩸
                </div>

                <span className="path-arrow">
                  ↗
                </span>

              </div>

              <p className="path-card-label">
                FOR DONORS
              </p>

              <h3>
                I want to donate
              </h3>

              <p>
                Create your donor profile, share
                your availability and make it
                easier for people nearby to find
                potential blood support.
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("signup");
                }}
              >
                Become a donor
                <span>→</span>
              </button>

            </div>
          </Reveal>

          <Reveal delay={160}>
            <div
              className="path-card support-path-card"
              onClick={() =>
                navigate("support")
              }
            >

              <div className="path-card-top">

                <div className="path-icon">
                  ❤️
                </div>

                <span className="path-arrow">
                  ↗
                </span>

              </div>

              <p className="path-card-label">
                FOR RECIPIENTS
              </p>

              <h3>
                I need support
              </h3>

              <p>
                Tell us what blood support you
                need and create a request that
                can connect you with potential
                donors.
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("support");
                }}
              >
                Request support
                <span>→</span>
              </button>

            </div>
          </Reveal>

        </div>

      </section>

      {/* TECHNOLOGY */}

      <section className="technology-section">

        <Reveal className="technology-visual">

          <div className="technology-glow"></div>

          <div className="tech-orbit orbit-one"></div>
          <div className="tech-orbit orbit-two"></div>
          <div className="tech-orbit orbit-three"></div>

          <div className="tech-center">
            <span>♥</span>
          </div>

          <div className="tech-node node-one">
            <span>🩸</span>
          </div>

          <div className="tech-node node-two">
            <span>📍</span>
          </div>

          <div className="tech-node node-three">
            <span>🤝</span>
          </div>

          <div className="tech-node node-four">
            <span>✦</span>
          </div>

        </Reveal>

        <Reveal
          className="technology-content"
          delay={120}
        >

          <p className="eyebrow">
            TECHNOLOGY WITH PURPOSE
          </p>

          <h2>
            Built to make the
            <span> connection easier.</span>
          </h2>

          <p className="technology-description">
            Hope2Live combines donor information,
            location-aware technology and a
            connected platform to make blood
            support easier to discover.
          </p>

          <div className="feature-list">

            <div className="feature-row">

              <div className="feature-icon">
                ⌖
              </div>

              <div>
                <h3>
                  Location-aware
                </h3>

                <p>
                  Help identify potential support
                  closer to where it is needed.
                </p>
              </div>

            </div>

            <div className="feature-row">

              <div className="feature-icon">
                🩸
              </div>

              <div>
                <h3>
                  Blood information
                </h3>

                <p>
                  Keep important donor details
                  organised in one profile.
                </p>
              </div>

            </div>

            <div className="feature-row">

              <div className="feature-icon">
                ♥
              </div>

              <div>
                <h3>
                  Human connection
                </h3>

                <p>
                  Technology helps people find
                  each other; people create the
                  difference.
                </p>
              </div>

            </div>

          </div>

        </Reveal>

      </section>

      {/* HOW IT WORKS */}

      <section className="steps-section">

        <Reveal className="section-intro">

          <p className="eyebrow">
            SIMPLE BY DESIGN
          </p>

          <h2>
            From profile to
            <span> possibility.</span>
          </h2>

          <p>
            Hope2Live keeps the journey
            straightforward, so the important
            part stays human.
          </p>

        </Reveal>

        <div className="steps-grid home-steps">

          <Reveal delay={50}>
            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                ✦
              </div>

              <h3>
                Create your profile
              </h3>

              <p>
                Register and add the information
                needed to make your profile useful.
              </p>

            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                ⌖
              </div>

              <h3>
                Discover support
              </h3>

              <p>
                Use blood group and location
                information to discover potential
                connections.
              </p>

            </div>
          </Reveal>

          <Reveal delay={190}>
            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                ♥
              </div>

              <h3>
                Make the connection
              </h3>

              <p>
                Connect with the right people
                when help is needed most.
              </p>

            </div>
          </Reveal>

        </div>

      </section>

      {/* QUOTE */}

      <section className="quote-section">

        <div className="quote-glow"></div>

        <div className="quote-mark">
          “
        </div>

        <p>
          Sometimes hope doesn't need a miracle.
          <br />
          It just needs a connection.
        </p>

        <span>
          — The idea behind Hope2Live
        </span>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-decoration">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="cta-content">

          <p className="eyebrow">
            YOUR JOURNEY CAN START TODAY
          </p>

          <h2>
            Be the reason
            <span> hope continues.</span>
          </h2>

          <p>
            Join Hope2Live and take the first
            step towards creating meaningful
            connections.
          </p>

        </div>

        <button
          className="primary-button cta-button"
          onClick={() =>
            navigate("signup")
          }
        >
          Join Hope2Live
          <span>→</span>
        </button>

      </section>

    </main>
  );
}

/* =========================================================
   SUPPORT PAGE
========================================================= */

function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase
      .from("support_requests")
      .insert([
        {
          name: form.name,
          blood_group: form.bloodGroup,
          location: form.location,
          message: form.message,
        },
      ]);

    if (error) {
      console.error(
        "Support request error:",
        error
      );

      setErrorMessage(
        "Unable to submit your request right now. Please try again."
      );

      setLoading(false);
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      bloodGroup: "",
      location: "",
      message: "",
    });

    setLoading(false);
  };

  return (
    <main className="page-section support-page">

      <Reveal className="page-heading split-page-heading">

        <div>
          <p className="eyebrow">
            FIND SUPPORT
          </p>

          <h1>
            When you need help,
            <span> start here.</span>
          </h1>
        </div>

        <p>
          Share your blood requirement and give
          potential donors the information they
          need to understand your request.
        </p>

      </Reveal>

      <div className="support-layout">

        <Reveal className="support-info-panel">

          <div className="support-info-icon">
            ❤️
          </div>

          <p className="eyebrow">
            YOU ARE NOT ALONE
          </p>

          <h2>
            Tell us what
            <br />
            you need.
          </h2>

          <p>
            A clear request helps make the right
            information easier to understand
            and connect.
          </p>

          <div className="support-points">

            <div>
              <span>01</span>
              <p>
                Tell us your blood group.
              </p>
            </div>

            <div>
              <span>02</span>
              <p>
                Add your location.
              </p>
            </div>

            <div>
              <span>03</span>
              <p>
                Describe the support you need.
              </p>
            </div>

          </div>

        </Reveal>

        <Reveal
          className="support-card"
          delay={100}
        >

          {submitted ? (

            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <p className="eyebrow">
                REQUEST RECEIVED
              </p>

              <h2>
                Your request is on its way.
              </h2>

              <p>
                Your support request has been
                recorded successfully.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setSubmitted(false)
                }
              >
                Create another request
              </button>

            </div>

          ) : (

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="form-section-label">
                REQUEST DETAILS
              </div>

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              <label>
                Your name

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Blood group

                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select blood group
                  </option>

                  <option value="A+">
                    A+
                  </option>

                  <option value="A-">
                    A-
                  </option>

                  <option value="B+">
                    B+
                  </option>

                  <option value="B-">
                    B-
                  </option>

                  <option value="AB+">
                    AB+
                  </option>

                  <option value="AB-">
                    AB-
                  </option>

                  <option value="O+">
                    O+
                  </option>

                  <option value="O-">
                    O-
                  </option>
                </select>
              </label>

              <label>
                Location

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Dehradun, Uttarakhand"
                  required
                />
              </label>

              <label>
                Message

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what support you need..."
                  rows="5"
                />
              </label>

              <button
                className="primary-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting request..."
                  : "Submit support request"}

                {!loading && (
                  <span>→</span>
                )}
              </button>

            </form>

          )}

        </Reveal>

      </div>

    </main>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorksPage() {
  return (
    <main className="page-section">

      <Reveal className="page-heading centered-page-heading">

        <p className="eyebrow">
          HOW IT WORKS
        </p>

        <h1>
          Simple steps.
          <span>
            Meaningful connections.
          </span>
        </h1>

        <p>
          Hope2Live is designed to keep the
          process simple while bringing
          important information together.
        </p>

      </Reveal>

      <div className="steps-grid how-page-steps">

        <Reveal delay={40}>
          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              ✦
            </div>

            <h3>
              Register
            </h3>

            <p>
              Create your Hope2Live account and
              choose whether you are joining as
              a donor or recipient.
            </p>

          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🩸
            </div>

            <h3>
              Complete your profile
            </h3>

            <p>
              Add relevant blood group, contact
              and location information to make
              your profile useful.
            </p>

          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ⌖
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Location-aware information can help
              identify potential support nearby.
            </p>

          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              ♥
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Turn a digital connection into a
              real-world moment of support.
            </p>

          </div>
        </Reveal>

      </div>

      <Reveal className="how-bottom-card">

        <div>
          <p className="eyebrow">
            THE IDEA
          </p>

          <h2>
            Technology should make
            <span>
              helping easier.
            </span>
          </h2>
        </div>

        <p>
          Hope2Live brings information, people
          and location together around one
          simple purpose: helping people find
          potential blood support.
        </p>

      </Reveal>

    </main>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function AboutPage() {
  return (
    <main className="page-section about-page">

      <Reveal className="page-heading">

        <p className="eyebrow">
          ABOUT HOPE2LIVE
        </p>

        <h1>
          Technology that keeps
          <span>
            humanity at the centre.
          </span>
        </h1>

        <p>
          Hope2Live is built around a simple
          idea: technology can help people
          find each other when meaningful
          support is needed.
        </p>

      </Reveal>

      <div className="about-content">

        <Reveal>
          <div className="about-card about-card-main">

            <div className="about-card-icon">
              ♥
            </div>

            <p className="eyebrow">
              OUR PURPOSE
            </p>

            <h2>
              Connecting donors
              and recipients.
            </h2>

            <p>
              Hope2Live is a blood donation
              platform designed to bring donors
              and people needing blood closer
              together through technology.
            </p>

          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="about-card">

            <div className="about-card-icon">
              ⌖
            </div>

            <p className="eyebrow">
              OUR APPROACH
            </p>

            <h2>
              Location-aware
              support.
            </h2>

            <p>
              Location information can help make
              potential connections more relevant
              to where support is needed.
            </p>

          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="about-card">

            <div className="about-card-icon">
              ✦
            </div>

            <p className="eyebrow">
              OUR VISION
            </p>

            <h2>
              Simpler access
              to support.
            </h2>

            <p>
              We aim to make finding and offering
              blood support more organised,
              accessible and human-centred.
            </p>

          </div>
        </Reveal>

      </div>

      <Reveal className="about-quote">

        <span>“</span>

        <p>
          People are the heart of Hope2Live.
          Technology simply helps them connect.
        </p>

      </Reveal>

    </main>
  );
}

/* =========================================================
   AUTH BRAND PANEL
========================================================= */

function AuthBrandPanel({
  mode = "login",
}) {
  return (
    <div className="auth-brand-panel">

      <div className="auth-brand-glow glow-one"></div>
      <div className="auth-brand-glow glow-two"></div>

      <div className="auth-brand-content">

        <div className="auth-brand-logo">
          <span className="auth-brand-logo-icon">
            ♥
          </span>

          <span>
            Hope<span>2</span>Live
          </span>
        </div>

        <div className="auth-visual-heart">

          <div className="auth-heart-ring ring-one"></div>
          <div className="auth-heart-ring ring-two"></div>
          <div className="auth-heart-ring ring-three"></div>

          <div className="auth-heart-core">
            <span>♥</span>
          </div>

        </div>

        <p className="eyebrow">
          {mode === "signup"
            ? "START WITH HOPE"
            : "WELCOME BACK"}
        </p>

        <h2>
          {mode === "signup"
            ? "Your journey can begin with one simple step."
            : "Good to see you again."}
        </h2>

        <p>
          {mode === "signup"
            ? "Create your Hope2Live profile and become part of a platform built around meaningful connections."
            : "Log in to continue your Hope2Live journey and keep your donor profile ready."}
        </p>

        <div className="auth-brand-points">

          <span>
            <b>✓</b>
            Simple profile
          </span>

          <span>
            <b>⌖</b>
            Location-aware
          </span>

          <span>
            <b>♥</b>
            Human-first
          </span>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function LoginPage({
  navigate,
  onLogin,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(
        error.message
      );

      setLoading(false);
      return;
    }

    if (data?.user) {
      onLogin(data.user);
      navigate("dashboard");
    }

    setLoading(false);
  };

  return (
    <main className="auth-page">

      <div className="auth-background-decoration">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="auth-layout">

        <AuthBrandPanel mode="login" />

        <div className="auth-card">

          <div className="auth-mobile-logo">
            <Logo navigate={navigate} />
          </div>

          <div className="auth-heading">

            <p className="eyebrow">
              WELCOME BACK
            </p>

            <h1>
              Log in to Hope2Live
            </h1>

            <p>
              Continue your journey of making
              a meaningful difference.
            </p>

          </div>

          {errorMessage && (
            <div className="error-message">
              <span>!</span>
              {errorMessage}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

            <label>
              Email

              <div className="input-with-icon">
                <span>✉</span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label>
              Password

              <div className="password-field">

                <span className="password-icon">
                  ●
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>
            </label>

            <button
              className="primary-button auth-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Log in"}

              {!loading && (
                <span>→</span>
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span></span>
            <small>
              HOPE2LIVE
            </small>
            <span></span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}

            <button
              onClick={() =>
                navigate("signup")
              }
            >
              Create one
            </button>
          </p>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   SIGNUP
========================================================= */

function SignupPage({
  navigate,
  onLogin,
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("donor");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: name.trim(),
          role,
        },
      },
    });

    if (error) {
      setErrorMessage(
        error.message
      );

      setLoading(false);
      return;
    }

    if (data?.session) {
      onLogin(data.user);
      navigate("dashboard");
    } else {
      setSuccessMessage(
        "Account created successfully. Please check your email and confirm your account before logging in."
      );
    }

    setLoading(false);
  };

  return (
    <main className="auth-page">

      <div className="auth-background-decoration">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="auth-layout">

        <AuthBrandPanel mode="signup" />

        <div className="auth-card signup-auth-card">

          <div className="auth-mobile-logo">
            <Logo navigate={navigate} />
          </div>

          <div className="auth-heading">

            <p className="eyebrow">
              JOIN HOPE2LIVE
            </p>

            <h1>
              Create your account
            </h1>

            <p>
              Start your journey towards
              meaningful connections.
            </p>

          </div>

          {errorMessage && (
            <div className="error-message">
              <span>!</span>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="success-message-small">
              <span>✓</span>
              {successMessage}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSignup}
          >

            <label>
              Full name

              <div className="input-with-icon">
                <span>♙</span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            </label>

            <label>
              Email

              <div className="input-with-icon">
                <span>✉</span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label>
              Password

              <div className="password-field">

                <span className="password-icon">
                  ●
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>
            </label>

            <label>
              Account type

              <div className="role-picker">

                <button
                  type="button"
                  className={
                    role === "donor"
                      ? "role-option active"
                      : "role-option"
                  }
                  onClick={() =>
                    setRole("donor")
                  }
                >
                  <span className="role-option-icon">
                    🩸
                  </span>

                  <span>
                    <strong>
                      Donor
                    </strong>

                    <small>
                      I want to help
                    </small>
                  </span>

                  <i>
                    {role === "donor"
                      ? "✓"
                      : ""}
                  </i>
                </button>

                <button
                  type="button"
                  className={
                    role === "recipient"
                      ? "role-option active"
                      : "role-option"
                  }
                  onClick={() =>
                    setRole(
                      "recipient"
                    )
                  }
                >
                  <span className="role-option-icon">
                    ❤️
                  </span>

                  <span>
                    <strong>
                      Recipient
                    </strong>

                    <small>
                      I need support
                    </small>
                  </span>

                  <i>
                    {role ===
                    "recipient"
                      ? "✓"
                      : ""}
                  </i>
                </button>

              </div>
            </label>

            <button
              className="primary-button auth-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <span>→</span>
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span></span>
            <small>
              HOPE2LIVE
            </small>
            <span></span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}

            <button
              onClick={() =>
                navigate("login")
              }
            >
              Log in
            </button>
          </p>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function DashboardPage({
  user,
  navigate,
  onLogout,
}) {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [gettingLocation, setGettingLocation] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [profileWarning, setProfileWarning] =
    useState("");

  const [bloodGroup, setBloodGroup] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [availability, setAvailability] =
    useState(true);

  const [lastDonationDate, setLastDonationDate] =
    useState("");

  /* =========================================================
     BLOOD REQUEST STATE
  ========================================================= */

  const [requestBloodGroup, setRequestBloodGroup] =
    useState("");

  const [requestLocation, setRequestLocation] =
    useState("");

  const [requestRequiredDate, setRequestRequiredDate] =
    useState("");

  const [requestUrgency, setRequestUrgency] =
    useState("Normal");

  const [requestMessage, setRequestMessage] =
    useState("");

  const [requestLoading, setRequestLoading] =
    useState(false);

  const [requestGettingLocation, setRequestGettingLocation] =
    useState(false);

  const [requestSuccess, setRequestSuccess] =
    useState("");

  const [requestError, setRequestError] =
    useState("");

  const [myRequests, setMyRequests] =
    useState([]);

  const [requestsLoading, setRequestsLoading] =
    useState(false);

  /* =========================================================
     DONOR MATCHING STATE
  ========================================================= */

  const [matchingRequests, setMatchingRequests] =
    useState([]);

  const [matchingLoading, setMatchingLoading] =
    useState(false);

  const [matchingError, setMatchingError] =
    useState("");

  /* =========================================================
     DONATION RESPONSE STATE
  ========================================================= */

  const [donationResponses, setDonationResponses] =
    useState([]);

  const [donationLoading, setDonationLoading] =
    useState(false);

  const [donationError, setDonationError] =
    useState("");

  const [recipientResponses, setRecipientResponses] =
    useState([]);

  const [recipientResponsesLoading, setRecipientResponsesLoading] =
    useState(false);

  /* =========================================================
     DONOR / RECIPIENT CHAT STATE
  ========================================================= */

  const [selectedResponse, setSelectedResponse] =
    useState(null);

  const [chatMessages, setChatMessages] =
    useState([]);

  const [chatText, setChatText] =
    useState("");

  const [chatLoading, setChatLoading] =
    useState(false);

  const [chatSending, setChatSending] =
    useState(false);

  const [chatError, setChatError] =
    useState("");

  const [chatOpen, setChatOpen] =
    useState(false);

  /* =========================================================
     ACCOUNT TYPE

     IMPORTANT:
     Keep this BEFORE functions/effects that use it.
  ========================================================= */

  const accountType = String(
    profile?.account_type ||
    user?.user_metadata?.role ||
    "donor"
  )
    .trim()
    .toLowerCase();

  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      if (!user?.id) {
        if (mounted) {
          setLoading(false);
        }

        return;
      }

      setLoading(true);
      setErrorMessage("");
      setProfileWarning("");

      try {
        const {
          data,
          error,
        } = await supabase
          .from("profiles")
          .select(
            "id, full_name, email, account_type, created_at, blood_group, phone, location, availability, last_donation_date, latitude, longitude"
          )
          .eq("id", user.id)
          .maybeSingle();

        if (!mounted) return;

        if (error) {
          console.error(
            "Profile fetch error:",
            error
          );

          setProfileWarning(
            "Your account is connected, but some saved profile details could not be loaded. You can still complete and save your profile below."
          );

          /*
            IMPORTANT:
            Do not keep dashboard stuck on loading
            if Supabase profile fetch fails.
          */
          setProfile(null);

          setBloodGroup("");
          setPhone("");
          setLocation("");
          setAvailability(true);
          setLastDonationDate("");

          return;
        }

        if (data) {
          setProfile(data);

          setBloodGroup(
            data.blood_group || ""
          );

          setPhone(
            data.phone || ""
          );

          setLocation(
            data.location || ""
          );

          /*
            availability is stored as TEXT in your DB.
            Therefore normalize both:
            true / false
            "true" / "false"
          */

          const savedAvailability =
            data.availability;

          if (
            savedAvailability === null ||
            savedAvailability === undefined ||
            savedAvailability === ""
          ) {
            setAvailability(true);
          } else if (
            typeof savedAvailability === "string"
          ) {
            setAvailability(
              savedAvailability.toLowerCase() ===
                "true"
            );
          } else {
            setAvailability(
              Boolean(savedAvailability)
            );
          }

          setLastDonationDate(
            data.last_donation_date || ""
          );
        } else {
          /*
            No profile row:
            keep auth user data visible.
          */

          setProfile(null);

          setBloodGroup("");
          setPhone("");
          setLocation("");
          setAvailability(true);
          setLastDonationDate("");

          setProfileWarning(
            "Your account is ready. Complete your donor profile below to add your blood and location details."
          );
        }
      } catch (error) {
        console.error(
          "Unexpected profile fetch error:",
          error
        );

        if (!mounted) return;

        setProfileWarning(
          "Your account is connected, but we could not load your profile details. You can still try completing your profile below."
        );

        setProfile(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  /* =========================================================
     GET DONOR GPS LOCATION
  ========================================================= */

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage(
        "Geolocation is not supported by this browser."
      );

      return;
    }

    setErrorMessage("");
    setSaveMessage("");
    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {
          const {
            data,
            error,
          } = await supabase
            .from("profiles")
            .update({
              latitude,
              longitude,
            })
            .eq("id", user.id)
            .select()
            .maybeSingle();

          setGettingLocation(false);

          if (error) {
            console.error(
              "Location update error:",
              error
            );

            setErrorMessage(
              "Your location was detected, but it could not be saved. Please try again."
            );

            return;
          }

          setProfile((previous) => ({
            ...(previous || {}),
            ...(data || {}),
            latitude,
            longitude,
          }));

          setSaveMessage(
            data
              ? "Your current location has been saved 📍"
              : "Location detected. Save your profile to keep your details updated."
          );
        } catch (error) {
          console.error(
            "Unexpected location update error:",
            error
          );

          setGettingLocation(false);

          setErrorMessage(
            "Your location was detected, but it could not be saved. Please try again."
          );
        }
      },
      (geoError) => {
        setGettingLocation(false);

        console.error(
          "Geolocation error:",
          geoError
        );

        if (geoError.code === 1) {
          setErrorMessage(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (geoError.code === 2) {
          setErrorMessage(
            "Your location could not be detected."
          );
        } else if (geoError.code === 3) {
          setErrorMessage(
            "Location request timed out. Please try again."
          );
        } else {
          setErrorMessage(
            "Unable to get your current location."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSaveMessage("");
    setErrorMessage("");
    setProfileWarning("");

    try {
      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .update({
          blood_group:
            bloodGroup || null,

          phone:
            phone || null,

          location:
            location || null,

          availability,

          last_donation_date:
            lastDonationDate || null,
        })
        .eq("id", user.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error(
          "Profile update error:",
          error
        );

        setErrorMessage(
          "Unable to save your profile right now. Please try again."
        );

        return;
      }

      if (data) {
        setProfile(data);
      } else {
        setProfile((previous) => ({
          ...(previous || {}),
          blood_group:
            bloodGroup || null,
          phone:
            phone || null,
          location:
            location || null,
          availability,
          last_donation_date:
            lastDonationDate || null,
        }));
      }

      setSaveMessage(
        "Donor profile updated successfully ❤️"
      );
    } catch (error) {
      console.error(
        "Unexpected profile update error:",
        error
      );

      setErrorMessage(
        "Unable to save your profile right now. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     REQUEST GPS LOCATION
  ========================================================= */

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setRequestError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    setRequestError("");
    setRequestSuccess("");
    setRequestGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setRequestLocation(
          `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        );

        setProfile((previous) => ({
          ...(previous || {}),
          latitude: String(latitude),
          longitude: String(longitude),
        }));

        setRequestGettingLocation(false);

        setRequestSuccess(
          "Current location detected. It will be attached to your blood request 📍"
        );
      },
      (geoError) => {
        setRequestGettingLocation(false);

        if (geoError.code === 1) {
          setRequestError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (geoError.code === 2) {
          setRequestError(
            "Your location could not be detected."
          );
        } else if (geoError.code === 3) {
          setRequestError(
            "Location request timed out. Please try again."
          );
        } else {
          setRequestError(
            "Unable to get your current location."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /* =========================================================
     FETCH MY BLOOD REQUESTS
  ========================================================= */

  const fetchMyRequests = async () => {
    if (!user?.id) return;

    setRequestsLoading(true);

    try {
      const {
        data,
        error,
      } = await supabase
        .from("blood_requests")
        .select(
          "id, blood_group, location, latitude, longitude, required_date, urgency, message, status, created_at"
        )
        .eq("requester_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Blood requests fetch error:",
          error
        );

        setMyRequests([]);
        return;
      }

      setMyRequests(data || []);
    } catch (error) {
      console.error(
        "Unexpected blood requests fetch error:",
        error
      );

      setMyRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    fetchMyRequests();
  }, [user?.id]);

  /* =========================================================
     DONOR MATCHING
  ========================================================= */

  const fetchMatchingRequests = async () => {
    if (
      !user?.id ||
      accountType !== "donor"
    ) {
      setMatchingRequests([]);
      return;
    }

    if (!bloodGroup) {
      setMatchingRequests([]);
      setMatchingError(
        "Complete your blood group in your profile to see compatible requests."
      );
      return;
    }

    setMatchingLoading(true);
    setMatchingError("");

    try {
      const donorLatitude =
        profile?.latitude != null &&
        String(profile.latitude).trim() !== ""
          ? Number(profile.latitude)
          : null;

      const donorLongitude =
        profile?.longitude != null &&
        String(profile.longitude).trim() !== ""
          ? Number(profile.longitude)
          : null;

      const {
        data,
        error,
      } = await supabase.rpc(
        "get_matching_blood_requests",
        {
          donor_blood_group: bloodGroup,
          donor_latitude:
            Number.isFinite(donorLatitude)
              ? donorLatitude
              : null,
          donor_longitude:
            Number.isFinite(donorLongitude)
              ? donorLongitude
              : null,
        }
      );

      if (error) {
        console.error(
          "Donor matching error:",
          error
        );

        setMatchingRequests([]);

        setMatchingError(
          "Unable to load nearby blood requests right now. Please try again."
        );

        return;
      }

      setMatchingRequests(
        data || []
      );
    } catch (error) {
      console.error(
        "Unexpected donor matching error:",
        error
      );

      setMatchingRequests([]);

      setMatchingError(
        "Unable to load nearby blood requests right now. Please try again."
      );
    } finally {
      setMatchingLoading(false);
    }
  };

  /* =========================================================
     DONOR RESPONSE FETCH
  ========================================================= */

  const fetchDonationResponses = async () => {
    if (!user?.id || accountType !== "donor") {
      setDonationResponses([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("blood_request_responses")
        .select("id, request_id, donor_id, status, created_at")
        .eq("donor_id", user.id);

      if (error) {
        console.error("Donation responses fetch error:", error);
        setDonationResponses([]);
        return;
      }

      setDonationResponses(data || []);
    } catch (error) {
      console.error("Unexpected donation responses error:", error);
      setDonationResponses([]);
    }
  };

  /* =========================================================
     RECIPIENT RESPONSE FETCH
  ========================================================= */

  const fetchRecipientResponses = async () => {
    if (!user?.id || accountType !== "recipient") {
      setRecipientResponses([]);
      return;
    }

    setRecipientResponsesLoading(true);

    try {
      // Primary source: server-side RPC. This keeps donor GPS/contact data private.
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "get_request_donation_responses",
        { recipient_id: user.id }
      );

      if (!rpcError && Array.isArray(rpcData) && rpcData.length > 0) {
        setRecipientResponses(rpcData);
        return;
      }

      if (rpcError) {
        console.error("Recipient responses RPC error:", rpcError);
      }

      // Fallback: verify that the response row exists even when the RPC has
      // not been updated correctly in Supabase yet. We intentionally do not
      // expose donor profile/GPS data in this fallback.
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("blood_request_responses")
        .select(`
          id,
          request_id,
          status,
          created_at,
          blood_requests!inner(
            requester_id
          )
        `)
        .eq("blood_requests.requester_id", user.id)
        .order("created_at", { ascending: false });

      if (fallbackError) {
        console.error("Recipient responses fallback error:", fallbackError);
        setRecipientResponses([]);
        return;
      }

      setRecipientResponses(
        (fallbackData || []).map((response) => ({
          response_id: response.id,
          request_id: response.request_id,
          status: response.status,
          created_at: response.created_at,
          distance_km: null,
        }))
      );
    } catch (error) {
      console.error("Unexpected recipient responses error:", error);
      setRecipientResponses([]);
    } finally {
      setRecipientResponsesLoading(false);
    }
  };

  /* =========================================================
     PRIVATE DONATION CHAT
  ========================================================= */

  const fetchChatMessages = async (responseId) => {
    if (!responseId || !user?.id) return;

    setChatLoading(true);
    setChatError("");

    try {
      const { data, error } = await supabase
        .from("donation_messages")
        .select("id, response_id, sender_id, message, created_at")
        .eq("response_id", responseId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Chat fetch error:", error);
        setChatMessages([]);
        setChatError("Unable to load this conversation right now. Please try again.");
        return;
      }

      setChatMessages(data || []);
    } catch (error) {
      console.error("Unexpected chat fetch error:", error);
      setChatMessages([]);
      setChatError("Unable to load this conversation right now. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  const openDonationChat = async (responseLike) => {
    if (!user?.id || !responseLike?.response_id) return;

    setChatError("");

    try {
      // Recipient RPC results intentionally contain no donor contact details.
      // Fetch only the response UUID and donor UUID needed to authorize the chat.
      const { data, error } = await supabase
        .from("blood_request_responses")
        .select("id, request_id, donor_id, status")
        .eq("id", responseLike.response_id)
        .maybeSingle();

      if (error || !data) {
        console.error("Open chat response error:", error);
        setChatError("This conversation is not available right now.");
        return;
      }

      const response = {
        ...responseLike,
        response_id: data.id,
        request_id: data.request_id,
        donor_id: data.donor_id,
        status: data.status,
      };

      setSelectedResponse(response);
      setChatOpen(true);
      await fetchChatMessages(data.id);
    } catch (error) {
      console.error("Unexpected open chat error:", error);
      setChatError("Unable to open this conversation right now.");
    }
  };

  const closeDonationChat = () => {
    setChatOpen(false);
    setSelectedResponse(null);
    setChatMessages([]);
    setChatText("");
    setChatError("");
  };

  const handleSendChatMessage = async (e) => {
    e?.preventDefault?.();

    const message = chatText.trim();

    if (!user?.id || !selectedResponse?.response_id || !message) {
      return;
    }

    if (message.length > 1000) {
      setChatError("Please keep messages under 1000 characters.");
      return;
    }

    setChatSending(true);
    setChatError("");

    try {
      const { data, error } = await supabase
        .from("donation_messages")
        .insert([
          {
            response_id: selectedResponse.response_id,
            sender_id: user.id,
            message,
          },
        ])
        .select("id, response_id, sender_id, message, created_at")
        .maybeSingle();

      if (error) {
        console.error("Chat send error:", error);
        setChatError("Your message could not be sent. Please try again.");
        return;
      }

      if (data) {
        setChatMessages((previous) => [
          ...previous,
          data,
        ]);
        setChatText("");
      }
    } catch (error) {
      console.error("Unexpected chat send error:", error);
      setChatError("Your message could not be sent. Please try again.");
    } finally {
      setChatSending(false);
    }
  };

  const handleAcceptDonor = async (responseId) => {
    if (!user?.id || !responseId || accountType !== "recipient") {
      return;
    }

    try {
      const { data, error } = await supabase.rpc(
        "accept_donation_response",
        { response_id: responseId }
      );

      if (error) {
        console.error("Accept donor error:", error);
        setChatError("Unable to accept this donor right now. Please try again.");
        return;
      }

      if (data === false) {
        setChatError("This donor response is no longer available.");
        return;
      }

      await fetchRecipientResponses();
    } catch (error) {
      console.error("Unexpected accept donor error:", error);
      setChatError("Unable to accept this donor right now. Please try again.");
    }
  };

  useEffect(() => {
    if (!chatOpen || !selectedResponse?.response_id) return;

    const interval = setInterval(() => {
      fetchChatMessages(selectedResponse.response_id);
    }, 3000);

    return () => clearInterval(interval);
  }, [chatOpen, selectedResponse?.response_id]);

  /* =========================================================
     I CAN DONATE
  ========================================================= */

  const handleICanDonate = async (requestId) => {
    if (!user?.id || !requestId) return;

    setDonationLoading(true);
    setDonationError("");

    try {
      const alreadyResponded = donationResponses.some(
        (response) => response.request_id === requestId
      );

      if (alreadyResponded) {
        setDonationError(
          "You have already responded to this blood request."
        );
        return;
      }

      const { data, error } = await supabase
        .from("blood_request_responses")
        .insert([
          {
            request_id: requestId,
            donor_id: user.id,
            status: "Interested",
          },
        ])
        .select()
        .maybeSingle();

      if (error) {
        console.error("I Can Donate error:", error);

        if (error.code === "23505") {
          setDonationError(
            "You have already responded to this request."
          );
        } else {
          setDonationError(
            "Unable to send your donation response right now. Please try again."
          );
        }

        return;
      }

      if (data) {
        setDonationResponses((previous) => [data, ...previous]);
      }
    } catch (error) {
      console.error("Unexpected I Can Donate error:", error);
      setDonationError(
        "Unable to send your donation response right now. Please try again."
      );
    } finally {
      setDonationLoading(false);
    }
  };

  useEffect(() => {
    if (accountType !== "donor") return;

    fetchDonationResponses();
  }, [user?.id, accountType]);

  useEffect(() => {
    if (accountType !== "recipient" || !user?.id) return;

    fetchRecipientResponses();

    // Refresh periodically so a recipient sees a donor response without
    // needing to leave the dashboard or manually refresh the page.
    const interval = setInterval(() => {
      fetchRecipientResponses();
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.id, accountType, myRequests.length]);

  useEffect(() => {
    if (accountType !== "donor") {
      return;
    }

    fetchMatchingRequests();
  }, [
    user?.id,
    accountType,
    bloodGroup,
    profile?.latitude,
    profile?.longitude,
  ]);

  /* =========================================================
     AUTO-FILL REQUEST DETAILS
  ========================================================= */

  useEffect(() => {
    if (
      !requestBloodGroup &&
      bloodGroup
    ) {
      setRequestBloodGroup(
        bloodGroup
      );
    }
  }, [
    bloodGroup,
    requestBloodGroup,
  ]);

  useEffect(() => {
    if (
      !requestLocation &&
      location
    ) {
      setRequestLocation(
        location
      );
    }
  }, [
    location,
    requestLocation,
  ]);

  /* =========================================================
     CREATE BLOOD REQUEST
  ========================================================= */

  const handleCreateBloodRequest = async (e) => {
    e.preventDefault();

    setRequestLoading(true);
    setRequestSuccess("");
    setRequestError("");

    if (!requestBloodGroup) {
      setRequestError(
        "Please select the required blood group."
      );

      setRequestLoading(false);
      return;
    }

    if (!requestLocation.trim()) {
      setRequestError(
        "Please enter the location where blood support is needed."
      );

      setRequestLoading(false);
      return;
    }

    const latitude =
      profile?.latitude != null
        ? String(profile.latitude)
        : null;

    const longitude =
      profile?.longitude != null
        ? String(profile.longitude)
        : null;

    try {
      const {
        data,
        error,
      } = await supabase
        .from("blood_requests")
        .insert([
          {
            requester_id: user.id,
            blood_group: requestBloodGroup,
            location: requestLocation.trim(),
            latitude,
            longitude,
            required_date:
              requestRequiredDate || null,
            urgency: requestUrgency,
            message:
              requestMessage.trim() ||
              null,
            status: "Open",
          },
        ])
        .select()
        .maybeSingle();

      if (error) {
        console.error(
          "Blood request create error:",
          error
        );

        setRequestError(
          `Unable to create your blood request: ${
            error.message ||
            "Unknown Supabase error"
          }`
        );

        return;
      }

      setRequestSuccess(
        "Your blood request has been created successfully. We can now use it for donor matching. ❤️"
      );

      setRequestRequiredDate("");
      setRequestUrgency("Normal");
      setRequestMessage("");

      if (data) {
        setMyRequests((previous) => [
          data,
          ...previous,
        ]);
      } else {
        await fetchMyRequests();
      }
    } catch (error) {
      console.error(
        "Unexpected blood request create error:",
        error
      );

      setRequestError(
        `Unable to create your blood request: ${
          error.message ||
          "Unknown error"
        }`
      );
    } finally {
      setRequestLoading(false);
    }
  };

  /* =========================================================
     CANCEL BLOOD REQUEST
  ========================================================= */

  const handleCancelBloodRequest = async (
    requestId
  ) => {
    if (!requestId) return;

    setRequestError("");
    setRequestSuccess("");

    try {
      const { error } =
        await supabase
          .from("blood_requests")
          .update({
            status: "Cancelled",
          })
          .eq("id", requestId)
          .eq("requester_id", user.id);

      if (error) {
        console.error(
          "Blood request cancel error:",
          error
        );

        setRequestError(
          `Unable to cancel this request: ${
            error.message ||
            "Unknown Supabase error"
          }`
        );

        return;
      }

      setMyRequests((previous) =>
        previous.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: "Cancelled",
              }
            : request
        )
      );

      setRequestSuccess(
        "Blood request cancelled successfully."
      );
    } catch (error) {
      console.error(
        "Unexpected blood request cancel error:",
        error
      );

      setRequestError(
        `Unable to cancel this request: ${
          error.message ||
          "Unknown error"
        }`
      );
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );
    }

    onLogout();
    navigate("home");
  };

  /* =========================================================
     DISPLAY DATA
  ========================================================= */

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    "Donor";

  const displayEmail =
    profile?.email ||
    user?.email ||
    "No email";

  const memberSince =
    profile?.created_at
      ? new Date(
          profile.created_at
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "Recently";

  const formattedAccountType =
    accountType
      .charAt(0)
      .toUpperCase() +
    accountType.slice(1);

  const profileCompletion =
    useMemo(() => {
      const fields = [
        Boolean(bloodGroup),
        Boolean(phone),
        Boolean(location),
        Boolean(lastDonationDate),
        profile?.latitude != null &&
          profile?.longitude != null,
      ];

      const completed =
        fields.filter(Boolean).length;

      return Math.round(
        (completed /
          fields.length) *
          100
      );
    }, [
      bloodGroup,
      phone,
      location,
      lastDonationDate,
      profile?.latitude,
      profile?.longitude,
    ]);

  /* =========================================================
     DASHBOARD LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="dashboard-page">

        <div className="dashboard-loading">

          <div className="loading-heart">
            ♥
          </div>

          <p className="eyebrow">
            HOPE2LIVE
          </p>

          <h2>
            Preparing your dashboard...
          </h2>

          <p>
            Loading your profile details
            securely.
          </p>

          <div className="loading-bar">
            <span></span>
          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="dashboard-page">

      {/* DASHBOARD HEADER */}

      <div className="dashboard-header">

        <div>

          <div className="dashboard-heading-badge">
            <span></span>
            HOPE2LIVE DASHBOARD
          </div>

          <h1>
            Welcome,
            <span>
              {" "}
              {displayName}
            </span>
            {" "}❤️
          </h1>

          <p>
            Your willingness to donate can make
            a real difference in someone's life.
          </p>

        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Log out
          <span>↗</span>
        </button>

      </div>

      {profileWarning && (
        <div className="dashboard-warning">
          <span>!</span>

          <div>
            <strong>
              Profile information
            </strong>

            <p>
              {profileWarning}
            </p>
          </div>
        </div>
      )}

      {/* STATS */}

      <section className="donor-stats">

        <Reveal>
          <div className="donor-stat-card">

            <div className="dashboard-icon">
              🩸
            </div>

            <div>
              <span className="stat-label">
                ACCOUNT TYPE
              </span>

              <strong>
                {formattedAccountType}
              </strong>
            </div>

          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="donor-stat-card">

            <div className="dashboard-icon">
              ✉
            </div>

            <div>
              <span className="stat-label">
                EMAIL
              </span>

              <strong>
                {displayEmail}
              </strong>
            </div>

          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="donor-stat-card">

            <div className="dashboard-icon">
              📅
            </div>

            <div>
              <span className="stat-label">
                MEMBER SINCE
              </span>

              <strong>
                {memberSince}
              </strong>
            </div>

          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="donor-stat-card completion-stat">

            <div className="completion-ring">
              <span>
                {profileCompletion}%
              </span>
            </div>

            <div>
              <span className="stat-label">
                PROFILE
              </span>

              <strong>
                {profileCompletion === 100
                  ? "Complete"
                  : "In progress"}
              </strong>
            </div>

          </div>
        </Reveal>

      </section>

      {/* MAIN DASHBOARD */}

      <section className="donor-dashboard-grid">

        <Reveal className="dashboard-info-card donor-welcome-card">

          <div className="donor-card-icon">
            ❤️
          </div>

          <p className="eyebrow">
            MAKE AN IMPACT
          </p>

          <h2>
            Your presence can
            save a life.
          </h2>

          <p>
            Keep your donor profile updated so
            potential blood requests can become
            more relevant to you.
          </p>

          <div className="availability-status">

            <span
              className="status-dot"
              style={{
                background:
                  availability
                    ? "#7ee787"
                    : "#ffb4b4",
              }}
            ></span>

            <span>
              {availability
                ? "Available to help"
                : "Currently unavailable"}
            </span>

          </div>

          <div className="welcome-card-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </Reveal>

        {/* PROFILE */}

        <Reveal
          className="dashboard-info-card donor-profile-card"
          delay={100}
        >

          <div className="form-card-heading">

            <div>
              <p className="eyebrow">
                YOUR PROFILE
              </p>

              <h2>
                Donor information
              </h2>
            </div>

            <div className="profile-form-icon">
              ✦
            </div>

          </div>

          {saveMessage && (
            <div className="success-message-small">
              <span>✓</span>
              {saveMessage}
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              <span>!</span>
              {errorMessage}
            </div>
          )}

          <form
            className="profile-form"
            onSubmit={handleSaveProfile}
          >

            <div className="profile-form-grid">

              <label>
                Blood group

                <select
                  value={bloodGroup}
                  onChange={(e) =>
                    setBloodGroup(
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select blood group
                  </option>

                  <option value="A+">
                    A+
                  </option>

                  <option value="A-">
                    A-
                  </option>

                  <option value="B+">
                    B+
                  </option>

                  <option value="B-">
                    B-
                  </option>

                  <option value="AB+">
                    AB+
                  </option>

                  <option value="AB-">
                    AB-
                  </option>

                  <option value="O+">
                    O+
                  </option>

                  <option value="O-">
                    O-
                  </option>
                </select>
              </label>

              <label>
                Phone number

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Enter phone number"
                />
              </label>

            </div>

            <label>
              Location

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                placeholder="e.g. Dehradun, Uttarakhand"
              />
            </label>

            <button
              type="button"
              className="location-button"
              onClick={handleGetLocation}
              disabled={gettingLocation}
            >
              <span className="location-button-icon">
                {gettingLocation
                  ? "◌"
                  : "⌖"}
              </span>

              <span>
                {gettingLocation
                  ? "Detecting your location..."
                  : "Use my current location"}

                <small>
                  {gettingLocation
                    ? "Please allow browser location access"
                    : "Save your GPS coordinates"}
                </small>
              </span>

              {!gettingLocation && (
                <span className="location-arrow">
                  →
                </span>
              )}
            </button>

            <label>
              Last blood donation date

              <input
                type="date"
                value={
                  lastDonationDate
                }
                onChange={(e) =>
                  setLastDonationDate(
                    e.target.value
                  )
                }
              />
            </label>

            <label className="availability-toggle">

              <input
                type="checkbox"
                checked={Boolean(availability)}
                onChange={(e) =>
                  setAvailability(
                    e.target.checked
                  )
                }
              />

              <span className="availability-switch">
                <span></span>
              </span>

              <span className="availability-copy">
                <strong>
                  Available for donation
                </strong>

                <small>
                  Let Hope2Live know that you
                  are currently available.
                </small>
              </span>

            </label>

            <button
              className="primary-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving profile..."
                : "Save donor profile"}

              {!saving && (
                <span>→</span>
              )}
            </button>

          </form>

        </Reveal>

      </section>

      {/* PROFILE SUMMARY */}

      <Reveal className="dashboard-info-card profile-summary-card">

        <div className="form-card-heading">

          <div>
            <p className="eyebrow">
              PROFILE SUMMARY
            </p>

            <h2>
              Your donor details
            </h2>
          </div>

          <div className="summary-live">
            <span></span>
            PROFILE
          </div>

        </div>

        <div className="profile-summary-grid">

          <div className="profile-summary-item">
            <span>Full name</span>
            <strong>
              {displayName}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Email</span>
            <strong>
              {displayEmail}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Blood group</span>
            <strong>
              {bloodGroup ||
                "Not added"}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Phone</span>
            <strong>
              {phone ||
                "Not added"}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Location</span>
            <strong>
              {location ||
                "Not added"}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Availability</span>
            <strong>
              {availability
                ? "Available"
                : "Unavailable"}
            </strong>
          </div>

          <div className="profile-summary-item">
            <span>Last donation</span>

            <strong>
              {lastDonationDate
                ? new Date(
                    lastDonationDate +
                      "T00:00:00"
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "Not added"}
            </strong>
          </div>

          <div className="profile-summary-item">

            <span>
              GPS status
            </span>

            <strong
              className={
                profile?.latitude != null &&
                profile?.longitude != null
                  ? "gps-saved"
                  : ""
              }
            >
              {profile?.latitude != null &&
              profile?.longitude != null
                ? "Location saved 📍"
                : "Not saved"}
            </strong>

          </div>

        </div>

      </Reveal>

      {/* BLOOD REQUEST */}

      {accountType === "recipient" && (
        <section className="donor-request-section">

          <Reveal className="section-heading">

            <div>
              <p className="eyebrow">
                NEED BLOOD SUPPORT
              </p>

              <h2>
                Create a blood request
              </h2>
            </div>

          </Reveal>

          <Reveal
            className="dashboard-info-card donor-profile-card"
            delay={100}
          >

            <div className="form-card-heading">

              <div>
                <p className="eyebrow">
                  REQUEST DETAILS
                </p>

                <h2>
                  Tell potential donors what you need
                </h2>
              </div>

              <div className="profile-form-icon">
                🩸
              </div>

            </div>

            {requestSuccess && (
              <div className="success-message-small">
                <span>✓</span>
                {requestSuccess}
              </div>
            )}

            {requestError && (
              <div className="error-message">
                <span>!</span>
                {requestError}
              </div>
            )}

            <form
              className="profile-form"
              onSubmit={handleCreateBloodRequest}
            >

              <div className="profile-form-grid">

                <label>
                  Required blood group

                  <select
                    value={requestBloodGroup}
                    onChange={(e) =>
                      setRequestBloodGroup(
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">
                      Select blood group
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>
                  </select>
                </label>

                <label>
                  Urgency

                  <select
                    value={requestUrgency}
                    onChange={(e) =>
                      setRequestUrgency(
                        e.target.value
                      )
                    }
                  >
                    <option value="Normal">
                      Normal
                    </option>

                    <option value="Urgent">
                      Urgent
                    </option>

                    <option value="Emergency">
                      Emergency
                    </option>
                  </select>
                </label>

              </div>

              <label>
                Where is blood needed?

                <input
                  type="text"
                  value={requestLocation}
                  onChange={(e) =>
                    setRequestLocation(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Dehradun, Uttarakhand"
                  required
                />
              </label>

              <button
                type="button"
                className="location-button"
                onClick={handleRequestLocation}
                disabled={requestGettingLocation}
              >
                <span className="location-button-icon">
                  {requestGettingLocation
                    ? "◌"
                    : "⌖"}
                </span>

                <span>
                  {requestGettingLocation
                    ? "Detecting your location..."
                    : "Use my current location"}

                  <small>
                    {requestGettingLocation
                      ? "Please allow browser location access"
                      : "Attach your GPS position to this request"}
                  </small>
                </span>

                {!requestGettingLocation && (
                  <span className="location-arrow">
                    →
                  </span>
                )}
              </button>

              <label>
                Required date

                <input
                  type="date"
                  value={requestRequiredDate}
                  onChange={(e) =>
                    setRequestRequiredDate(
                      e.target.value
                    )
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </label>

              <label>
                Message

                <textarea
                  value={requestMessage}
                  onChange={(e) =>
                    setRequestMessage(
                      e.target.value
                    )
                  }
                  placeholder="Add hospital details, units needed, or any other useful information..."
                  rows="5"
                />
              </label>

              <button
                className="primary-button"
                type="submit"
                disabled={requestLoading}
              >
                {requestLoading
                  ? "Creating blood request..."
                  : "Create blood request"}

                {!requestLoading && (
                  <span>→</span>
                )}
              </button>

            </form>

          </Reveal>

        </section>
      )}

      {/* MY BLOOD REQUESTS */}

      {accountType === "recipient" && (
        <section className="donor-request-section">

          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">
                YOUR REQUESTS
              </p>

              <h2>
                Blood requests you created
              </h2>
            </div>
          </Reveal>

          {requestsLoading ? (
            <Reveal className="empty-request-card">

              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>◌</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                Loading your requests...
              </h3>

              <p>
                Please wait while we load your blood request history.
              </p>

            </Reveal>
          ) : myRequests.length === 0 ? (
            <Reveal className="empty-request-card">

              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>🩸</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                You have not created a request yet.
              </h3>

              <p>
                Create your first blood request above when support is needed.
              </p>

            </Reveal>
          ) : (
            <div className="donor-dashboard-grid">

              {myRequests.map((request) => (
                <Reveal key={request.id}>

                  <div className="dashboard-info-card donor-welcome-card">

                    <div className="donor-card-icon">
                      {request.urgency ===
                      "Emergency"
                        ? "🚨"
                        : "🩸"}
                    </div>

                    <p className="eyebrow">
                      {request.urgency ||
                        "NORMAL"}{" "}
                      REQUEST
                    </p>

                    <h2>
                      {request.blood_group} blood needed
                    </h2>

                    <p>
                      📍 {request.location}
                    </p>

                    {request.required_date && (
                      <p>
                        📅 Needed by{" "}
                        {new Date(
                          request.required_date +
                            "T00:00:00"
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}

                    {request.message && (
                      <p>
                        {request.message}
                      </p>
                    )}

                    <div className="availability-status">

                      <span
                        className="status-dot"
                        style={{
                          background:
                            request.status ===
                            "Open"
                              ? "#7ee787"
                              : "#ffb4b4",
                        }}
                      ></span>

                      <span>
                        Status:{" "}
                        {request.status}
                      </span>

                    </div>

                    {request.status ===
                      "Open" && (
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          handleCancelBloodRequest(
                            request.id
                          )
                        }
                      >
                        Cancel request
                      </button>
                    )}

                  </div>

                </Reveal>
              ))}

            </div>
          )}

        </section>
      )}

      {/* DONOR RESPONSES */}

      {accountType === "recipient" && (
        <section className="donor-request-section">

          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">
                DONOR RESPONSES
              </p>

              <h2>
                People willing to donate
              </h2>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={fetchRecipientResponses}
              disabled={recipientResponsesLoading}
            >
              {recipientResponsesLoading
                ? "Refreshing..."
                : "Refresh responses ↻"}
            </button>
          </Reveal>

          {recipientResponsesLoading ? (
            <Reveal className="empty-request-card">
              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>♥</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                Checking donor responses...
              </h3>

              <p>
                Please wait while we check for new donation responses.
              </p>
            </Reveal>
          ) : recipientResponses.length === 0 ? (
            <Reveal className="empty-request-card">
              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>♥</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                No donor responses yet.
              </h3>

              <p>
                When a compatible donor chooses "I Can Donate", their response will appear here.
              </p>
            </Reveal>
          ) : (
            <div className="donor-dashboard-grid">
              {recipientResponses.map((response) => (
                <Reveal key={response.response_id}>
                  <div className="dashboard-info-card donor-welcome-card">
                    <div className="donor-card-icon">
                      ❤️
                    </div>

                    <p className="eyebrow">
                      DONOR RESPONSE
                    </p>

                    <h2>
                      A donor is willing to donate
                    </h2>

                    <p>
                      🩸 Compatible donor response
                    </p>

                    {response.distance_km != null &&
                      Number.isFinite(Number(response.distance_km)) && (
                        <p>
                          📏 {Number(response.distance_km).toFixed(1)} km away
                        </p>
                      )}

                    <div className="availability-status">
                      <span
                        className="status-dot"
                        style={{
                          background:
                            response.status === "Accepted"
                              ? "#7ee787"
                              : "#ffd166",
                        }}
                      ></span>

                      <span>
                        {response.status === "Accepted"
                          ? "Donor accepted — you can coordinate now"
                          : "Donation interest received"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "16px",
                      }}
                    >
                      {response.status !== "Accepted" && (
                        <button
                          type="button"
                          className="primary-button"
                          onClick={() =>
                            handleAcceptDonor(response.response_id)
                          }
                        >
                          Accept donor
                          <span>✓</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => openDonationChat(response)}
                      >
                        💬 Open private chat
                      </button>
                    </div>

                    <p
                      style={{
                        marginTop: "12px",
                        opacity: 0.75,
                      }}
                    >
                      🔒 No phone numbers or exact GPS locations are shared.
                      Use the private chat to agree on a safe public meeting point.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

        </section>
      )}

      {/* DONOR MATCHING */}

      {accountType === "donor" && (
        <section className="donor-request-section">

          <Reveal className="section-heading">

            <div>
              <p className="eyebrow">
                SMART MATCHING
              </p>

              <h2>
                Nearby blood requests
              </h2>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={
                fetchMatchingRequests
              }
              disabled={matchingLoading}
            >
              {matchingLoading
                ? "Refreshing..."
                : "Refresh matches ↻"}
            </button>

          </Reveal>

          {donationError && (
            <div className="error-message">
              <span>!</span>
              {donationError}
            </div>
          )}

          {matchingLoading ? (
            <Reveal
              className="empty-request-card"
              delay={100}
            >

              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>⌖</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                Finding compatible requests...
              </h3>

              <p>
                We are checking blood-group compatibility
                and nearby request locations.
              </p>

            </Reveal>
          ) : matchingError ? (
            <Reveal
              className="empty-request-card"
              delay={100}
            >

              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>!</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                Complete your donor profile
              </h3>

              <p>
                {matchingError}
              </p>

            </Reveal>
          ) : matchingRequests.length === 0 ? (
            <Reveal
              className="empty-request-card"
              delay={100}
            >

              <div className="nearby-visual">
                <div className="nearby-ring ring-one"></div>
                <div className="nearby-ring ring-two"></div>
                <span>⌖</span>
                <div className="nearby-pulse"></div>
              </div>

              <h3>
                No compatible requests nearby yet.
              </h3>

              <p>
                We will show open requests that are
                compatible with your blood group here.
                Check again later for new requests.
              </p>

            </Reveal>
          ) : (
            <div className="donor-dashboard-grid">

              {matchingRequests.map(
                (request) => (
                  <Reveal key={request.id}>

                    <div className="dashboard-info-card donor-welcome-card">

                      <div className="donor-card-icon">
                        {request.urgency ===
                          "Critical" ||
                        request.urgency ===
                          "Emergency"
                          ? "🚨"
                          : "🩸"}
                      </div>

                      <p className="eyebrow">
                        {request.urgency ||
                          "NORMAL"}{" "}
                        REQUEST
                      </p>

                      <h2>
                        {request.blood_group} blood needed
                      </h2>

                      <p>
                        📍 Nearby support area
                      </p>

                      {request.distance_km !=
                        null &&
                        Number.isFinite(
                          Number(
                            request.distance_km
                          )
                        ) && (
                          <p>
                            📏{" "}
                            {Number(
                              request.distance_km
                            ).toFixed(1)}{" "}
                            km away
                          </p>
                        )}

                      {request.required_date && (
                        <p>
                          📅 Needed by{" "}
                          {new Date(
                            request.required_date +
                              "T00:00:00"
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      )}

                      {request.message && (
                        <p>
                          {request.message}
                        </p>
                      )}

                      <div className="availability-status">

                        <span
                          className="status-dot"
                          style={{
                            background:
                              "#7ee787",
                          }}
                        ></span>

                        <span>
                          Open request • Compatible
                          with {bloodGroup}
                        </span>

                      </div>

                      {(() => {
                        const matchingResponse = donationResponses.find(
                          (response) => response.request_id === request.id
                        );

                        return matchingResponse ? (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                              marginTop: "4px",
                            }}
                          >
                            <button
                              type="button"
                              className="primary-button"
                              disabled
                            >
                              ✓ Donation response sent
                            </button>

                            <button
                              type="button"
                              className="secondary-button"
                              onClick={() =>
                                openDonationChat({
                                  response_id: matchingResponse.id,
                                  request_id: matchingResponse.request_id,
                                  status: matchingResponse.status,
                                  distance_km: request.distance_km,
                                })
                              }
                            >
                              💬 Open private chat
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="primary-button"
                            onClick={() => handleICanDonate(request.id)}
                            disabled={donationLoading}
                          >
                            {donationLoading ? "Sending..." : "I Can Donate"}
                            {!donationLoading && <span>→</span>}
                          </button>
                        );
                      })()}

                    </div>

                  </Reveal>
                )
              )}

            </div>
          )}

        </section>
      )}

      {chatOpen && selectedResponse && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Private donation chat"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10, 12, 20, 0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px",
          }}
        >
          <div
            style={{
              width: "min(680px, 100%)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              background: "var(--surface, #fff)",
              color: "var(--text, #171717)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,.28)",
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid rgba(127,127,127,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>
                  PRIVATE DONATION CHAT
                </p>
                <h2 style={{ margin: "4px 0 0" }}>
                  Coordinate the donation 💬
                </h2>
                {selectedResponse.distance_km != null &&
                  Number.isFinite(Number(selectedResponse.distance_km)) && (
                    <p style={{ margin: "5px 0 0", opacity: 0.72 }}>
                      📏 Approximately {Number(selectedResponse.distance_km).toFixed(1)} km apart
                    </p>
                  )}
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={closeDonationChat}
                aria-label="Close private chat"
              >
                ✕
              </button>
            </div>

            <div
              style={{
                padding: "12px 20px",
                background: "rgba(126, 231, 135, 0.10)",
                borderBottom: "1px solid rgba(127,127,127,.12)",
              }}
            >
              <strong>📍 Meeting point</strong>
              <span style={{ marginLeft: "8px", opacity: 0.78 }}>
                Agree on a hospital, blood bank, clinic, or other safe public place in chat.
              </span>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "18px 20px",
                minHeight: "280px",
                maxHeight: "48vh",
              }}
            >
              {chatLoading ? (
                <p style={{ textAlign: "center", opacity: 0.7 }}>
                  Loading conversation...
                </p>
              ) : chatMessages.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 10px", opacity: 0.72 }}>
                  <div style={{ fontSize: "34px" }}>💬</div>
                  <h3>Start the conversation</h3>
                  <p>Ask where to meet, confirm timing, or share the blood-bank details.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {chatMessages.map((message) => {
                    const mine = message.sender_id === user?.id;

                    return (
                      <div
                        key={message.id}
                        style={{
                          alignSelf: mine ? "flex-end" : "flex-start",
                          maxWidth: "82%",
                          padding: "10px 13px",
                          borderRadius: mine
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                          background: mine
                            ? "rgba(210, 61, 78, 0.12)"
                            : "rgba(127, 127, 127, 0.10)",
                        }}
                      >
                        <div style={{ fontSize: "13px", opacity: 0.62, marginBottom: "3px" }}>
                          {mine ? "You" : accountType === "recipient" ? "Donor" : "Recipient"}
                        </div>
                        <div style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                          {message.message}
                        </div>
                        <div style={{ fontSize: "11px", opacity: 0.52, marginTop: "4px" }}>
                          {message.created_at
                            ? new Date(message.created_at).toLocaleTimeString("en-IN", {
                                hour: "numeric",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {chatError && (
              <div
                className="error-message"
                style={{ margin: "0 20px 10px" }}
              >
                <span>!</span>
                {chatError}
              </div>
            )}

            <form
              onSubmit={handleSendChatMessage}
              style={{
                padding: "14px 20px 18px",
                borderTop: "1px solid rgba(127,127,127,.18)",
                display: "flex",
                gap: "10px",
                alignItems: "flex-end",
              }}
            >
              <textarea
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Type a message… e.g. Where should we meet?"
                maxLength={1000}
                rows={2}
                style={{
                  flex: 1,
                  minWidth: 0,
                  resize: "vertical",
                  borderRadius: "14px",
                  border: "1px solid rgba(127,127,127,.25)",
                  padding: "11px 12px",
                  font: "inherit",
                }}
              />

              <button
                type="submit"
                className="primary-button"
                disabled={chatSending || !chatText.trim()}
              >
                {chatSending ? "Sending..." : "Send ↑"}
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({ navigate }) {
  return (
    <footer className="footer">

      <div className="footer-glow"></div>

      <div className="footer-inner">

        <div className="footer-brand-area">

          <Logo
            navigate={navigate}
            dark
          />

          <p>
            Connecting people.
            <br />
            Creating hope.
            <br />
            Saving lives.
          </p>

          <div className="footer-heart-line">
            <span></span>

            <small>
              Made with purpose
            </small>

            <span></span>
          </div>

        </div>

        <div className="footer-column">

          <p>
            EXPLORE
          </p>

          <button
            onClick={() =>
              navigate("home")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              navigate("support")
            }
          >
            Find Support
          </button>

          <button
            onClick={() =>
              navigate("how")
            }
          >
            How It Works
          </button>

          <button
            onClick={() =>
              navigate("about")
            }
          >
            About
          </button>

        </div>

        <div className="footer-column">

          <p>
            GET INVOLVED
          </p>

          <button
            onClick={() =>
              navigate("signup")
            }
          >
            Become a donor
          </button>

          <button
            onClick={() =>
              navigate("support")
            }
          >
            Request support
          </button>

          <button
            onClick={() =>
              navigate("login")
            }
          >
            Log in
          </button>

        </div>

        <div className="footer-mini-card">

          <span className="footer-mini-icon">
            ♥
          </span>

          <strong>
            Every connection
            starts with hope.
          </strong>

          <small>
            Hope2Live
          </small>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Hope2Live.
          All rights reserved.
        </span>

        <span>
          Every connection starts with hope. ♥
        </span>

      </div>

    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] =
    useState("home");

  const [user, setUser] =
    useState(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    /*
      SESSION FIRST

      This is intentionally using getSession()
      so the UI waits for Supabase auth state
      before deciding whether the user is logged in.
    */

    const loadSession = async () => {
      try {
        const {
          data: {
            session,
          },
        } =
          await supabase.auth.getSession();

        if (!mounted) return;

        setUser(
          session?.user || null
        );
      } catch (error) {
        console.error(
          "Session loading error:",
          error
        );

        if (!mounted) return;

        setUser(null);
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    loadSession();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!mounted) return;

          setUser(
            session?.user || null
          );

          setAuthLoading(false);
        }
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const navigate = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    Prevents the application from briefly showing
    Login before Supabase restores the existing session.
  */

  if (authLoading) {
    return (
      <main className="app-loading-screen">

        <div className="app-loading-logo">

          <div className="app-loading-mark">
            <span>♥</span>
          </div>

          <div>
            Hope<span>2</span>Live
          </div>

        </div>

        <div className="app-loading-line">
          <span></span>
        </div>

        <p>
          Preparing your Hope2Live experience...
        </p>

      </main>
    );
  }

  let content;

  switch (page) {
    case "support":
      content = (
        <SupportPage />
      );
      break;

    case "how":
      content = (
        <HowItWorksPage />
      );
      break;

    case "about":
      content = (
        <AboutPage />
      );
      break;

    case "login":
      content = (
        <LoginPage
          navigate={navigate}
          onLogin={setUser}
        />
      );
      break;

    case "signup":
      content = (
        <SignupPage
          navigate={navigate}
          onLogin={setUser}
        />
      );
      break;

    case "dashboard":

      if (!user) {
        content = (
          <LoginPage
            navigate={navigate}
            onLogin={setUser}
          />
        );
      } else {
        content = (
          <DashboardPage
            user={user}
            navigate={navigate}
            onLogout={() =>
              setUser(null)
            }
          />
        );
      }

      break;

    case "home":

    default:
      content = (
        <HomePage
          navigate={navigate}
        />
      );

      break;
  }

  const authPage =
    page === "login" ||
    page === "signup";

  return (
    <div className="app">

      {!authPage && (
        <Navbar
          navigate={navigate}
          user={user}
          page={page}
        />
      )}

      {content}

      {!authPage && (
        <Footer
          navigate={navigate}
        />
      )}

    </div>
  );
}

export default App;