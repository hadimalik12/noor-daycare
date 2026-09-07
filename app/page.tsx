"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Baby,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  House,
  MapPin,
  Menu,
  Moon,
  Palette,
  ShieldCheck,
  Sprout,
  Sun,
  Users,
  X,
} from "lucide-react";
import { CalendlyBooking, BOOKING_URL } from "./calendly-booking";
import { PhoneContact } from "./phone-contact";
import { goToPageTop, resetInitialScroll } from "./scroll-navigation";

const navigation = [
  ["#about", "Why Noor"],
  ["#programs", "Ages & care"],
  ["#day", "A day at Noor"],
  ["#contact", "Visit & questions"],
];

const programs = [
  {
    name: "Infants",
    range: "8 weeks–12 months",
    icon: Baby,
    color: "pink",
    title: "Comfort comes first.",
    description:
      "Leaving your baby in someone else's care is a big step. A small, familiar setting makes room for comforting care and the feeding and sleep routines you share with us.",
    details: [
      "Time for cuddles and connection",
      "Gentle sensory play and first discoveries",
      "Care shaped around your baby's routine",
    ],
  },
  {
    name: "Toddlers",
    range: "13 months–2 years",
    icon: Sprout,
    color: "yellow",
    title: "Room to try “I can!”",
    description:
      "Little feet need room to move. Songs, stories, and everyday play help your toddler find new words, explore safely, and practice doing things for themselves.",
    details: [
      "Movement, music, and hands-on play",
      "Language and everyday independence",
      "Patient potty training support when ready",
    ],
  },
  {
    name: "Preschoolers",
    range: "3–4 years",
    icon: Palette,
    color: "green",
    title: "Growing ready, through play.",
    description:
      "Your child's big ideas belong here. Art, stories, counting, and social play give preschoolers everyday opportunities to create, make friends, and build confidence.",
    details: [
      "Art, stories, and early counting",
      "Taking turns and playing together",
      "Potty training and self-care support",
    ],
  },
];

const moments = [
  {
    time: "From 7:30 AM",
    title: "A warm welcome",
    icon: Sun,
    color: "yellow",
    description:
      "Arrival, a little time to settle in, then handwashing and breakfast.",
  },
  {
    time: "Morning",
    title: "Make, sing & discover",
    icon: Palette,
    color: "pink",
    description:
      "Circle time, music, stories, and a bathroom break. Then art, early writing, fine motor activities, and free play.",
  },
  {
    time: "Midday",
    title: "Lunch, then a little rest",
    icon: Moon,
    color: "blue",
    description:
      "Handwashing and lunch, followed by a nap or quiet time to rest and recharge.",
  },
  {
    time: "Afternoon",
    title: "Snack, fresh air & play",
    icon: Sprout,
    color: "green",
    description:
      "A bathroom break, handwashing, and a snack. Then outdoor play in the play area, with slides, swings, and room to move.",
  },
  {
    time: "Until 6:00 PM",
    title: "One more story, then home",
    icon: BookOpen,
    color: "yellow",
    description:
      "Reading, stories, and free play before we tidy up, pack up, and say goodbye at pickup.",
  },
];

const faqs = [
  {
    question: "What ages do you care for?",
    answer: "Infants, toddlers, and preschoolers from 8 weeks through 4 years.",
  },
  {
    question: "What are your hours?",
    answer: "Monday through Friday, 7:30 AM to 6:00 PM.",
  },
  {
    question: "Is Noor licensed?",
    answer:
      "Yes, through Bright from the Start. Credentials include CDA certification, CPR, and First Aid. Our home daycare has a capacity of 6 children.",
  },
  {
    question: "Are meals and snacks part of the day?",
    answer:
      "Breakfast, lunch, and a snack are part of our routine. Please share any allergies or feeding needs with us.",
  },
  {
    question: "Do you help with potty training?",
    answer:
      "Yes. We offer patient support when your child is ready and coordinate with your routine at home.",
  },
];

function Brand({ onHome }: { onHome?: () => void }) {
  return (
    <a
      className="brand"
      href="#top"
      aria-label="Noor Daycare home"
      onClick={(event) => {
        if (goToPageTop(event)) onHome?.();
      }}
    >
      <span className="brand-mark">
        <House size={27} strokeWidth={2.3} aria-hidden="true" />
      </span>
      <span>
        <strong>Noor Daycare</strong>
        <small>Family Child Care</small>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVisitDock, setShowVisitDock] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const heroVisitLink = useRef<HTMLAnchorElement>(null);
  const bookingPanel = useRef<HTMLDivElement>(null);

  useEffect(resetInitialScroll, []);

  function closeMenu() {
    setMenuOpen(false);
    menuButton.current?.focus();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const heroLink = heroVisitLink.current;
    const contact = bookingPanel.current;
    if (!heroLink || !contact) return;
    let heroPassed = false;
    let contactVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroLink)
            heroPassed = entry.boundingClientRect.bottom < 90;
          if (entry.target === contact) contactVisible = entry.isIntersecting;
        }
        setShowVisitDock(heroPassed && !contactVisible);
      },
      { rootMargin: "-90px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(heroLink);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className="site-header"
        id="top"
        tabIndex={-1}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setMenuOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) closeMenu();
        }}
      >
        <div className="header-inner">
          <Brand onHome={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([href, label]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="button button-red header-cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays size={18} aria-hidden="true" />
            Schedule a visit
          </a>
          <button
            className="menu-toggle icon-button"
            type="button"
            ref={menuButton}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div
          className="mobile-menu-overlay"
          data-open={menuOpen}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Close navigation"
            tabIndex={-1}
            onClick={closeMenu}
          />
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[[BOOKING_URL, "Schedule a visit"], ...navigation].map(
              ([href, label]) => (
                <a
                  key={href}
                  href={href}
                  target={href === BOOKING_URL ? "_blank" : undefined}
                  rel={href === BOOKING_URL ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ),
            )}
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <MapPin size={17} aria-hidden="true" />
                Lawrenceville, Georgia
              </p>
              <h1 id="hero-title">
                Little group.
                <br />
                <span className="text-red">Whole lot of care.</span>
              </h1>
              <p className="hero-description">
                A small, licensed home daycare where your child is known,
                comforted, and encouraged, one little moment at a time.
              </p>
              <p className="hero-detail">
                Warm care. Personal attention. A familiar rhythm of play, meals,
                and rest.
              </p>
              <a
                className="button button-red hero-visit"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                ref={heroVisitLink}
              >
                <CalendarDays size={20} aria-hidden="true" />
                <span>Schedule a visit</span>
                <ArrowRight size={19} aria-hidden="true" />
              </a>
              <p className="visit-reassurance">
                See the space. Ask your questions. Find your fit.
              </p>
              <a className="hero-scroll" href="#about">
                <ArrowDown size={17} aria-hidden="true" />
                Get to know Noor
              </a>
            </div>
            <div className="hero-visual">
              <figure className="preview-photo hero-photo">
                <img
                  src="/images/playroom-preview.jpg"
                  alt="Preview of a bright playroom with toys and books; not Noor's actual daycare"
                  width="1800"
                  height="1100"
                  fetchPriority="high"
                />
                <figcaption>Preview image · not the actual daycare</figcaption>
              </figure>
              <div className="small-group-note">
                <span className="group-icon">
                  <Users size={28} aria-hidden="true" />
                </span>
                <p>
                  <strong>Just 6 children.</strong>
                  <span>A smaller setting for more personal attention.</span>
                </p>
                <Heart size={28} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="facts-band">
            <dl className="container facts-inner">
              <div>
                <Baby aria-hidden="true" />
                <dt>Ages</dt>
                <dd>8 weeks–4 years</dd>
              </div>
              <div>
                <Clock3 aria-hidden="true" />
                <dt>Weekday hours</dt>
                <dd>7:30 AM–6:00 PM</dd>
              </div>
              <div>
                <ShieldCheck aria-hidden="true" />
                <dt>Licensed through</dt>
                <dd>Bright from the Start</dd>
              </div>
              <div>
                <House aria-hidden="true" />
                <dt>Home daycare</dt>
                <dd>Capacity of 6 children</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="section why-section"
          id="about"
          aria-labelledby="why-title"
        >
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Why families choose Noor</p>
                <h2 id="why-title">
                  Small enough to know
                  <br />
                  <span className="text-green">what makes them, them.</span>
                </h2>
              </div>
              <p>
                You want to leave knowing your child is in caring hands. At
                Noor, a smaller home setting brings together the warmth they
                need and the trust you need.
              </p>
            </div>
            <div className="reasons-grid">
              <article>
                <span className="reason-icon pink">
                  <Heart aria-hidden="true" />
                </span>
                <h3>Care that feels familiar</h3>
                <p>
                  Comfort items, favorite stories, little routines. We make
                  space to learn what helps your child settle in and feel at
                  home.
                </p>
              </article>
              <article>
                <span className="reason-icon yellow">
                  <Users aria-hidden="true" />
                </span>
                <h3>A little group, by design</h3>
                <p>
                  With a current capacity of 6 children, personal attention is
                  part of everyday life, from a gentle goodbye to a new skill
                  worth celebrating.
                </p>
              </article>
              <article>
                <span className="reason-icon green">
                  <House aria-hidden="true" />
                </span>
                <h3>Warmth within reach</h3>
                <p>
                  Families choose Noor for affordable care in a licensed home
                  setting, with personal attention and familiar daily routines.
                </p>
              </article>
            </div>
            <div className="trust-panel">
              <div className="trust-intro">
                <ShieldCheck size={32} aria-hidden="true" />
                <div>
                  <h3>A warm home. A foundation of trust.</h3>
                  <p>
                    Licensed through Bright from the Start, with training that
                    supports attentive daily care.
                  </p>
                </div>
              </div>
              <ul
                className="credentials"
                aria-label="Licensing and certifications"
              >
                <li>Bright from the Start</li>
                <li>CDA certified</li>
                <li>CPR certified</li>
                <li>First Aid certified</li>
              </ul>
              <p className="trust-note">
                You&apos;re welcome to review our license and certifications
                during your visit.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section programs-section"
          id="programs"
          aria-labelledby="programs-title"
        >
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Care for each stage</p>
              <h2 id="programs-title">
                Their own pace.
                <br />
                <span className="text-blue">Their next little step.</span>
              </h2>
              <p>
                One welcoming home, with care that makes room for different
                ages, needs, and new discoveries.
              </p>
            </div>
            <div className="program-grid">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <article
                    className={`program-card ${program.color}`}
                    key={program.name}
                  >
                    <div className="program-label">
                      <Icon size={34} strokeWidth={1.7} aria-hidden="true" />
                      <div>
                        <h3>{program.name}</h3>
                        <p>{program.range}</p>
                      </div>
                    </div>
                    <div className="program-body">
                      <h4>{program.title}</h4>
                      <p>{program.description}</p>
                      <ul>
                        {program.details.map((detail) => (
                          <li key={detail}>
                            <Check size={18} aria-hidden="true" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="stage-note">
              <Heart size={19} aria-hidden="true" />
              <span>
                Tell us where your child is today. We&apos;ll talk about
                routines and support that fit.
              </span>
            </p>
          </div>
        </section>

        <section
          className="section day-section"
          id="day"
          aria-labelledby="day-title"
        >
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">A day at Noor</p>
                <h2 id="day-title">
                  A rhythm they can
                  <br />
                  <span className="text-blue">settle into.</span>
                </h2>
              </div>
              <p>
                Time to play, time to eat, time to rest. Our day follows a
                familiar order, with timing adapted to children&apos;s ages and
                needs.
              </p>
            </div>
            <div className="day-layout">
              <ol className="day-timeline" aria-label="Daily routine">
                {moments.map((moment) => {
                  const Icon = moment.icon;
                  return (
                    <li key={moment.time}>
                      <span className={`moment-icon ${moment.color}`}>
                        <Icon size={23} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="moment-time">{moment.time}</p>
                        <h3>{moment.title}</h3>
                        <p>{moment.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="day-aside">
                <figure className="preview-photo outdoor-photo">
                  <img
                    src="/images/outdoor-preview.jpg"
                    alt="Preview of an outdoor childcare play area; not Noor's actual outdoor space"
                    width="1000"
                    height="750"
                    loading="lazy"
                  />
                  <figcaption>
                    Preview image · not the actual daycare
                  </figcaption>
                </figure>
                <div className="play-note">
                  <Sun size={30} aria-hidden="true" />
                  <h3>Room for the wiggles.</h3>
                  <p>
                    A play area, slides, swings, and outdoor time give little
                    bodies a chance to move. Art, music, and stories make room
                    for imagination, too.
                  </p>
                </div>
                <p className="routine-note">
                  <Heart size={20} aria-hidden="true" />
                  <span>
                    Infant feeding and sleep follow individual needs. Bathroom
                    breaks include patient potty training support when your
                    child is ready.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section contact-section"
          id="contact"
          aria-labelledby="visit-title"
        >
          <div className="container contact-layout">
            <div className="visit-copy">
              <p className="eyebrow">Come say hello</p>
              <h2 id="visit-title">Schedule a visit</h2>
              <p className="visit-intro">
                We’d love to meet your family and show you around.
              </p>
              <div className="visit-practical">
                <p>
                  <MapPin size={18} aria-hidden="true" />
                  <span>Lawrenceville, Georgia</span>
                </p>
                <p>
                  <Clock3 size={18} aria-hidden="true" />
                  <span>Weekdays · 7:30 AM–6:00 PM</span>
                </p>
                <PhoneContact />
              </div>
            </div>
            <div
              className="visit-booking"
              ref={bookingPanel}
              aria-labelledby="visit-title"
            >
              <div className="booking-heading">
                <a
                  className="text-link booking-direct"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open booking in a new tab</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
              <CalendlyBooking />
            </div>
          </div>
        </section>
        <section
          className="section questions-section"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div className="container questions-layout">
            <h2 id="questions-title">Parent questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    <span>{faq.question}</span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <Brand />
          <p>
            Small home. Warm care.
            <br />
            Lawrenceville, Georgia.
          </p>
          <a className="back-top" href="#top" onClick={goToPageTop}>
            Back to top
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} Noor Daycare</span>
          <span>Photos are previews, not the actual daycare.</span>
        </div>
      </footer>
      <div className="mobile-visit-dock" hidden={!showVisitDock || menuOpen}>
        <a
          className="button button-red"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CalendarDays size={19} aria-hidden="true" />
          <span>Schedule a visit</span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
