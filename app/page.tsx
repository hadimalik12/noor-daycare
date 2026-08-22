const programs = [
  {
    age: 'Infants',
    range: '0-12 months',
    detail: 'Gentle routines, naps, feeding support, and close attention in a small home setting.',
  },
  {
    age: 'Toddlers',
    range: '13 months - 2 years',
    detail: 'Language, movement, sensory play, early independence, and steady daily rhythms.',
  },
  {
    age: 'Preschool',
    range: '3-4 years',
    detail: 'Stories, counting, art, music, outdoor play, and school-readiness moments for curious learners.',
  },
  {
    age: 'School Age',
    range: '5+ years',
    detail: 'Before and after care in a familiar environment with room to rest, read, and play.',
  },
];

const rhythms = [
  ['7:00', 'Warm arrivals and quiet play'],
  ['9:00', 'Breakfast, stories, and learning time'],
  ['11:00', 'Outdoor play or creative activity'],
  ['12:30', 'Lunch, rest, and nap routines'],
  ['3:30', 'Snack, centers, and pickup window'],
];

const questions = [
  'Which areas of the home do children use during care hours?',
  'How are backup care and closures handled if the provider is away?',
  'What symptoms require a child to stay home?',
  'How is supervision maintained with different ages together?',
];

const parentHelps = [
  'Full-time care',
  'Full-year schedule',
  'Subsidies and vouchers may be accepted',
  'CACFP / meal support listed publicly',
  'Multi-child discount listed publicly',
  'English and Pakistani language support listed publicly',
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Naila Ahmad Family Child Care home">
          <span className="brand-mark">N</span>
          <span>
            <strong>Naila Ahmad</strong>
            <small>Family Child Care</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#programs">Programs</a>
          <a href="#rhythm">Day</a>
          <a href="#trust">Trust</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-action" href="tel:17709782627">Call now</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Licensed home day care in Lawrenceville, GA</p>
          <h1>A small, steady place for little children to feel known.</h1>
          <p className="hero-lede">
            Family child care for infants, toddlers, preschoolers, and school-age children,
            with a small home-based setting and care from 7:00 AM to 6:00 PM.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Schedule a visit</a>
            <a className="button secondary" href="tel:17709782627">(770) 978-2627</a>
          </div>
          <dl className="quick-facts" aria-label="Daycare quick facts">
            <div>
              <dt>Setting</dt>
              <dd>Small home care</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>7 AM - 6 PM</dd>
            </div>
            <div>
              <dt>Record</dt>
              <dd>Licensed home</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" aria-label="Placeholder for daycare photos">
          <div className="photo-card main-photo">
            <span>Future photo</span>
            <strong>Play room</strong>
          </div>
          <div className="photo-card small-photo">
            <span>Future photo</span>
            <strong>Outdoor time</strong>
          </div>
          <div className="capacity-badge">
            <span>Licensed</span>
            <strong>Family Child Care Learning Home</strong>
          </div>
        </div>
      </section>

      <section className="intro-band" id="trust">
        <div>
          <p className="section-kicker">Compliance snapshot</p>
          <h2>Trust starts with clear basics.</h2>
        </div>
          <p>
            Ahmad, Naila is listed as a licensed Family Child Care Learning Home in
            Lawrenceville, Georgia. Public childcare directories describe the program as a
            home-based daycare serving infants through school-age children, with full-time
            care and weekday hours from 7:00 AM to 6:00 PM.
          </p>
      </section>

      <section className="section" id="programs">
        <div className="section-heading">
          <p className="section-kicker">Ages served</p>
          <h2>Care that fits each stage.</h2>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.age}>
              <p>{program.range}</p>
              <h3>{program.age}</h3>
              <span>{program.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="rhythm-section" id="rhythm">
        <div className="rhythm-copy">
          <p className="section-kicker">Daily rhythm</p>
          <h2>Predictable days help children settle in.</h2>
          <p>
            The exact schedule can shift with age, naps, weather, and family needs, but the
            day is designed around calm transitions, play, meals, rest, and connection.
          </p>
        </div>
        <div className="timeline" aria-label="Example daily schedule">
          {rhythms.map(([time, label]) => (
            <div className="timeline-row" key={time}>
              <strong>{time}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section help-section">
        <div className="section-heading">
          <p className="section-kicker">Family support</p>
          <h2>Practical details parents usually ask about.</h2>
          <p>
            Public listings mention several family-friendly supports. These should be
            confirmed directly during a call or tour because availability can change.
          </p>
        </div>
        <div className="help-grid">
          {parentHelps.map((help) => (
            <div className="help-item" key={help}>{help}</div>
          ))}
        </div>
      </section>

      <section className="section visit-section">
        <div className="visit-card">
          <p className="section-kicker">For your tour</p>
          <h2>Helpful questions to bring with you.</h2>
          <ul>
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
        <div className="placeholder-stack" aria-hidden="true">
          <div className="stack-photo top">Future photo</div>
          <div className="stack-photo bottom">Future photo</div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>Ask about availability or schedule a visit.</h2>
          <p>
            Call to confirm openings, tour times, rates, and whether the current age mix is
            a good fit for your child.
          </p>
        </div>
        <address>
          <strong>Naila Ahmad Family Child Care</strong>
          <span>2190 Primrose Place Lane</span>
          <span>Lawrenceville, GA 30044</span>
          <a href="tel:17709782627">(770) 978-2627</a>
        </address>
      </section>

      <footer>
        <p>Naila Ahmad Family Child Care</p>
        <p>Licensed home day care serving Lawrenceville families.</p>
      </footer>
    </main>
  );
}
