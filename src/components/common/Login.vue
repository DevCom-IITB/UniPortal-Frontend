<template>
  <div class="login-page">

    <div class="left-panel">
      <div class="mobile-header">
        <Logo class="mobile-logo-svg" />
        <span class="mobile-logo-text">NewBee</span>
      </div>
      <div class="carousel-wrapper">
        <transition :name="slideTransition" mode="out-in">
          <div class="slide" :key="currentSlide">
            <div class="slide-content-layout">
              <h2 class="carousel-caption-text">{{ slides[currentSlide].alt }}</h2>
              <div class="slide-image-container">
                <img
                  :src="slides[currentSlide].image"
                  :alt="slides[currentSlide].alt"
                  class="slide-image"
                />
              </div>
            </div>
          </div>
        </transition>

        <button class="arrow arrow-left" @click="prevSlide" aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button class="arrow arrow-right" @click="nextSlide" aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div class="carousel-dots" aria-label="Carousel pagination">
          <button
            v-for="(_, index) in slides"
            :key="index"
            type="button"
            class="carousel-dot"
            :class="{ active: currentSlide === index }"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-current="currentSlide === index ? 'true' : 'false'"
            @click="goToSlide(index)"
          />
        </div>
      </div>
    </div>

    <div class="right-panel">
      <div class="mentor-action-section">
        <button class="mentor-btn" @click="redirectToExternalRoute" id="mentor-login-btn">
          Login as a Mentor
        </button>
      </div>
      <div class="form-container-scroller">
        
        <div class="form-header">
          <div class="brand-logo">
            <Logo />
          </div>
          <h1 class="welcome-heading">Welcome to Newbee</h1>
          <h1 class="mobile-login-heading">Log In</h1>
        </div>

        <div class="form-fields">
          <div class="field-group">
            <label class="field-label" for="roll-no-input">Roll No</label>
            <input
              id="roll-no-input"
              type="text"
              class="field-input"
              v-model="uid"
              placeholder="JEE/UCEED Roll No"
            />
          </div>

          <div class="field-group">
            <label class="field-label" for="dob-input">Date of Birth</label>
            <input
              id="dob-input"
              type="text"
              class="field-input"
              v-model="password"
              placeholder="DD/MM/YYYY"
            />
          </div>

          <button
            id="login-submit-btn"
            class="login-btn"
            @click="handleLogin"
          >
            Login
          </button>
        </div>

        <p class="help-text">
          If you have trouble signing up, contact
          <a href="mailto:smpcs2025@gmail.com" class="help-link">smpcs2025@gmail.com</a>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import Logo from "../icons/Logo.svg";
import { useAuthStore } from "@/stores/auth";

import slide1 from "@/assets/login-carousel/slide-1.svg?url";
import slide2 from "@/assets/login-carousel/slide-2.svg?url";
import slide3 from "@/assets/login-carousel/slide-3.svg?url";
import slide4 from "@/assets/login-carousel/slide-4.svg?url";
import slide5 from "@/assets/login-carousel/slide-5.svg?url";

const sso_client_id = import.meta.env.VITE_SSO_CLIENT_ID;
const redirect_uri =
  import.meta.env.VITE_NODE_ENV == "DEV"
    ? import.meta.env.VITE_SSO_REDIRECT_URI_DEV
    : import.meta.env.VITE_SSO_REDIRECT_URI_TEST;

const AUTOPLAY_INTERVAL_MS = 5000;

export default {
  name: "Login",
  components: { Logo },

  props: {
    loggedIn: Boolean,
  },

  data() {
    return {
      uid: "",
      password: "",
      currentSlide: 0,
      slideTransition: "slide-left",
      autoplayTimer: null,
      slides: [
        { alt: "", image: slide1 },
        { alt: "", image: slide2 },
        { alt: "", image: slide3 },
        { alt: "", image: slide4 },
        { alt: "", image: slide5 },
      ],
    };
  },

  methods: {
    async handleLogin() {
      await this.Auth.Login(this.uid, this.password, false);
    },
    redirectToExternalRoute() {
      window.location.href = `https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=${sso_client_id}&response_type=code&scope=program&redirect_uri=${redirect_uri}`;
    },
    nextSlide() {
      this.slideTransition = "slide-left";
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.resetAutoplay();
    },
    prevSlide() {
      this.slideTransition = "slide-right";
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.resetAutoplay();
    },
    goToSlide(index) {
      if (index === this.currentSlide) return;
      this.slideTransition = index > this.currentSlide ? "slide-left" : "slide-right";
      this.currentSlide = index;
      this.resetAutoplay();
    },
    startAutoplay() {
      this.autoplayTimer = setInterval(() => {
        this.slideTransition = "slide-left";
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, AUTOPLAY_INTERVAL_MS);
    },
    resetAutoplay() {
      clearInterval(this.autoplayTimer);
      this.startAutoplay();
    },
  },

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    if (authorizationCode) {
      this.Auth.Login("", "", true);
    }
    this.startAutoplay();
  },

  beforeUnmount() {
    clearInterval(this.autoplayTimer);
  },

  setup() {
    const Auth = useAuthStore();
    return { Auth };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: "Inter", sans-serif;
  background-color: #ffffff;
}

/* ===== LEFT PANEL ===== */
.mobile-header {
  display: none;
}

.left-panel {
  flex: 1;
  background-color: #fceeb9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 80px 60px;
  box-sizing: border-box;
}

.slide-content-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 520px;
}

.carousel-caption-text {
  font-size: 24px;
  font-weight: 800;
  color: #111111;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.3;
}

.slide-image-container {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.slide-image {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
}

/* Navigation Controls */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 12px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: color 0.2s ease, transform 0.2s ease;
}

.arrow:hover {
  color: #000000;
}

.arrow svg {
  width: 24px;
  height: 24px;
}

.arrow-left { left: 16px; }
.arrow-right { right: 16px; }

.carousel-dots {
  display: none;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid #111111;
  background: transparent;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.carousel-dot.active {
  background: #fad35f;
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-left-enter-from { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to { opacity: 0; transform: translateX(40px); }

/* ===== RIGHT PANEL ===== */
.right-panel {
  flex: 1;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
}

.form-container-scroller {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
  width: 100%;
}

.brand-logo {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.brand-logo svg,
.brand-logo :deep(svg) {
  width: 100px !important;
  height: 100px !important;
}

.welcome-heading {
  font-size: 36px;
  font-weight: 700;
  color: #111111;
  margin: 0;
  text-align: left;
  line-height: 1.2;
}

.mobile-login-heading {
  display: none;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 15px;
  font-weight: 600;
  color: #111111;
}

.field-input {
  width: 100%;
  height: 54px;
  border: 1.5px solid #111111;
  border-radius: 14px;
  padding: 0 18px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  color: #111111;
  background: #ffffff;
  box-sizing: border-box;
  outline: none;
}

.field-input::placeholder {
  color: #b3b3b3;
}

.login-btn {
  width: 130px;
  height: 48px;
  background: #ffdf80;
  border: 1.5px solid #111111;
  border-radius: 24px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  cursor: pointer;
  margin-top: 8px;
  align-self: flex-start;
}

.mentor-action-section {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
}

.mentor-btn {
  background: transparent;
  border: 1.5px solid #b48c00;
  border-radius: 24px;
  color: #b48c00;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.mentor-btn:hover {
  background: #ffdf80;
  color: #111111;
  border-color: #111111;
}

.help-text {
  font-size: 14px;
  color: #111111;
  margin: 32px 0 0 0;
  text-align: left;
  width: 100%;
}

.help-link {
  color: #0057d9;
  text-decoration: underline;
  font-weight: 500;
}

/* ===== Responsive ===== */
@media only screen and (max-width: 900px) {
  .welcome-heading { font-size: 28px; }
  .carousel-caption-text { font-size: 20px; }
  .slide { padding: 40px 32px; }
}

@media only screen and (max-width: 750px) {
  /* ---- Page layout ---- */
  .login-page {
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    min-height: 100vh;
  }

  /* ---- LEFT PANEL (yellow carousel area) ---- */
  .left-panel {
    flex: none;
    width: 100%;
    min-height: 42vh;
    background-color: #fdf2b3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    overflow: visible;
    position: relative;
  }

  /* Mobile logo header inside yellow panel */
  .mobile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 22px 0 10px;
    width: 100%;
    flex-shrink: 0;
  }

  .mobile-logo-svg {
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
  }

  .mobile-logo-svg :deep(svg),
  .mobile-logo-svg svg {
    width: 22px !important;
    height: 22px !important;
  }

  .mobile-logo-text {
    font-size: 19px;
    font-weight: 700;
    color: #111111;
    letter-spacing: -0.2px;
  }

  /* Carousel takes remaining space in yellow panel */
  .carousel-wrapper {
    width: 100%;
    flex: 1;
    min-height: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .slide {
    padding: 0 16px 0;
    flex: 1;
    min-height: 0;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide-content-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
  }

  /* Image first, caption below */
  .slide-image-container {
    order: 1;
    width: 100%;
    max-width: 260px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .slide-image {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
  }

  .carousel-caption-text {
    display: none;
  }

  .carousel-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 6px 0 10px;
    position: relative;
    z-index: 4;
    flex-shrink: 0;
  }

  /* ---- RIGHT PANEL (white form area overlapping yellow) ---- */
  .right-panel {
    width: 100%;
    flex: 1;
    background: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: -30px;
    z-index: 3;
    padding: 28px 24px 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    position: relative;
  }

  /* Hide mentor button on mobile */
  .mentor-action-section {
    display: none !important;
  }

  .form-container-scroller {
    width: 100%;
    max-width: 100%;
    align-items: flex-start;
    gap: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Hide desktop brand logo + heading */
  .brand-logo {
    display: none;
  }

  .welcome-heading {
    display: none;
  }

  /* Mobile "Log In" heading, centered */
  .mobile-login-heading {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #111111;
    text-align: center;
    margin: 0 0 28px 0;
    width: 100%;
    line-height: 1.2;
  }

  .form-header {
    margin-bottom: 0;
    align-items: center;
    width: 100%;
  }

  .form-fields {
    width: 100%;
    gap: 20px;
    flex: 1;
  }

  /* Labels: left-aligned */
  .field-label {
    font-size: 14px;
    font-weight: 600;
    text-align: left;
  }

  /* Inputs: border, centered placeholder */
  .field-input {
    height: 52px;
    border: 1.5px solid #111111;
    border-radius: 16px;
    text-align: center;
    font-size: 15px;
  }

  .field-input::placeholder {
    text-align: center;
    color: #9e9e9e;
  }

  /* Login button: full-width pill, pushed to bottom */
  .login-btn {
    width: 100%;
    height: 56px;
    background: #fee38e;
    border: none;
    border-radius: 32px;
    font-size: 20px;
    font-weight: 800;
    color: #111111;
    cursor: pointer;
    margin-top: auto;
    align-self: center;
    padding: 0;
    letter-spacing: -0.2px;
  }

  /* Help text: left-aligned, smaller */
  .help-text {
    font-size: 13px;
    color: #333333;
    text-align: left;
    margin-top: 18px;
    width: 100%;
  }

  .help-link {
    color: #0057d9;
  }

  /* Hide arrows on mobile */
  .arrow {
    display: none;
  }
}
</style>