
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Script from 'next/script';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import PartnersClient from '@/components/partners/PartnersClient';

export const revalidate = 60; // Revalidate every minute

export default async function PartnersPage() {
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, name, slug, tagline, contact_address, status')
    .eq('status', 'active')
    .order('name');

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `
  <!-- Navigation Header -->
  <header class="navbar" id="main-navbar">
    <div class="container navbar__inner">
      <a href="/" class="navbar__logo">
        <img src="images/logo-white.png" alt="Tablekard Logo" class="navbar__logo-img">
      </a>
      <nav class="navbar__nav" id="navbar-nav">
        <a href="/#features" class="navbar__link">Features</a>
        <a href="/#ecosystem" class="navbar__link">How It Works</a>
        <a href="/partners" class="navbar__link active">Our Partners</a>
        <a href="/contact" class="navbar__contact-btn" id="nav-contact-btn">Contact Us</a>
      </nav>
      <button class="navbar__hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <!-- Mobile drawer -->
    <div class="navbar__drawer" id="navbar-drawer">
      <a href="/#features" class="navbar__drawer-link">Features</a>
      <a href="/#ecosystem" class="navbar__drawer-link">How It Works</a>
      <a href="/partners" class="navbar__drawer-link active">Our Partners</a>
      <a href="/contact" class="navbar__drawer-link">Contact Us</a>
      <a href="/#register" class="navbar__drawer-cta">Get Started Free →</a>
    </div>
  </header>
      ` }} />

      <PartnersClient restaurants={restaurants || []} />

      <div dangerouslySetInnerHTML={{ __html: `
  <!-- Premium Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand-col">
          <div class="footer__logo">
            <img src="images/logo-white.png" alt="Tablekard Logo" class="footer__logo-img">
            <h4 class="footer__col-title">Product</h4>
            <ul>
              <li><a href="/#features">Features</a></li>
              <li><a href="/#ecosystem">How It Works</a></li>
              <li><a href="/partners">Our Partners</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copyright">&copy; <span id="current-year">2026</span> Tablekard. All rights reserved.</p>
      </div>
    </div>
  </footer>
` }} />
      <Script src="/js/main.js" strategy="lazyOnload" />
      <Script id="nav-hamburger-script" strategy="lazyOnload">{`
        (function () {
          var btn = document.getElementById('nav-hamburger');
          var drawer = document.getElementById('navbar-drawer');
          if (!btn || !drawer) return;

          btn.addEventListener('click', function () {
            var isOpen = drawer.classList.toggle('is-open');
            btn.classList.toggle('is-open', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
          });

          // Close drawer when any link inside it is clicked
          drawer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
              drawer.classList.remove('is-open');
              btn.classList.remove('is-open');
              btn.setAttribute('aria-expanded', 'false');
            });
          });
        })();
      `}</Script>
    </>
  );
}
