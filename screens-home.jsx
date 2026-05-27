// BarberFlix — Home screen (Netflix-style)

const { useState: useStateHome, useEffect: useEffectHome, useRef: useRefHome } = React;

function HomeScreen({ onNavigate, onSelectSeries }) {
  const { SERIES, POSTERS, CONTINUE_WATCHING, NEW_RELEASES, VIP_ONLY, TRENDING, USER, UPCOMING } = window.BFData;
  const featured = SERIES[3]; // Pigmentação Masculina — the new + VIP one
  const p = POSTERS[featured.poster];

  return (
    <div className="page-enter">
      <TopNav current="home" onNavigate={onNavigate} />

      {/* ───────── Hero ───────── */}
      <section className="hero">
        <div className="hero-bg" style={{ background: p.gradient }} />
        <div style={{
          position: "absolute",
          right: "8%", top: "10%",
          fontFamily: "var(--font-display)",
          fontSize: "min(38vw, 580px)",
          fontWeight: 400, lineHeight: 0.8,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.06em",
          pointerEvents: "none",
        }}>{p.glyph}</div>

        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(170,80,210,0.18) 0%, transparent 50%)",
        }} />

        <div className="hero-vignette" />
        <div className="hero-noise" />

        <div className="hero-content">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span className="badge badge-new">Novo</span>
            <span className="badge badge-vip">VIP Black</span>
            <span className="badge badge-ghost">Lançamento 2025</span>
          </div>

          <h1 className="display" style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: 18,
          }}>{featured.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18,
                        fontSize: 13, color: "var(--text-2)" }}>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>★ {featured.rating}</span>
            <span>{featured.year}</span>
            <span>·</span>
            <span>{featured.episodes} episódios</span>
            <span>·</span>
            <span>{featured.duration}</span>
            <span>·</span>
            <span className="badge badge-ghost" style={{ height: 20, fontSize: 9 }}>{featured.level}</span>
          </div>

          <p style={{
            fontSize: 17, lineHeight: 1.5, color: "var(--text-2)",
            maxWidth: 560, marginBottom: 28,
          }}>{featured.synopsis}</p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn-primary" onClick={() => onSelectSeries(featured, "episode")}>
              <Icon name="play" size={18} />
              Assistir agora
            </button>
            <button className="btn btn-ghost" onClick={() => onSelectSeries(featured, "series")}>
              <Icon name="info" size={18} />
              Mais informações
            </button>
            <button className="btn-icon" title="Adicionar à lista">
              <Icon name="plus" size={18} />
            </button>
            <button className="btn-icon" title="Mais tarde">
              <Icon name="heart" size={18} />
            </button>
          </div>

          <div style={{ marginTop: 36, fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.05em" }}>
            COM <span style={{ color: "var(--text-2)", fontWeight: 600 }}>{featured.mentor.toUpperCase()}</span>
            <span style={{ margin: "0 10px" }}>·</span>
            {featured.mentorTitle}
          </div>
        </div>
      </section>

      {/* ───────── Continue assistindo ───────── */}
      {CONTINUE_WATCHING.length > 0 && (
        <Carousel
          kicker={`OLÁ, ${USER.name.split(" ")[0].toUpperCase()}`}
          title="Continue assistindo"
          items={CONTINUE_WATCHING}
          onSelect={(s) => onSelectSeries(s, "series")}
          showProgress={true}
        />
      )}

      {/* ───────── Em alta ───────── */}
      <Carousel
        kicker="EM ALTA NA SEMANA"
        title="Os mais assistidos"
        items={TRENDING}
        onSelect={(s) => onSelectSeries(s, "series")}
      />

      {/* ───────── Top 10 ───────── */}
      <Top10 series={[...SERIES].sort((a,b) => b.students - a.students).slice(0, 8)}
             onSelect={(s) => onSelectSeries(s, "series")} />

      {/* ───────── Novos lançamentos ───────── */}
      <Carousel
        kicker="ACABOU DE CHEGAR"
        title="Novos lançamentos"
        items={NEW_RELEASES}
        onSelect={(s) => onSelectSeries(s, "series")}
      />

      {/* ───────── Em Breve / Próximos lançamentos ───────── */}
      <UpcomingCarousel
        kicker="EM BREVE NA BARBERFLIX"
        title="Próximos lançamentos"
        items={UPCOMING}
      />

      {/* ───────── VIP only ───────── */}
      <Carousel
        kicker="EXCLUSIVO VIP BLACK"
        title="Conteúdo Premium"
        items={VIP_ONLY}
        onSelect={(s) => onSelectSeries(s, "series")}
      />

      {/* ───────── Negócios ───────── */}
      <Carousel
        kicker="GESTÃO E NEGÓCIO"
        title="Para quem quer crescer fora da cadeira"
        items={SERIES.filter(s => s.category === "Negócios")}
        onSelect={(s) => onSelectSeries(s, "series")}
      />

      {/* ───────── Técnica ───────── */}
      <Carousel
        kicker="DOMÍNIO TÉCNICO"
        title="Técnica pura, desconstruída"
        items={SERIES.filter(s => ["Técnicas de Corte","Cortes Clássicos","Barba","Fundamentos","Estética Masculina"].includes(s.category))}
        onSelect={(s) => onSelectSeries(s, "series")}
      />

      <Footer />
    </div>
  );
}

function Top10({ series, onSelect }) {
  const ref = useRefHome(null);
  const scroll = (d) => ref.current && ref.current.scrollBy({ left: d * 600, behavior: "smooth" });
  return (
    <div className="section car-wrap">
      <div className="section-head">
        <div>
          <div className="kicker" style={{ marginBottom: 4 }}>TOP 10 NO BRASIL</div>
          <h2>Hoje na BarberFlix</h2>
        </div>
        <span className="more">Ver todos ›</span>
      </div>
      <button className="car-arrow left"  onClick={() => scroll(-1)}><Icon name="chevL" size={22} /></button>
      <button className="car-arrow right" onClick={() => scroll(1)}><Icon name="chevR" size={22} /></button>
      <div className="scroll-row" ref={ref} style={{ paddingLeft: "calc(var(--gutter) + 56px)" }}>
        {series.map((s, i) => (
          <div key={s.id} style={{ position: "relative", paddingLeft: 56 }}>
            <div style={{
              position: "absolute",
              left: -10, bottom: -16,
              fontFamily: "var(--font-display)",
              fontSize: "calc(var(--card-h) * 0.95)",
              lineHeight: 0.78,
              fontWeight: 400,
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.18)",
              letterSpacing: "-0.06em",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 1,
            }}>{i + 1}</div>
            <Poster series={s} onClick={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "80px var(--gutter) 48px",
      borderTop: "1px solid var(--border)",
      marginTop: 80,
      color: "var(--text-dim)",
      fontSize: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 32 }}>
        <div style={{ maxWidth: 320 }}>
          <Brand size="md" />
          <p style={{ marginTop: 16, lineHeight: 1.6 }}>
            A maior plataforma de educação para barbeiros do Brasil. Conteúdo desenvolvido por master barbers, executado em estúdio cinematográfico.
          </p>
        </div>
        <div style={{ display: "flex", gap: 64 }}>
          <div>
            <div style={{ color: "var(--text-2)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 11 }}>Plataforma</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a>Catálogo</a><a>Mentores</a><a>Certificados</a><a>Para Equipes</a>
            </div>
          </div>
          <div>
            <div style={{ color: "var(--text-2)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 11 }}>Suporte</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a>Central de ajuda</a><a>Contato</a><a>Comunidade</a><a>Status</a>
            </div>
          </div>
          <div>
            <div style={{ color: "var(--text-2)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 11 }}>Legal</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a>Termos</a><a>Privacidade</a><a>Cookies</a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--border)" }}>
        <div>© 2025 BarberFlix Educação Ltda · CNPJ 00.000.000/0001-00</div>
        <div>São Paulo · Brasil</div>
      </div>
    </footer>
  );
}

Object.assign(window, { HomeScreen });
