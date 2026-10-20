import { useEffect, useState } from 'react';
import TextPressure from './components/TextPressure/TextPressure';
import DecryptedText from './components/DecryptedText/DecryptedText';
import MagnetLines from './components/MagnetLines/MagnetLines';
import Lanyard from './components/Lanyard/Lanyard';
import InfiniteMenu from './components/InfiniteMenu/InfiniteMenu';
import Cursor from './components/Cursor';

const BASE = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    image: `${BASE}covers/game-vault.png`,
    link: 'https://domainweb.my.id/my-game-portofolio/',
    title: 'Game Vault',
    description: 'Cinematic gaming portfolio — full-viewport hero, gold-on-navy, per-game detail pages with a live comment system.'
  },
  {
    image: `${BASE}covers/musikku.png`,
    link: 'https://github.com/Botann001/MusikKu',
    title: 'Musikku',
    description: 'Personal Android music player. Kotlin + Jetpack Compose, Jamendo & Audius streaming, background playback with Media3.'
  },
  {
    image: `${BASE}covers/inventaris.png`,
    link: 'https://github.com/Botann001',
    title: 'Inventaris Aset',
    description: 'School asset inventory app — native Android (Kotlin) rewrite of a PHP web app. CRUD, QR scanning, lending & returns.'
  },
  {
    image: `${BASE}covers/velvet-task.png`,
    link: 'https://botann001.github.io/velvet-task/',
    title: 'Velvet Task',
    description: 'A to-do tracker with theatrical flair — tasks, priorities and local persistence in pure HTML/CSS/JS.'
  },
  {
    image: `${BASE}covers/pomodoro.png`,
    link: 'https://botann001.github.io/POMODORO-PALACE/',
    title: 'Pomodoro Palace',
    description: 'Focus timer with daily & weekly stats, session history and a royal-palace twist on the classic Pomodoro technique.'
  },
  {
    image: `${BASE}covers/arcana.png`,
    link: 'https://github.com/Botann001',
    title: 'Arcana Finance',
    description: 'Expense tracker with Chart.js visualizations and per-category budgets — personal finance, tarot edition.'
  },
  {
    image: `${BASE}covers/my-datadiri.png`,
    link: 'https://domainweb.my.id/my-datadiri/',
    title: 'Data Diri',
    description: 'Interactive Persona-styled portfolio & bio — video backdrop, BGM audio, retro HUD interface, and full personal showcase.'
  },
  {
    image: `${BASE}covers/nekofocus.png`,
    link: 'https://botann001.github.io/nekofocus-rpg/',
    title: 'NekoFocus RPG',
    description: 'Virtual focus space & synth audio mixer with RPG progression — Pomodoro focus sessions, avatar studio, leveling XP, and procedural ambient sounds.'
  }
];

const SKILLS = ['PHP', 'JavaScript', 'Python', 'Java', 'Kotlin', 'HTML / CSS', 'React', 'React Native', 'MySQL', 'SQLite', 'Git'];

const LOADER_WORDS = ['Designing', 'Developing', 'Debugging', 'Shipping'];

function Loader({ done }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = LOADER_WORDS[Math.min(LOADER_WORDS.length - 1, Math.floor(pct / (100 / LOADER_WORDS.length)))];

  return (
    <div className={`loader ${done ? 'done' : ''}`} aria-hidden={done}>
      <div className="loader-brand">BOTAN® PORTFOLIO</div>
      <div className="loader-pct">
        {pct}
        <span>%</span>
      </div>
      <div className="loader-bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="loader-word">{word}</div>
    </div>
  );
}

function useWitaClock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Makassar'
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loaderGone, setLoaderGone] = useState(false);
  const clock = useWitaClock();

  useEffect(() => {
    const t1 = setTimeout(() => setLoading(false), 1750);
    const t2 = setTimeout(() => setLoaderGone(true), 2750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <Cursor />
      {!loaderGone && <Loader done={!loading} />}

      <header className="nav">
        <a className="nav-logo" href="#top">
          BOTAN<sup>®</sup>
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#works">Works</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-clock">BJR, ID — {clock} WITA</div>
      </header>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <DecryptedText text="Muhammad Okta Maulana — Portfolio ©2026" animateOn="view" sequential speed={28} />
            </p>
            <div className="hero-title">
              <TextPressure text="BOTAN" textColor="#edeae2" weight width italic alpha={false} />
            </div>
            <p className="hero-sub">
              <DecryptedText
                text="Information Systems student who builds for web & Android — PHP, Java, Python, Kotlin, and too much curiosity."
                animateOn="view"
                sequential
                speed={14}
                className="decrypted"
              />
            </p>
            <div className="hero-cta">
              <a className="btn btn-solid" href="#works">
                See Works ↓
              </a>
              <a className="btn btn-ghost" href="https://github.com/Botann001" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <b>10+</b> Projects shipped
              </div>
              <div>
                <b>2021</b> Coding since
              </div>
              <div>
                <b>UNISKA</b> Information Systems
              </div>
            </div>
          </div>

          <div className="hero-lanyard">
            <Lanyard
              frontImage={`${BASE}card-front.png`}
              backImage={`${BASE}card-back.png`}
              strapImage={`${BASE}strap.png`}
              cardColor="#0d1330"
              strapColor="#14141c"
              anchor="center"
            />
          </div>

          <div className="hero-scroll">Scroll — drag the card</div>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(n => (
              <span key={n}>
                PHP <i>✦</i> JAVASCRIPT <i>✦</i> PYTHON <i>✦</i> JAVA <i>✦</i> KOTLIN <i>✦</i> REACT <i>✦</i> HTML/CSS{' '}
                <i>✦</i> MYSQL <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- ABOUT ---------------- */}
        <section className="section" id="about">
          <div className="section-head">
            <span className="section-index">/ 01</span>
            <h2 className="section-title">
              <DecryptedText text="About Me" animateOn="view" sequential speed={45} />
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I&apos;m <b>Botan</b> — a final-year <b>Information Systems</b> student at UNISKA, Banjarbaru. I build
                things that solve my own problems first: a music player because I wanted one, inventory apps because
                paperwork is pain, and portfolios because showing beats telling.
              </p>
              <p>
                My toolkit spans <b>web and mobile</b> — Laravel-flavored PHP on the backend, Kotlin and React Native
                on Android, and hand-rolled HTML/CSS/JS when I want full control. Lately I&apos;ve been deep into
                agentic workflows: pairing with AI to design, build, and ship faster.
              </p>
              <p>
                Off the keyboard: games, music, and an ever-growing list of side projects I swear I&apos;ll finish.
              </p>
              <div className="skills">
                {SKILLS.map(s => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="magnet-panel">
              <MagnetLines lineColor="#4a5170" lineWidth={2} lineHeight={20} />
              <span className="magnet-tag">Move your cursor — the field reacts</span>
            </div>
          </div>
        </section>

        {/* ---------------- WORKS ---------------- */}
        <section className="section" id="works">
          <div className="section-head">
            <span className="section-index">/ 02</span>
            <h2 className="section-title">
              <DecryptedText text="Selected Works" animateOn="view" sequential speed={45} />
            </h2>
          </div>
          <p className="section-note">DRAG TO SPIN — CLICK THE CENTER CARD TO OPEN THE PROJECT</p>
          <div className="works-frame">
            <InfiniteMenu items={PROJECTS} scale={1.1} />
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section className="section contact" id="contact">
          <div className="section-head">
            <span className="section-index">/ 03</span>
            <h2 style={{ display: 'none' }}>Contact</h2>
          </div>
          <div className="contact-title">
            <TextPressure text="LET'S TALK" textColor="#edeae2" weight width italic />
          </div>
          <p className="hero-sub" style={{ marginTop: 10 }}>
            Got a project, an internship, or just a cool idea? My inbox is open — I reply faster than my Pomodoro
            timer.
          </p>
          <div className="contact-links">
            <a className="btn btn-solid" href="https://github.com/Botann001" target="_blank" rel="noreferrer">
              GitHub — Botann001 ↗
            </a>
            <a className="btn btn-ghost" href="https://domainweb.my.id" target="_blank" rel="noreferrer">
              domainweb.my.id ↗
            </a>
          </div>
          <p className="contact-note">Banjarbaru, South Kalimantan — working worldwide, remotely</p>
        </section>
      </main>

      <footer className="footer">
        <span>
          © 2026 <b>Botan®</b> — Muhammad Okta Maulana
        </span>
        <span>Built with React — Text Pressure · Lanyard · Infinite Menu</span>
        <span>Stay curious.</span>
      </footer>
    </>
  );
}
