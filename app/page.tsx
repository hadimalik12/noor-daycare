"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Baby,
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
  X,
} from "lucide-react";
import { CalendlyBooking, BOOKING_URL } from "./calendly-booking";
import { PhoneContact } from "./phone-contact";
import { PhotoStack } from "./photo-stack";
import { goToPageTop, resetInitialScroll } from "./scroll-navigation";

const photos = {
  room: "/images/playroom-preview.jpg",
  outdoor: "/images/outdoor-preview.jpg",
  art: "/images/art-preview.jpg",
};

const programs = [
  {
    name: "Infants",
    range: "8 weeks-12 months",
    icon: Baby,
    color: "pink",
    title: "A gentle beginning.",
    description:
      "A small home setting for the earliest days of growing, with space for feeding, naps, and those first discoveries.",
    details: [
      "Comfort and connection",
      "Room for individual routines",
      "Gentle sensory exploration",
    ],
    note: "Talk with Naila about feeding, sleep routines, and what helps your baby feel at home.",
  },
  {
    name: "Toddlers",
    range: "13 months-2 years",
    icon: Sprout,
    color: "yellow",
    title: "So much to discover.",
    description:
      "New words, little steps, and a growing sense of independence. Everyday play makes room for a toddler's natural curiosity.",
    details: [
      "Movement and sensory play",
      "Songs, stories, and new words",
      "Practice with everyday skills",
    ],
    note: "Talk with Naila about your toddler's routines, comfort items, and current stage of development.",
  },
  {
    name: "Preschoolers",
    range: "3-4 years",
    icon: Palette,
    color: "green",
    title: "Big ideas. Little hands.",
    description:
      "Stories to imagine, colors to mix, and things to count. Play offers opportunities to create, make friends, and try something new.",
    details: [
      "Art and imaginative play",
      "Early language and counting",
      "Sharing and playing together",
    ],
    note: "Talk with Naila about your child's interests and the activities currently offered.",
  },
];
const moments = [
  {
    time: "From 7:30 AM",
    label: "Welcome in",
    icon: Sun,
    title: "A happy start to the day.",
    activities: ["Welcome & arrival", "Handwashing & breakfast"],
    image: photos.room,
    alt: "Preview of a bright home playroom with toys and books",
  },
  {
    time: "Morning",
    label: "Make & discover",
    icon: Palette,
    title: "Songs, stories, and little discoveries.",
    activities: [
      "Circle time & music",
      "Bathroom break",
      "Art, writing & fine motor skills",
      "Free play & centers",
    ],
    image: photos.art,
    alt: "Preview of children painting together at a table",
  },
  {
    time: "Midday",
    label: "Rest & recharge",
    icon: Moon,
    title: "A softer part of the day.",
    activities: ["Handwashing & lunch", "Nap & quiet time"],
    image: photos.room,
    alt: "Preview of a home childcare room",
  },
  {
    time: "Afternoon",
    label: "Snack & move",
    icon: Sprout,
    title: "Refuel, stretch, and play.",
    activities: [
      "Bathroom break",
      "Handwashing & snack",
      "Recess & gross motor play",
    ],
    image: photos.outdoor,
    alt: "Preview of an outdoor childcare play space",
  },
  {
    time: "Until 6:00 PM",
    label: "Play & goodbye",
    icon: Heart,
    title: "One more story before home.",
    activities: [
      "Reading & story time",
      "Free play & clean-up",
      "Pack-up & dismissal",
    ],
    image: photos.art,
    alt: "Preview of children sharing a creative activity",
  },
];
const faqs = [
  {
    question: "What ages do you care for?",
    answer:
      "Noor Daycare welcomes children from 8 weeks through 4 years old. Our age groups include infants, toddlers, and preschoolers. Openings depend on the current group, so ask about availability for your child's age when you schedule a visit.",
  },
  {
    question: "What are the hours?",
    answer:
      "Noor Daycare is open from 7:30 AM to 6:00 PM on weekdays. Confirm holidays, closures, and the schedule available to your family with Naila during your visit.",
  },
  {
    question: "Is this a licensed home daycare?",
    answer:
      "Yes. Noor Daycare is run by Naila Ahmad, who is listed as a licensed Family Child Care Learning Home provider under Ahmad, Naila in Lawrenceville, Georgia. A visit is a good time to review the current license and discuss supervision and the spaces children use.",
  },
  {
    question: "What should I ask during a visit?",
    answer:
      "Ask about the daily routine, illness policy, backup care and closures, supervision across age groups, and which parts of the home children use. Share your child's routines and ask what to bring for their first day.",
  },
];

function PreviewPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`preview-photo ${className}`}>
      <img src={src} alt={alt} loading="lazy" width="1000" height="750" />
      <figcaption>Preview image</figcaption>
    </figure>
  );
}
function Brand({ onHome }: { onHome?: () => void }) {
  return (
    <a
      className="brand"
      href="/"
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
  const [programIndex, setProgramIndex] = useState(1);
  const [momentIndex, setMomentIndex] = useState(0);
  const [showVisitDock, setShowVisitDock] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const heroVisitLink = useRef<HTMLAnchorElement>(null);
  const visitSection = useRef<HTMLElement>(null);
  const program = programs[programIndex];
  const moment = moments[momentIndex];

  useEffect(resetInitialScroll, []);

  function closeMenu() {
    setMenuOpen(false);
    menuButton.current?.focus();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const heroLink = heroVisitLink.current;
    const contact = visitSection.current;
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

  function selectMoment(index: number) {
    setMomentIndex(index);
  }

  function tabKeys(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    count: number,
    select: (index: number) => void,
    prefix: string,
  ) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    select(next);
    document.getElementById(`${prefix}-${next}`)?.focus();
  }

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
          if (event.key === "Escape") {
            closeMenu();
          }
        }}
      >
        <div className="header-inner">
          <Brand onHome={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">Our little home</a>
            <a href="#programs">Ages & care</a>
            <a href="#day">A day here</a>
            <a href="#questions">Parent questions</a>
          </nav>
          <a
            className="button header-cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays size={18} aria-hidden="true" /> Schedule a visit
          </a>
          <button
            className="menu-toggle icon-button"
            ref={menuButton}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="menu-open-icon" aria-hidden="true" />
            <X className="menu-close-icon" aria-hidden="true" />
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
            {[
              [BOOKING_URL, "Schedule a visit"],
              ["#about", "Our little home"],
              ["#programs", "Ages & care"],
              ["#day", "A day here"],
              ["#questions", "Parent questions"],
            ].map(([href, label]) => (
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
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src={photos.room}
            alt="Preview image of a home daycare playroom, not Naila's actual home"
            width="1800"
            height="1100"
            fetchPriority="high"
          />
          <div className="hero-wash" />
          <div className="container hero-content">
            <p className="eyebrow">
              <MapPin size={16} aria-hidden="true" /> Lawrenceville, Georgia
            </p>
            <h1 id="hero-title">
              Noor Daycare<span>Family Child Care</span>
            </h1>
            <p className="hero-tagline">
              Little days. <br />
              Big discoveries.
            </p>
            <p className="hero-description">
              A small home daycare for growing, playing,
              <br className="desktop-break" /> and finding a little more
              independence.
            </p>
            <a
              className="button button-red hero-visit"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              ref={heroVisitLink}
            >
              <CalendarDays size={20} aria-hidden="true" /> Schedule a visit
              <ArrowRight size={20} aria-hidden="true" />
            </a>
            <p className="visit-reassurance">
              Meet Naila, see the space, and ask your questions.
            </p>
            <a className="hero-scroll" href="#about">
              <ArrowDown size={18} aria-hidden="true" /> Explore our little home
            </a>
          </div>
          <span className="hero-preview">Preview image</span>
        </section>
        <div className="facts-band">
          <div className="container facts-inner">
            <span>
              <ShieldCheck aria-hidden="true" /> Licensed family child care
            </span>
            <span>
              <Clock3 aria-hidden="true" /> 7:30 AM - 6:00 PM
            </span>
            <span>
              <Heart aria-hidden="true" /> 8 weeks through 4 years
            </span>
          </div>
        </div>
        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-photo-wrap">
              <PhotoStack />
              <p className="photo-note">Room for a little wonder.</p>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Our little home</p>
              <h2>
                Small setting.
                <br />
                <span className="text-red">A world of possibility.</span>
              </h2>
              <p>
                There&apos;s something special about growing up in a home
                setting. Familiar spaces, a smaller group, and everyday moments
                to learn together.
              </p>
              <p>
                Noor Daycare is a licensed home daycare run by Naila Ahmad in
                Lawrenceville, welcoming children from 8 weeks through 4 years
                old.
              </p>
              <div className="about-detail">
                <House aria-hidden="true" />
                <span>
                  <strong>Home is where we begin.</strong>
                  <br />A Family Child Care Learning Home in your community.
                </span>
              </div>
              <a className="text-link" href="#questions">
                Get to know the basics{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="section programs-section" id="programs">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Little people, different stages</p>
              <h2>Growing at their own pace.</h2>
              <p>
                From first discoveries to preschool adventures, there&apos;s a
                lot of growing to do.
              </p>
            </div>
            <div className="age-tabs" role="tablist" aria-label="Age groups">
              {programs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    id={`age-${index}`}
                    aria-controls="age-panel"
                    aria-selected={programIndex === index}
                    tabIndex={programIndex === index ? 0 : -1}
                    className={`age-tab ${item.color}`}
                    onClick={() => setProgramIndex(index)}
                    onKeyDown={(e) =>
                      tabKeys(e, index, programs.length, setProgramIndex, "age")
                    }
                  >
                    <Icon size={30} aria-hidden="true" />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.range}</small>
                    </span>
                    <ArrowDown
                      className="tab-arrow"
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
            <div
              className={`age-panel ${program.color}`}
              role="tabpanel"
              id="age-panel"
              aria-labelledby={`age-${programIndex}`}
              tabIndex={0}
              key={programIndex}
            >
              <div>
                <p className="eyebrow">
                  {program.name} / {program.range}
                </p>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
              <div className="age-details">
                <ul>
                  {program.details.map((detail) => (
                    <li key={detail}>
                      <Check size={18} aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <p>{program.note}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section day-section" id="day">
          <div className="container">
            <div className="day-heading">
              <div>
                <p className="eyebrow">A day here</p>
                <h2>
                  A little play.
                  <br />
                  <span className="text-blue">
                    A little rest. A lot of growing.
                  </span>
                </h2>
              </div>
              <p>
                Our daily rhythm, from a warm welcome to a happy goodbye.
                Activities follow this order, with timing adapted to
                children&apos;s needs.
              </p>
            </div>
            <div className="day-tabs" role="tablist" aria-label="Daily routine">
              {moments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    role="tab"
                    type="button"
                    key={item.time}
                    id={`day-${index}`}
                    aria-controls="day-panel"
                    aria-selected={momentIndex === index}
                    tabIndex={momentIndex === index ? 0 : -1}
                    onClick={() => selectMoment(index)}
                    onKeyDown={(e) =>
                      tabKeys(e, index, moments.length, selectMoment, "day")
                    }
                  >
                    <Icon size={24} aria-hidden="true" />
                    <span>
                      <small>{item.time}</small>
                      <strong>{item.label}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              className="day-panel"
              role="tabpanel"
              id="day-panel"
              aria-labelledby={`day-${momentIndex}`}
              tabIndex={0}
              key={momentIndex}
            >
              <PreviewPhoto src={moment.image} alt={moment.alt} />
              <div className="day-story">
                <p className="eyebrow">{moment.time}</p>
                <h3>{moment.title}</h3>
                <ol className="day-activities">
                  {moment.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ol>
                <div className="day-step-controls">
                  <span>
                    {momentIndex + 1} of {moments.length} moments
                  </span>
                  <button
                    className="icon-button"
                    aria-label="Next moment"
                    title="Next moment"
                    onClick={() =>
                      selectMoment((momentIndex + 1) % moments.length)
                    }
                  >
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contact" ref={visitSection}>
          <div className="container contact-layout">
            <div className="contact-inner">
              <p className="eyebrow">Your family&apos;s next chapter</p>
              <h2>It starts with a hello.</h2>
              <p>
                A visit is the best way to see whether our little home feels
                like the right fit for your family.
              </p>
              <ul className="visit-expectations">
                <li>
                  <Check size={18} aria-hidden="true" /> Meet Naila and get to
                  know the daycare
                </li>
                <li>
                  <Check size={18} aria-hidden="true" /> Talk about your
                  child&apos;s routines and needs
                </li>
                <li>
                  <Check size={18} aria-hidden="true" /> Ask about openings,
                  care hours, and tuition
                </li>
              </ul>
              <span className="contact-location">
                <MapPin size={16} aria-hidden="true" /> Lawrenceville, Georgia
              </span>
              <PhoneContact />
            </div>
            <div
              className="visit-booking"
              aria-labelledby="visit-booking-title"
            >
              <CalendarDays size={32} aria-hidden="true" />
              <h3 id="visit-booking-title">Schedule a visit</h3>
              <p>We&apos;d love to meet your family.</p>
              <CalendlyBooking />
              <a
                className="text-link booking-direct"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open booking in a new tab{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="section questions-section" id="questions">
          <div className="container questions-grid">
            <div>
              <p className="eyebrow">For the grown-ups</p>
              <h2>
                Little questions.
                <br />
                Big decisions.
              </h2>
              <p>
                Choosing care is personal.
                <br />
                Here are a few things to start with.
              </p>
              <Heart
                className="questions-heart"
                size={64}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <ChevronDown size={21} aria-hidden="true" />
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
          <nav aria-label="Footer navigation">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <span className="footer-full-label">Schedule a visit</span>
              <span className="footer-short-label">Visit</span>
            </a>
            <a href="#programs">
              <span className="footer-full-label">Ages & care</span>
              <span className="footer-short-label">Ages</span>
            </a>
            <a href="#day">
              <span className="footer-full-label">A day here</span>
              <span className="footer-short-label">Our day</span>
            </a>
            <a href="#questions">
              <span className="footer-full-label">Parent questions</span>
              <span className="footer-short-label">Questions</span>
            </a>
          </nav>
          <a className="back-top" href="/" onClick={goToPageTop}>
            Back to top <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} Noor Daycare</span>
          <span>Photos are previews, not the actual daycare.</span>
        </div>
      </footer>
      <div className="mobile-visit-dock" hidden={!showVisitDock || menuOpen}>
        <span>Come say hello.</span>
        <a
          className="button button-red"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CalendarDays size={18} aria-hidden="true" /> Schedule a visit
        </a>
      </div>
    </>
  );
}
