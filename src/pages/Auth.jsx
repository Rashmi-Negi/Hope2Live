import { useState } from "react";

function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-lg-10">
            <div className="auth-card row g-0">
              <div className="col-lg-5 auth-intro">
                <div className="auth-heart">❤️</div>

                <h1>Welcome to Hope2Live</h1>

                <p>
                  A small act of kindness can create a lifetime of hope.
                </p>

                <div className="auth-points">
                  <div>🛡️ Safe and privacy-conscious</div>
                  <div>🤝 Connected through trusted coordination</div>
                  <div>🌱 Built around care and dignity</div>
                </div>
              </div>

              <div className="col-lg-7 auth-form-area">
                <div className="auth-tabs">
                  <button
                    className={mode === "login" ? "active" : ""}
                    onClick={() => setMode("login")}
                  >
                    Login
                  </button>

                  <button
                    className={mode === "register" ? "active" : ""}
                    onClick={() => setMode("register")}
                  >
                    Register
                  </button>
                </div>

                {mode === "login" ? (
                  <>
                    <h2>Welcome back</h2>
                    <p className="text-muted">
                      Sign in to continue your journey of hope.
                    </p>

                    <form>
                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                        />
                      </div>

                      <div className="d-flex justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>

                        <a href="#forgot" className="auth-link">
                          Forgot password?
                        </a>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary w-100 rounded-pill py-2"
                      >
                        Login securely
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h2>Create your account</h2>
                    <p className="text-muted">
                      Join a community built on trust and compassion.
                    </p>

                    <form>
                      <div className="mb-3">
                        <label className="form-label">Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Account type</label>
                        <select className="form-select">
                          <option value="">Choose account type</option>
                          <option value="donor">Donor</option>
                          <option value="recipient">Recipient</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Create a strong password"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary w-100 rounded-pill py-2"
                      >
                        Continue to verification
                      </button>
                    </form>
                  </>
                )}

                <p className="small text-muted text-center mt-4 mb-0">
                  Your information is handled with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;