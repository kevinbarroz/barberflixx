// BarberFlix — shared UI components

const { useState, useEffect, useRef, useCallback } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Icons (inline SVG, stroke-based, 20px default)
// ─────────────────────────────────────────────────────────────────────────────
function Icon({ name, size = 20, fill = "none", style }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill, stroke: "currentColor", strokeWidth: 1.6,
    strokeLinecap: "round", strokeLinejoin: "round",
    style,
  };
  const paths = {
    play:    <polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none" />,
    pause:   <g><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"/></g>,
    plus:    <g><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></g>,
    check:   <polyline points="20 6 9 17 4 12"/>,
    heart:   <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    heartF:  <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>,
    search:  <g><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></g>,
    bell:    <g><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></g>,
    chevL:   <polyline points="15 18 9 12 15 6"/>,
    chevR:   <polyline points="9 18 15 12 9 6"/>,
    chevD:   <polyline points="6 9 12 15 18 9"/>,
    chevU:   <polyline points="6 15 12 9 18 15"/>,
    info:    <g><circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></g>,
    arrowR:  <g><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></g>,
    arrowL:  <g><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></g>,
    star:    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" fill="currentColor" stroke="none"/>,
    starO:   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />,
    user:    <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
    award:   <g><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></g>,
    clock:   <g><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></g>,
    eye:     <g><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></g>,
    download:<g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></g>,
    share:   <g><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></g>,
    volume:  <g><polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="currentColor"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></g>,
    settings:<g><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></g>,
    list:    <g><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/></g>,
    fs:      <g><polyline points="4 14 4 20 10 20"/><polyline points="20 10 20 4 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></g>,
    skip:    <g><polygon points="5 4 15 12 5 20" fill="currentColor" stroke="none"/><line x1="19" y1="5" x2="19" y2="19"/></g>,
    skipB:   <g><polygon points="19 20 9 12 19 4" fill="currentColor" stroke="none"/><line x1="5" y1="5" x2="5" y2="19"/></g>,
    crown:   <path d="M3 20h18l-2-10-4 4-4-7-4 7-4-4-2 10z" fill="currentColor" stroke="none"/>,
    sparkle: <g><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" /></g>,
    fire:    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-4-3-6-1 2-3 2-3 0 0-3 1-5 1-7-3 1-9 5-9 12a7 7 0 0 0 7 8z" fill="currentColor" stroke="none"/>,
    trendUp: <g><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></g>,
    users:   <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></g>,
    money:   <g><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></g>,
    book:    <g><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></g>,
    grid:    <g><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></g>,
    bar:     <g><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></g>,
    logout:  <g><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></g>,
    edit:    <g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></g>,
    close:   <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
    mail:    <g><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></g>,
    lock:    <g><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
    apple:   <path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>,
    google:  <g><path d="M21.8 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.5c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3-4.5 3-7.5z" fill="#4285f4" stroke="none"/><path d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 19.6 8 22 12 22z" fill="#34a853" stroke="none"/><path d="M6.2 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.1.3-1.7V7.6H2.7C2.2 8.9 2 10.4 2 12s.3 3.1.7 4.4l3.5-2.7z" fill="#fbbc04" stroke="none"/><path d="M12 5.4c1.5 0 2.9.5 4 1.5l3-3C17.1 2.3 14.7 1 12 1 8 1 4.4 3.4 2.7 7.6l3.5 2.7C7 7.8 9.3 5.4 12 5.4z" fill="#ea4335" stroke="none"/></g>,
  };
  return <svg {...props}>{paths[name] || null}</svg>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Brand / Logo
// ─────────────────────────────────────────────────────────────────────────────
function Brand({ size = "md", onClick }) {
  const fz = size === "lg" ? 38 : size === "sm" ? 20 : 26;
  return (
    <div className="brand" style={{ fontSize: fz }} onClick={onClick}>
      <span>BARBER</span><span className="brand-x">FLIX</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Poster card  —  the workhorse
// ─────────────────────────────────────────────────────────────────────────────
function Poster({ series, onClick, showProgress = false, idx }) {
  const p = window.BFData.POSTERS[series.poster];
  return (
    <div className="poster" onClick={() => onClick && onClick(series)}>
      <div className="poster-bg" style={{ background: p.gradient }}>
        {/* big glyph number, watermark-style */}
        <div style={{
          position: "absolute", right: -10, bottom: -20,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 32cqw, 220px)",
          lineHeight: 0.8, fontWeight: 400,
          color: "rgba(255,255,255,0.05)",
          letterSpacing: "-0.04em",
        }}>{p.glyph}</div>
        {/* color accent gradient */}
        <div style={{ position: "absolute", inset: 0, background: p.accent }} />
        {/* subtle vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(0,0,0,0.5) 100%)",
        }} />
      </div>

      <div className="poster-overlay" />

      {/* badges top-left */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        display: "flex", gap: 6, zIndex: 3,
      }}>
        {series.new && <span className="badge badge-new">Novo</span>}
        {series.vip && <span className="badge badge-vip">VIP</span>}
      </div>

      <div className="poster-info">
        <div className="kicker kicker-muted" style={{ fontSize: 9 }}>
          {series.category}
        </div>
        <div className="poster-title">{series.title}</div>
        <div className="poster-meta">
          {series.episodes} ep · {series.duration} · {series.level}
        </div>
      </div>

      {showProgress && series.progress > 0 && (
        <div className="poster-progress">
          <div style={{ width: `${series.progress * 100}%` }} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal carousel with arrows
// ─────────────────────────────────────────────────────────────────────────────
function Carousel({ title, kicker, items, onSelect, showProgress }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 600, behavior: "smooth" });
  };
  return (
    <div className="section car-wrap">
      <div className="section-head">
        <div>
          {kicker && <div className="kicker" style={{ marginBottom: 4 }}>{kicker}</div>}
          <h2>{title}</h2>
        </div>
        <span className="more">Ver todos ›</span>
      </div>
      <button className="car-arrow left"  onClick={() => scroll(-1)} aria-label="Anterior"><Icon name="chevL" size={22} /></button>
      <button className="car-arrow right" onClick={() => scroll(1)}  aria-label="Próximo"><Icon name="chevR" size={22} /></button>
      <div className="scroll-row" ref={ref}>
        {items.map((s, i) => (
          <Poster key={s.id} series={s} idx={i} onClick={onSelect} showProgress={showProgress} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TopNav (used on all main screens)
// ─────────────────────────────────────────────────────────────────────────────
function TopNav({ current, onNavigate, onSearchSubmit }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "home",      label: "Início" },
    { id: "series",    label: "Séries" },
    { id: "favorites", label: "Minha Lista" },
    { id: "profile",   label: "Meu Estúdio" },
  ];
  return (
    <header className={`topnav ${scrolled ? "scrolled" : ""}`}>
      <Brand onClick={() => onNavigate("home")} />
      <nav className="topnav-links">
        {links.map(l => (
          <a key={l.id}
             className={current === l.id ? "active" : ""}
             onClick={() => onNavigate(l.id === "favorites" || l.id === "series" ? "home" : l.id)}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="topnav-right">
        <div className="search-bar">
          <Icon name="search" size={16} style={{ color: "var(--text-muted)" }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && onSearchSubmit) onSearchSubmit(q); }}
            placeholder="Buscar cursos, técnicas, mentores..."
          />
        </div>
        <button className="btn-icon" aria-label="Notificações" style={{ width: 36, height: 36 }}>
          <Icon name="bell" size={16} />
        </button>
        <div className="avatar" onClick={() => onNavigate("profile")} title={window.BFData.USER.name}>
          {window.BFData.USER.initials}
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Star rating display
// ─────────────────────────────────────────────────────────────────────────────
function Stars({ value, size = 12 }) {
  const full = Math.floor(value);
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "var(--gold)" }}>
      {[0,1,2,3,4].map(i => (
        <Icon key={i} name={i < full ? "star" : "starO"} size={size} />
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress ring (for profile stats)
// ─────────────────────────────────────────────────────────────────────────────
function Ring({ value, size = 56, stroke = 5, color = "var(--accent)", label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
                strokeDasharray={c} strokeDashoffset={c * (1 - value)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.6s var(--ease-out)" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 12, fontWeight: 600,
      }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Format helpers
// ─────────────────────────────────────────────────────────────────────────────
const fmt = {
  num:  (n) => n.toLocaleString("pt-BR"),
  money:(n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  pct:  (n) => Math.round(n * 100) + "%",
};

// ─────────────────────────────────────────────────────────────────────────────
// Upcoming card  —  landscape, locked, "coming soon"
// ─────────────────────────────────────────────────────────────────────────────
function UpcomingCard({ item }) {
  const p = window.BFData.POSTERS[item.poster];
  const hueTint = `linear-gradient(180deg,
    transparent 0%,
    hsla(${item.accentHue}, 50%, 25%, 0.35) 80%,
    hsla(${item.accentHue}, 55%, 30%, 0.5) 100%)`;
  return (
    <div className="upcoming" title={`${item.title} — ${item.releaseDate}`}>
      <div className="uc-bg" style={{ background: p.gradient }} />
      <div className="uc-bg" style={{ background: hueTint, filter: "none" }} />
      <div className="uc-scrim" />
      <div className="uc-hatch" />
      <div className="uc-shimmer" />

      <span className="uc-status">
        <span className="uc-dot" />
        {item.statusLabel}
      </span>

      <div className="uc-lock-ring r2" />
      <div className="uc-lock-ring" />
      <div className="uc-lock"><LockIcon /></div>

      <div className="uc-info">
        <div className="uc-title">{item.title}</div>
        <div className="uc-meta">
          <span>{item.episodes} ep · {item.duration}</span>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <span className="uc-date">
            <Icon name="clock" size={11} /> {item.releaseDate}
          </span>
        </div>
      </div>

      <div className="uc-hover">
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.title}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Com {item.mentor} · {item.releaseDate}
          </div>
        </div>
        <button className="uc-notify" onClick={(e) => e.stopPropagation()}>
          <Icon name="bell" size={11} /> Avise-me
        </button>
      </div>
    </div>
  );
}

// Custom minimalist lock icon (so it reads "chain/lock" elegantly)
function LockIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round"
         style={{ color: "rgba(255,255,255,0.92)", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.18))" }}>
      <rect x="5" y="10.5" width="14" height="10.5" rx="2"/>
      <path d="M8 10.5V7a4 4 0 1 1 8 0v3.5"/>
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>
    </svg>
  );
}

// Upcoming carousel — landscape rail
function UpcomingCarousel({ title, kicker, items }) {
  const ref = useRef(null);
  const scroll = (d) => ref.current && ref.current.scrollBy({ left: d * 700, behavior: "smooth" });
  return (
    <div className="section car-wrap">
      <div className="section-head">
        <div>
          {kicker && <div className="kicker kicker-gold" style={{ marginBottom: 4 }}>{kicker}</div>}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h2>{title}</h2>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em",
            }}>
              <LockIcon size={11} />
              {items.length} lançamentos a caminho
            </span>
          </div>
        </div>
        <span className="more">Calendário ›</span>
      </div>
      <button className="car-arrow left"  onClick={() => scroll(-1)}><Icon name="chevL" size={22} /></button>
      <button className="car-arrow right" onClick={() => scroll(1)}><Icon name="chevR" size={22} /></button>
      <div className="scroll-row upcoming-row" ref={ref}>
        {items.map(it => <UpcomingCard key={it.id} item={it} />)}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Brand, Poster, Carousel, TopNav, Stars, Ring, fmt, UpcomingCard, UpcomingCarousel, LockIcon });
