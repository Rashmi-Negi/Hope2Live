import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function Logo({ onClick }) {
  return (
    <button className="brand" onClick={onClick} aria-label="Hope2Live home">
      <span className="brand-icon">♡</span>

      <span className="brand-name">
        Hope<span>2</span>Live
      </span>
    </button>
  );
}

function Navbar({ page, navigate, user }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Logo onClick={() => navigate("home")} />

        <nav className="nav-links">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button
            className={page === "support" ? "active" : ""}
            onClick={() => navigate("support")}
          >
            Find support
          </button>

          <button
            className={page === "how" ? "active" : ""}
            onClick={() => navigate("how")}
          >
            How it works
          </button>

          <button
            className={page === "about" ? "active" : ""}
            onClick={() => navigate("about")}
          >
            About us
          </button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <button
              className="nav-dashboard"
              onClick={() => navigate("dashboard")}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                className="nav-login"
                onClick={() => navigate("login")}
              >
                Log in
              </button>

              <button
                className="nav-join"
                onClick={() => navigate("signup")}
              >
                Join us
              </button>
            </>
          )}
        </div>

        <button
          className="mobile-menu"
          onClick={() => navigate("support")}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            A bridge between need and generosity
          </div>

          <h1>
            One act of kindness can become someone’s{" "}
            <span>reason to hope.</span>
          </h1>

          <p className="hero-description">
            Hope2Live connects people who want to help with people who need
            support—turning kindness into real impact.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => navigate("support")}
            >
              Explore support requests
              <span>↗</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("signup")}
            >
              Request support
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span>R</span>
              <span>A</span>
              <span>M</span>
              <span>+</span>
            </div>

            <p>
              Built for people who care,
              <strong> and people who need care.</strong>
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-top">
              <span className="mini-label">Hope2Live connection</span>
              <span className="live-dot">● Live</span>
            </div>

            <div className="hero-illustration">
              <div className="illustration-glow" />
              <div className="illustration-circle circle-one" />
              <div className="illustration-circle circle-two" />

              <div className="heart-orbit">
                <span>♡</span>
              </div>

              <div className="person person-left">
                <div className="person-head" />
                <div className="person-body" />
              </div>

              <div className="person person-right">
                <div className="person-head" />
                <div className="person-body" />
              </div>

              <div className="connection-line">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="hero-card-bottom">
              <div>
                <h3>Every connection matters.</h3>
                <p>Small support can create a lasting difference.</p>
              </div>

              <span className="card-arrow">↗</span>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span className="floating-icon">♡</span>
            <div>
              <strong>Kindness shared</strong>
              <small>Hope created</small>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span className="check-icon">✓</span>
            <div>
              <strong>Support connected</strong>
              <small>One step closer</small>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-heading">
          <span className="section-label">ONE PLATFORM</span>

          <h2>
            Give support.
            <br />
            Receive support.
          </h2>
        </div>

        <div className="intro-copy">
          <p>
            Everyone has something to offer, and everyone deserves a chance
            to ask for help.
          </p>

          <p>
            Hope2Live makes it easier for donors, recipients, and volunteers
            to come together with trust, dignity, and purpose.
          </p>
        </div>
      </section>

      <section className="path-section">
        <div className="path-card path-card-red">
          <div className="path-number">01</div>
          <div className="path-icon">♡</div>
          <h3>I want to donate</h3>
          <p>
            Discover genuine support requests and contribute in a way that
            creates meaningful impact.
          </p>
          <button onClick={() => navigate("support")}>
            Explore requests <span>↗</span>
          </button>
        </div>

        <div className="path-card path-card-light">
          <div className="path-number">02</div>
          <div className="path-icon">＋</div>
          <h3>I need support</h3>
          <p>
            Share your situation and connect with people who are willing to
            help you move forward.
          </p>
          <button onClick={() => navigate("signup")}>
            Request support <span>↗</span>
          </button>
        </div>

        <div className="path-card path-card-dark">
          <div className="path-number">03</div>
          <div className="path-icon">✦</div>
          <h3>I want to volunteer</h3>
          <p>
            Offer your time, skills, or guidance and become part of a
            community that cares.
          </p>
          <button onClick={() => navigate("signup")}>
            Join the community <span>↗</span>
          </button>
        </div>
      </section>

      <section className="impact-section">
        <div className="impact-quote">
          <span className="quote-mark">“</span>

          <h2>
            The right help,
            <br />
            at the right time,
            <br />
            can change someone’s direction.
          </h2>

          <p>
            Hope is not just a feeling. Sometimes, hope looks like a helping
            hand, a timely contribution, or someone saying, “I’m here.”
          </p>
        </div>

        <div className="impact-stats">
          <div className="impact-stat">
            <span className="stat-icon">♡</span>
            <strong>Give with purpose</strong>
            <p>Support requests that represent real needs.</p>
          </div>

          <div className="impact-stat">
            <span className="stat-icon">◎</span>
            <strong>Ask with dignity</strong>
            <p>Share your story in a respectful environment.</p>
          </div>

          <div className="impact-stat">
            <span className="stat-icon">✦</span>
            <strong>Grow together</strong>
            <p>Build a stronger community through connection.</p>
          </div>
        </div>
      </section>

      <section className="steps-section">
        <div className="section-heading centered-heading">
          <span className="section-label">HOW IT WORKS</span>

          <h2>
            Simple steps.
            <br />
            Meaningful impact.
          </h2>
        </div>

        <div className="steps-grid">
          <div className="step-item">
            <span className="step-number">01</span>
            <div className="step-line" />
            <h3>Submit a request</h3>
            <p>
              Recipients can share what kind of support they need.
            </p>
          </div>

          <div className="step-item">
            <span className="step-number">02</span>
            <div className="step-line" />
            <h3>Connect with people</h3>
            <p>
              Donors explore requests and choose where they can help.
            </p>
          </div>

          <div className="step-item">
            <span className="step-number">03</span>
            <div className="step-line" />
            <h3>Create an impact</h3>
            <p>
              Support reaches the people and causes that need it most.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="section-label">START WITH HOPE</span>
          <h2>Ready to turn kindness into action?</h2>
          <p>
            Whether you want to give or need support, your next step starts
            here.
          </p>
        </div>

        <div className="final-cta-actions">
          <button
            className="primary-button"
            onClick={() => navigate("support")}
          >
            Find support requests <span>↗</span>
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate("signup")}
          >
            Join Hope2Live
          </button>
        </div>
      </section>
    </main>
  );
}

function SupportPage({ navigate }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("support_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }

    setLoading(false);
  }

  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="section-label">FIND SUPPORT</span>
        <h1>Every request carries a story.</h1>
        <p>
          Explore support requests and discover where your contribution can
          make a real difference.
        </p>
      </section>

      <section className="requests-section">
        {loading ? (
          <div className="empty-state">
            <div className="loader" />
            <p>Loading support requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h3>No support requests yet</h3>
            <p>
              Be the first person to create a request or check back soon.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("signup")}
            >
              Request support <span>↗</span>
            </button>
          </div>
        ) : (
          <div className="requests-grid">
            {requests.map((request) => (
              <article className="request-card" key={request.id}>
                <div className="request-card-top">
                  <span className="request-category">
                    {request.category || "General support"}
                  </span>

                  <span className="request-status">
                    {request.status || "Open"}
                  </span>
                </div>

                <h3>{request.title || "Support request"}</h3>

                <p>
                  {request.description ||
                    "Someone in the community is looking for support."}
                </p>

                <div className="request-card-bottom">
                  <span>
                    {request.location || "Community request"}
                  </span>

                  <button onClick={() => navigate("login")}>
                    View details ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function HowItWorksPage({ navigate }) {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="section-label">HOW IT WORKS</span>
        <h1>Support should feel simple and human.</h1>
        <p>
          Hope2Live brings donors and recipients together through a clear,
          respectful, and community-focused process.
        </p>
      </section>

      <section className="how-grid">
        <div className="how-card">
          <span>01</span>
          <h3>Create an account</h3>
          <p>
            Join Hope2Live as someone who wants to donate, request support, or
            volunteer.
          </p>
        </div>

        <div className="how-card">
          <span>02</span>
          <h3>Share or discover a request</h3>
          <p>
            Recipients can explain their needs while donors can explore
            requests that matter to them.
          </p>
        </div>

        <div className="how-card">
          <span>03</span>
          <h3>Connect responsibly</h3>
          <p>
            Use the platform to communicate respectfully and understand how
            support can be provided.
          </p>
        </div>

        <div className="how-card">
          <span>04</span>
          <h3>Make a difference</h3>
          <p>
            A contribution, a conversation, or a helping hand can become a
            meaningful step forward.
          </p>
        </div>
      </section>

      <section className="simple-cta">
        <h2>Ready to be part of the connection?</h2>
        <button
          className="primary-button"
          onClick={() => navigate("signup")}
        >
          Join Hope2Live <span>↗</span>
        </button>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="section-label">ABOUT HOPE2LIVE</span>
        <h1>Technology with a human purpose.</h1>
        <p>
          Hope2Live is built to make support more accessible, transparent,
          and connected.
        </p>
      </section>

      <section className="about-content">
        <div className="about-block">
          <span>Our purpose</span>
          <h2>
            To connect generosity with genuine need.
          </h2>
        </div>

        <div className="about-block">
          <p>
            We believe that asking for help should not feel isolating, and
            giving support should not feel complicated.
          </p>

          <p>
            Hope2Live creates a shared space where people can discover
            support requests, contribute with purpose, and build meaningful
            connections.
          </p>
        </div>
      </section>
    </main>
  );
}

function LoginPage({ navigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
    } else {
      onLogin(data.user);
      navigate("dashboard");
    }

    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Logo onClick={() => navigate("home")} />

        <div className="auth-heading">
          <span className="section-label">WELCOME BACK</span>
          <h1>Log in to Hope2Live</h1>
          <p>Continue your journey of giving and receiving support.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="primary-button full-button" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
            {!loading && <span>↗</span>}
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <button onClick={() => navigate("signup")}>Join us</button>
        </p>
      </div>
    </main>
  );
}

function SignupPage({ navigate, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
    } else if (data.user && !data.session) {
      setMessage(
        "Account created. Please check your email to confirm your account."
      );
    } else {
      onLogin(data.user);
      navigate("dashboard");
    }

    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card signup-card">
        <Logo onClick={() => navigate("home")} />

        <div className="auth-heading">
          <span className="section-label">JOIN THE COMMUNITY</span>
          <h1>Make hope possible.</h1>
          <p>
            Create your account and become part of the Hope2Live community.
          </p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          <label>
            I want to
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="donor">Donate and help others</option>
              <option value="recipient">Request support</option>
              <option value="volunteer">Volunteer my time or skills</option>
            </select>
          </label>

          {error && <div className="form-error">{error}</div>}
          {message && <div className="form-message">{message}</div>}

          <button className="primary-button full-button" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
            {!loading && <span>↗</span>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={() => navigate("login")}>Log in</button>
        </p>
      </div>
    </main>
  );
}

function DashboardPage({ user, navigate, onLogout }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General support");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleRequestSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const { error: insertError } = await supabase
      .from("support_requests")
      .insert({
        title,
        description,
        category,
        location,
        user_id: user.id,
        status: "Open",
      });

    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage("Your support request has been submitted.");
      setTitle("");
      setDescription("");
      setCategory("General support");
      setLocation("");
    }

    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
    navigate("home");
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <span className="section-label">YOUR DASHBOARD</span>
          <h1>Welcome to Hope2Live.</h1>
          <p>
            You are signed in as{" "}
            <strong>{user?.email || "community member"}</strong>.
          </p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-info-card">
          <span className="dashboard-icon">♡</span>
          <h2>Your presence matters.</h2>
          <p>
            Whether you are here to donate, request support, or volunteer,
            every action can help create a stronger community.
          </p>

          <button
            className="secondary-button"
            onClick={() => navigate("support")}
          >
            Explore requests
          </button>
        </div>

        <div className="request-form-card">
          <div className="form-card-heading">
            <span className="section-label">REQUEST SUPPORT</span>
            <h2>Tell us what you need.</h2>
            <p>
              Share your request clearly so the community can understand how
              to help.
            </p>
          </div>

          <form className="request-form" onSubmit={handleRequestSubmit}>
            <label>
              Request title
              <input
                type="text"
                placeholder="What support do you need?"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>

            <label>
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>General support</option>
                <option>Education</option>
                <option>Medical support</option>
                <option>Financial support</option>
                <option>Food and essentials</option>
                <option>Emergency support</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Location
              <input
                type="text"
                placeholder="City or area"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>

            <label>
              Description
              <textarea
                placeholder="Explain your situation and the support you need..."
                rows="5"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </label>

            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-message">{message}</div>}

            <button className="primary-button full-button" disabled={saving}>
              {saving ? "Submitting..." : "Submit request"}
              {!saving && <span>↗</span>}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo onClick={() => navigate("home")} />
          <p>
            Connecting generosity with genuine need, one act of kindness at a
            time.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>Explore</span>
            <button onClick={() => navigate("support")}>
              Find support
            </button>
            <button onClick={() => navigate("how")}>
              How it works
            </button>
            <button onClick={() => navigate("about")}>About us</button>
          </div>

          <div>
            <span>Get involved</span>
            <button onClick={() => navigate("signup")}>
              Join Hope2Live
            </button>
            <button onClick={() => navigate("signup")}>
              Request support
            </button>
            <button onClick={() => navigate("signup")}>
              Volunteer
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Hope2Live</span>
        <span>Built with kindness and purpose.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getCurrentUser() {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    setUser(currentUser || null);
  }

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPage() {
    if (page === "home") {
      return <HomePage navigate={navigate} />;
    }

    if (page === "support") {
      return <SupportPage navigate={navigate} />;
    }

    if (page === "how") {
      return <HowItWorksPage navigate={navigate} />;
    }

    if (page === "about") {
      return <AboutPage />;
    }

    if (page === "login") {
      return (
        <LoginPage
          navigate={navigate}
          onLogin={(currentUser) => setUser(currentUser)}
        />
      );
    }

    if (page === "signup") {
      return (
        <SignupPage
          navigate={navigate}
          onLogin={(currentUser) => setUser(currentUser)}
        />
      );
    }

    if (page === "dashboard") {
      if (!user) {
        return <LoginPage navigate={navigate} onLogin={setUser} />;
      }

      return (
        <DashboardPage
          user={user}
          navigate={navigate}
          onLogout={() => setUser(null)}
        />
      );
    }

    return <HomePage navigate={navigate} />;
  }

  const isAuthPage =
    page === "login" || page === "signup";

  return (
    <div className="app">
      {!isAuthPage && (
        <Navbar page={page} navigate={navigate} user={user} />
      )}

      {renderPage()}

      {!isAuthPage && <Footer navigate={navigate} />}
    </div>
  );
}