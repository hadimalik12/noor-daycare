"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
  X,
} from "lucide-react";

const photos = {
  room: "/images/playroom-preview.jpg",
  outdoor: "/images/outdoor-preview.jpg",
  art: "/images/art-preview.jpg",
};

const programs = [
  {
    name: "Infants",
    range: "0-12 months",
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
    name: "Preschool",
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
  {
    name: "School age",
    range: "5+ years",
    icon: BookOpen,
    color: "blue",
    title: "A familiar place to land.",
    description:
      "A home environment with room for older children to unwind, read, and enjoy time with others.",
    details: [
      "Time to rest and recharge",
      "Reading and creative activities",
      "A mixed-age home setting",
    ],
    note: "Confirm school-age availability, care times, and any school transportation needs directly with Naila.",
  },
];
const moments = [
  {
    time: "7:00 AM",
    label: "Hello, day!",
    icon: Sun,
    title: "A little time to settle in.",
    text: "An unhurried arrival, familiar toys, and quiet play can help children ease into the day.",
    image: photos.room,
    alt: "Preview of a bright home playroom with toys and books",
  },
  {
    time: "9:00 AM",
    label: "Make & discover",
    icon: Palette,
    title: "Where will curiosity take us?",
    text: "Breakfast, stories, and creative play make room for new words, ideas, and discoveries.",
    image: photos.art,
    alt: "Preview of children painting together at a table",
  },
  {
    time: "11:00 AM",
    label: "Out we go",
    icon: Sprout,
    title: "A change of scenery.",
    text: "Outdoor play when the weather allows, or an indoor activity to get little bodies moving.",
    image: photos.outdoor,
    alt: "Preview of an outdoor childcare play space",
  },
  {
    time: "12:30 PM",
    label: "Rest & recharge",
    icon: Moon,
    title: "A softer part of the day.",
    text: "Lunch and a quieter rhythm, with rest and nap routines shaped around children's ages and needs.",
    image: photos.room,
    alt: "Preview of a home childcare room",
  },
  {
    time: "3:30 PM",
    label: "Play & goodbye",
    icon: Heart,
    title: "One more story before home.",
    text: "A snack, time to play, and familiar routines as families begin to arrive. Care hours end at 6:00 PM.",
    image: photos.art,
    alt: "Preview of children sharing a creative activity",
  },
];
const faqs = [
  {
    question: "What ages do you care for?",
    answer:
      "The program is listed as serving infants, toddlers, preschoolers, and school-age children. Openings depend on the current group, so confirm availability for your child's age before making plans.",
  },
  {
    question: "What are the hours?",
    answer:
      "Listed care hours are 7:00 AM to 6:00 PM on weekdays. Full-time, full-year care is mentioned in public listings. Confirm holidays, closures, and the schedule available to your family with Naila.",
  },
  {
    question: "Is this a licensed home daycare?",
    answer:
      "Yes. Ahmad, Naila is listed as a licensed Family Child Care Learning Home in Lawrenceville, Georgia. A visit is a good time to review the current license and discuss supervision and the spaces children use.",
  },
  {
    question: "What about tuition, meals, and family support?",
    answer:
      "Public directories mention subsidies or vouchers, meal support through CACFP, and a multi-child discount. Ask Naila which options currently apply, what meals are included, and what your family's tuition would be.",
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
function Brand() {
  return (
    <a
      className="brand"
      href="#top"
      aria-label="Naila Ahmad Family Child Care home"
    >
      <span className="brand-mark">
        <House size={27} strokeWidth={2.3} aria-hidden="true" />
      </span>
      <span>
        <strong>Naila Ahmad</strong>
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

  useEffect(() => {
    const heroLink = heroVisitLink.current;
    const contact = visitSection.current;
    if (!heroLink || !contact) return;
    let heroPassed = false;
    let contactReached = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroLink)
            heroPassed = entry.boundingClientRect.bottom < 90;
          if (entry.target === contact)
            contactReached =
              entry.isIntersecting || entry.boundingClientRect.bottom < 0;
        }
        setShowVisitDock(heroPassed && !contactReached);
      },
      { rootMargin: "-90px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(heroLink);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  function selectMoment(index: number) {
    setMomentIndex(index);
    const tab = document.getElementById(`day-${index}`);
    const list = tab?.parentElement;
    if (tab && list) {
      list.scrollTo({
        left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      });
    }
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
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">Our little home</a>
            <a href="#programs">Ages & care</a>
            <a href="#day">A day here</a>
            <a href="#questions">Parent questions</a>
          </nav>
          <a className="button header-cta" href="#contact">
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
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {[
            ["#about", "Our little home"],
            ["#programs", "Ages & care"],
            ["#day", "A day here"],
            ["#questions", "Parent questions"],
            ["#contact", "Schedule a visit"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
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
              Naila Ahmad<span>Family Child Care</span>
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
              href="#contact"
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
              <Clock3 aria-hidden="true" /> 7:00 AM - 6:00 PM
            </span>
            <span>
              <Heart aria-hidden="true" /> Infants through school age
            </span>
          </div>
        </div>
        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-photo-wrap">
              <PreviewPhoto
                src={photos.art}
                alt="Preview of young children exploring paint at a table"
              />
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
                Naila Ahmad Family Child Care is a licensed home daycare in
                Lawrenceville, welcoming children from infancy through school
                age.
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
                From first discoveries to school-day stories, there&apos;s a lot
                of growing to do.
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
            <div className="program-visit">
              <p>
                Wondering if we&apos;re the right fit?{" "}
                <strong>Let&apos;s meet.</strong>
              </p>
              <a className="button button-red" href="#contact">
                <CalendarDays size={18} aria-hidden="true" /> Schedule a visit
              </a>
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
                An example of how a day might unfold. Routines flex with
                children&apos;s ages, naps, and the weather.
              </p>
            </div>
            <div
              className="day-tabs"
              role="tablist"
              aria-label="Example daily routine"
            >
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
                <p>{moment.text}</p>
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
            </div>
            <div
              className="visit-booking"
              aria-labelledby="visit-booking-title"
            >
              <CalendarDays size={32} aria-hidden="true" />
              <h3 id="visit-booking-title">Schedule a visit</h3>
              <p>We&apos;d love to meet your family.</p>
              <div className="booking-placeholder">
                <strong>Online scheduling coming soon</strong>
                <p>
                  You&apos;ll be able to arrange a visit here once booking
                  opens.
                </p>
              </div>
              <button
                className="button booking-unavailable"
                type="button"
                disabled
              >
                <CalendarDays size={18} aria-hidden="true" /> Booking opens soon
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand />
          <nav aria-label="Footer navigation">
            <a href="#contact">Schedule a visit</a>
            <a href="#programs">Ages & care</a>
            <a href="#day">A day here</a>
            <a href="#questions">Parent questions</a>
          </nav>
          <a className="back-top" href="#top">
            Back to top <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Naila Ahmad Family Child Care
          </span>
          <span>Photos are previews, not the actual daycare.</span>
        </div>
      </footer>
      <div className="mobile-visit-dock" hidden={!showVisitDock || menuOpen}>
        <span>Come say hello.</span>
        <a className="button button-red" href="#contact">
          <CalendarDays size={18} aria-hidden="true" /> Schedule a visit
        </a>
      </div>
    </>
  );
}
