import React from "react";
import { FaFileUpload, FaBrain, FaQuestionCircle } from "react-icons/fa";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">InsightPaper</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
          <button className="nav-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>AI-Powered Research Summarization</h1>
          <p>Upload papers, get instant insights, and ask AI-powered questions.</p>
          <div className="btn-container">
            <button className="btn primary-btn">Continue as Guest</button>
            <button className="btn secondary-btn">Sign In or Register</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose InsightPaper?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <FaFileUpload className="feature-icon" />
            <h3>Easy Upload</h3>
            <p>Simply upload your research paper in PDF or Docx format.</p>
          </div>
          <div className="feature-item">
            <FaBrain className="feature-icon" />
            <h3>AI Summarization</h3>
            <p>Get concise, well-structured summaries with key insights.</p>
          </div>
          <div className="feature-item">
            <FaQuestionCircle className="feature-icon" />
            <h3>Interactive Q&A</h3>
            <p>Ask AI follow-up questions on topics of interest.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Upload Paper</h3>
            <p>Select a research paper to analyze.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>AI Processing</h3>
            <p>Our AI extracts key points, pros & cons.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Ask AI Questions</h3>
            <p>Interact with AI to explore deeper insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <p>© 2025 InsightPaper | AI-powered research summarization</p>
      </footer>
    </div>
  );
}

export default LandingPage;
