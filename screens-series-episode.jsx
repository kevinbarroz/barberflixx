// BarberFlix — Series detail + Episode player screens

const { useState: useStateSE, useEffect: useEffectSE, useRef: useRefSE } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Series detail screen
// ─────────────────────────────────────────────────────────────────────────────
function SeriesScreen({ series, onNavigate, onSelectSeries, onPlayEpisode }) {
  const { POSTERS, REVIEWS, SERIES } = window.BFData;
  const p = POSTERS[series.poster];
  const [tab, setTab] = useStateSE("episodes");
  const [liked, setLiked] = useStateSE(false);
  const [inList, setInList] = useStateSE(false);

  // Related series (same category, excluding self)
  const related = SERIES.filter(s => s.category === series.category && s.id !== series.id).slice(0, 6);
  const more = SERIES.filter(s => s.id !== series.id).slice(0, 6);

  return (
    <div className="page-enter">
      <TopNav current="home" onNavigate={onNavigate} />

      {/* Cinematic header */}
      <section style={{ position: "relative", height: "78vh", minHeight: 560, overflow: "hidden" }} className="series-hero">
        <div style={{ position: "absolute", inset: 0, background: p.gradient }} />
        <div style={{ position: "absolute", inset: 0, background: p.accent }} />
        <div style={{
          position: "absolute", right: "-4%", top: "8%",
          fontFamily: "var(--font-display)",
          fontSize: "min(42vw, 620px)", fontWeight: 400, lineHeight: 0.8,
          color: "rgba(255,255,255,0.05)", letterSpacing: "-0.06em",
        }}>{p.glyph}</div>
        <div className="hero-vignette" />
        <div className="hero-noise" />

        {/* back chip */}
        <button
          onClick={() => onNavigate("home")}
          style={{
            position: "absolute", top: 90, left: "var(--gutter)", zIndex: 5,
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)",
            color: "var(--text)", padding: "8px 14px", borderRadius: 999, cursor: "pointer",
            fontSize: 12, backdropFilter: "blur(10px)",
          }}>
          <Icon name="chevL" size={14} /> Voltar ao catálogo
        </button>

        <div style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 var(--gutter) 64px",
          maxWidth: 880,
        }}>
          <div className="kicker" style={{ marginBottom: 12 }}>{series.category} · {series.season} · {series.year}</div>
          <h1 className="display" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 0.92,
            letterSpacing: "-0.02em", marginBottom: 14,
          }}>{series.title}</h1>
          <div style={{ fontSize: 18, color: "var(--text-2)", marginBottom: 22, fontStyle: "italic", fontFamily: "var(--font-display)" }}>
            {series.subtitle}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, fontSize: 13, color: "var(--text-2)", flexWrap: "wrap" }} className="series-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--gold)" }}>
              <Icon name="star" size={13} /> {series.rating}
            </span>
            <span>·</span>
            <span>{series.episodes} episódios</span>
            <span>·</span>
            <span>{series.duration}</span>
            <span>·</span>
            <span className="badge badge-ghost" style={{ height: 20, fontSize: 9 }}>{series.level}</span>
            <span>·</span>
            <span>{fmt.num(series.students)} alunos</span>
            {series.vip && (<><span>·</span><span className="badge badge-vip">VIP Black</span></>)}
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-2)", maxWidth: 680, marginBottom: 28 }}>
            {series.synopsis}
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn-primary" onClick={() => onPlayEpisode(series, series.episodeList[0])}>
              <Icon name="play" size={18} />
              {series.progress > 0 ? "Continuar episódio" : "Começar série"}
            </button>
            <button className={"btn-icon"} onClick={() => setInList(!inList)} title={inList ? "Na minha lista" : "Adicionar à minha lista"}>
              <Icon name={inList ? "check" : "plus"} size={18} />
            </button>
            <button className={"btn-icon"} onClick={() => setLiked(!liked)} title={liked ? "Favoritado" : "Favoritar"}
                    style={{ color: liked ? "var(--accent)" : undefined }}>
              <Icon name={liked ? "heartF" : "heart"} size={18} />
            </button>
            <button className="btn-icon" title="Compartilhar"><Icon name="share" size={18} /></button>
          </div>

          {/* mentor card */}
          <div style={{
            marginTop: 32, display: "flex", alignItems: "center", gap: 14,
            padding: "14px 20px 14px 14px", borderRadius: 10,
            background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)", width: "fit-content",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), #5a0010)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 16, color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>{series.mentor.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Apresentado por</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{series.mentor}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{series.mentorTitle}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 32,
        padding: "0 var(--gutter)",
        borderBottom: "1px solid var(--border)",
        marginBottom: 32,
      }} className="series-tabs">
        {[
          { id: "episodes", label: `Episódios · ${series.episodes}` },
          { id: "about",    label: "Sobre" },
          { id: "reviews",  label: `Avaliações · ${series.rating}` },
          { id: "related",  label: "Relacionados" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              background: "transparent", border: 0, cursor: "pointer",
              color: tab === t.id ? "var(--text)" : "var(--text-muted)",
              fontSize: 14, fontWeight: tab === t.id ? 600 : 500,
              padding: "16px 0", borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "color 0.2s",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "0 var(--gutter) 80px" }}>
        {tab === "episodes" && (
          <div style={{ display: "grid", gap: 12, maxWidth: 1200 }}>
            {series.episodeList.map(ep => (
              <EpisodeRow key={ep.n} ep={ep} series={series} onPlay={() => onPlayEpisode(series, ep)} />
            ))}
          </div>
        )}

        {tab === "about" && (
          <div style={{ maxWidth: 800, display: "grid", gap: 28 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>SOBRE A SÉRIE</div>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text-2)" }}>{series.synopsis}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { label: "Nível",        v: series.level },
                { label: "Duração",      v: series.duration },
                { label: "Episódios",    v: series.episodes + "" },
                { label: "Idioma",       v: "PT-BR" },
                { label: "Legendas",     v: "PT · EN · ES" },
                { label: "Certificado",  v: "Sim · 20h" },
                { label: "Materiais",    v: "PDFs + Templates" },
                { label: "Acesso",       v: series.vip ? "VIP Black" : "Todos os planos" },
              ].map(f => (
                <div key={f.label} style={{ padding: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontWeight: 600 }}>{f.v}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="kicker" style={{ marginBottom: 12 }}>O QUE VOCÊ VAI APRENDER</div>
              <div style={{ display: "grid", gap: 8 }}>
                {series.tags.map(t => (
                  <div key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Icon name="check" size={16} style={{ color: "var(--accent)" }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div style={{ maxWidth: 800, display: "grid", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 1, color: "var(--gold)" }}>{series.rating}</div>
                <Stars value={series.rating} size={14} />
                <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>{fmt.num(series.students)} alunos</div>
              </div>
              <div style={{ flex: 1, display: "grid", gap: 6 }}>
                {[5,4,3,2,1].map(n => {
                  const pct = n === 5 ? 0.78 : n === 4 ? 0.16 : n === 3 ? 0.04 : 0.01;
                  return (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 14, fontSize: 12, color: "var(--text-muted)" }}>{n}★</span>
                      <div style={{ flex: 1, height: 6, background: "var(--surface-3)", borderRadius: 3 }}>
                        <div style={{ width: `${pct * 100}%`, height: "100%", background: "var(--gold)", borderRadius: 3 }} />
                      </div>
                      <span style={{ width: 36, textAlign: "right", fontSize: 12, color: "var(--text-muted)" }}>{Math.round(pct*100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div className="avatar" style={{ width: 36, height: 36 }}>{r.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.when}</div>
                  </div>
                  <Stars value={r.rating} size={12} />
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "related" && (
          <div style={{ display: "grid", gap: 32 }}>
            {related.length > 0 && (
              <div>
                <div className="kicker" style={{ marginBottom: 14 }}>NA MESMA CATEGORIA</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {related.map(s => <Poster key={s.id} series={s} onClick={(s) => onSelectSeries(s, "series")} />)}
                </div>
              </div>
            )}
            <div>
              <div className="kicker" style={{ marginBottom: 14 }}>VOCÊ TAMBÉM PODE GOSTAR</div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {more.map(s => <Poster key={s.id} series={s} onClick={(s) => onSelectSeries(s, "series")} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Episode list row
function EpisodeRow({ ep, series, onPlay }) {
  const [hover, setHover] = useStateSE(false);
  const p = window.BFData.POSTERS[series.poster];
  const completed = ep.progress >= 1;
  const inProgress = ep.progress > 0 && ep.progress < 1;
  return (
    <div
      onClick={onPlay}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="episode-row"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr auto",
        gap: 24, alignItems: "center",
        padding: 14,
        background: hover ? "var(--surface-2)" : "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        cursor: "pointer",
        transition: "background 0.2s, transform 0.2s",
        transform: hover ? "translateX(4px)" : "none",
      }}>
      {/* thumb */}
      <div className="ep-thumb" style={{
        position: "relative", width: 260, height: 146,
        borderRadius: 6, overflow: "hidden",
        background: p.gradient,
      }}>
        <div style={{ position: "absolute", inset: 0, background: p.accent, opacity: 0.6 }} />
        <div style={{
          position: "absolute", left: 14, top: 12,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.7)",
        }}>EP {String(ep.n).padStart(2, "0")}</div>
        <div style={{
          position: "absolute", right: -8, bottom: -16,
          fontFamily: "var(--font-display)", fontSize: 120,
          color: "rgba(255,255,255,0.10)", lineHeight: 0.8, fontWeight: 400,
        }}>{ep.n}</div>
        {/* play overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hover ? 1 : 0, transition: "opacity 0.2s",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "var(--accent)", boxShadow: "0 0 24px var(--accent-glow)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}><Icon name="play" size={20} /></div>
        </div>
        {ep.progress > 0 && (
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: 3, background: "rgba(255,255,255,0.2)",
          }}>
            <div style={{ width: `${ep.progress * 100}%`, height: "100%", background: "var(--accent)" }} />
          </div>
        )}
      </div>

      {/* info */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.05em" }}>EPISÓDIO {ep.n}</span>
          {completed && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent)" }}>
            <Icon name="check" size={12} /> Assistido
          </span>}
          {inProgress && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· {fmt.pct(ep.progress)} concluído</span>}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{ep.title}</div>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 640 }}>{ep.synopsis}</p>
      </div>

      {/* duration */}
      <div className="ep-duration" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 80 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)" }}>
          <Icon name="clock" size={13} /> {ep.duration}
        </div>
        <button className="btn-icon" style={{ width: 32, height: 32 }} title="Baixar">
          <Icon name="download" size={14} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Episode player screen
// ─────────────────────────────────────────────────────────────────────────────
function EpisodeScreen({ series, episode, onNavigate, onSelectSeries, onPlayEpisode }) {
  const [playing, setPlaying] = useStateSE(true);
  const [muted,  setMuted]    = useStateSE(false);
  const [t, setT] = useStateSE(0.32); // playhead 0..1
  const [hover, setHover] = useStateSE(false);
  const [showNext, setShowNext] = useStateSE(false);

  const p = window.BFData.POSTERS[series.poster];
  const durSec = parseDuration(episode.duration);
  const cur    = Math.floor(durSec * t);
  const timer  = useRefSE(null);

  // tick the playhead
  useEffectSE(() => {
    if (!playing) return;
    timer.current = setInterval(() => setT(prev => Math.min(1, prev + 0.0035)), 100);
    return () => clearInterval(timer.current);
  }, [playing]);

  // show "next" overlay near end
  useEffectSE(() => {
    setShowNext(t > 0.92);
  }, [t]);

  const idx = series.episodeList.findIndex(e => e.n === episode.n);
  const nextEp = series.episodeList[idx + 1];
  const prevEp = series.episodeList[idx - 1];

  const onSeek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setT(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };

  return (
    <div className="page-enter" style={{ minHeight: "100vh", background: "#000" }}
         onMouseMove={() => { setHover(true); }}
         onMouseLeave={() => setHover(false)}>

      {/* Video stage — cinematic mock */}
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        {/* "video" — animated gradient */}
        <div style={{ position: "absolute", inset: 0, background: p.gradient }} />
        <div style={{ position: "absolute", inset: 0, background: p.accent }} />

        {/* big watermark: episode title */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.10)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 14, letterSpacing: "0.3em", fontWeight: 700, marginBottom: 24 }}>
            EPISÓDIO {String(episode.n).padStart(2, "0")}
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 1,
            color: "rgba(255,255,255,0.16)", letterSpacing: "-0.02em",
            maxWidth: "80vw",
          }}>{episode.title}</div>
        </div>

        <div className="hero-noise" />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.85) 100%)",
        }} />

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "20px var(--gutter)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent)",
          opacity: hover ? 1 : 0, transition: "opacity 0.3s",
          zIndex: 10,
        }}>
          <button onClick={() => onSelectSeries(series, "series")}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: 0, color: "var(--text)", cursor: "pointer", fontSize: 14 }}>
            <Icon name="arrowL" size={20} />
            <span style={{ fontWeight: 500 }}>{series.title}</span>
            <span style={{ color: "var(--text-muted)" }}>· EP {episode.n} {episode.title}</span>
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-icon" style={{ width: 36, height: 36 }} title="Mais informações"><Icon name="info" size={16} /></button>
            <button className="btn-icon" style={{ width: 36, height: 36 }} title="Configurações"><Icon name="settings" size={16} /></button>
          </div>
        </div>

        {/* Center play overlay when paused */}
        {!playing && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)",
          }}>
            <button onClick={() => setPlaying(true)} className="btn-icon"
                    style={{ width: 96, height: 96, background: "rgba(255,255,255,0.15)" }}>
              <Icon name="play" size={36} />
            </button>
          </div>
        )}

        {/* Next-up overlay */}
        {showNext && nextEp && (
          <div style={{
            position: "absolute", right: 32, bottom: 130,
            width: 360, padding: 16, borderRadius: 10,
            background: "rgba(10,10,10,0.85)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.10)",
            display: "flex", gap: 12,
            zIndex: 10,
          }}>
            <div style={{
              width: 96, height: 56, borderRadius: 4, overflow: "hidden", flex: "0 0 auto",
              background: p.gradient, position: "relative",
            }}>
              <div style={{ position: "absolute", right: -4, bottom: -8, fontSize: 60, lineHeight: 0.8,
                            fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.18)" }}>{nextEp.n}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--accent)", fontWeight: 700 }}>A SEGUIR EM 8s</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>EP {nextEp.n} · {nextEp.title}</div>
              <button onClick={() => onPlayEpisode(series, nextEp)} className="btn btn-sm btn-primary" style={{ marginTop: 8, height: 30 }}>
                <Icon name="play" size={12} /> Assistir agora
              </button>
            </div>
          </div>
        )}

        {/* Bottom controls */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 var(--gutter) 24px",
          background: "linear-gradient(0deg, rgba(0,0,0,0.85), transparent)",
          opacity: hover ? 1 : 0, transition: "opacity 0.3s",
          zIndex: 10,
        }}>
          {/* Progress bar */}
          <div onClick={onSeek} style={{
            position: "relative", height: 6, background: "rgba(255,255,255,0.18)",
            borderRadius: 3, cursor: "pointer", marginBottom: 14,
          }}>
            {/* buffered */}
            <div style={{ position: "absolute", inset: 0, width: `${Math.min(1, t + 0.12) * 100}%`,
                          background: "rgba(255,255,255,0.30)", borderRadius: 3 }} />
            {/* played */}
            <div style={{ position: "absolute", inset: 0, width: `${t * 100}%`,
                          background: "var(--accent)", borderRadius: 3,
                          boxShadow: "0 0 12px var(--accent-glow)" }} />
            {/* handle */}
            <div style={{
              position: "absolute", left: `calc(${t * 100}% - 8px)`, top: -5,
              width: 16, height: 16, borderRadius: "50%",
              background: "var(--accent)", boxShadow: "0 0 16px var(--accent-glow)",
            }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="btn-icon" onClick={() => setPlaying(!playing)} style={{ background: "transparent", border: 0, width: 40, height: 40 }}>
              <Icon name={playing ? "pause" : "play"} size={22} />
            </button>
            <button className="btn-icon" onClick={() => setT(Math.max(0, t - 0.05))}
                    style={{ background: "transparent", border: 0, width: 36, height: 36 }} title="-10s">
              <Icon name="skipB" size={18} />
            </button>
            <button className="btn-icon" onClick={() => setT(Math.min(1, t + 0.05))}
                    style={{ background: "transparent", border: 0, width: 36, height: 36 }} title="+10s">
              <Icon name="skip" size={18} />
            </button>
            <button className="btn-icon" onClick={() => setMuted(!muted)}
                    style={{ background: "transparent", border: 0, width: 36, height: 36 }} title="Volume">
              <Icon name="volume" size={18} />
            </button>

            <div style={{ fontSize: 13, color: "var(--text-2)", fontVariantNumeric: "tabular-nums", marginLeft: 4 }}>
              {fmtTime(cur)} <span style={{ color: "var(--text-dim)" }}>/ {episode.duration}</span>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              {prevEp && (
                <button onClick={() => onPlayEpisode(series, prevEp)}
                        className="btn btn-sm btn-ghost" style={{ height: 34 }} title={`EP ${prevEp.n}`}>
                  <Icon name="chevL" size={14} /> Anterior
                </button>
              )}
              {nextEp && (
                <button onClick={() => onPlayEpisode(series, nextEp)}
                        className="btn btn-sm btn-ghost" style={{ height: 34 }} title={`EP ${nextEp.n}`}>
                  Próximo <Icon name="chevR" size={14} />
                </button>
              )}
              <button className="btn-icon" style={{ background: "transparent", border: 0, width: 36, height: 36 }} title="Episódios">
                <Icon name="list" size={18} />
              </button>
              <button className="btn-icon" style={{ background: "transparent", border: 0, width: 36, height: 36 }} title="Tela cheia">
                <Icon name="fs" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Below the fold — episode meta + up next list */}
      <div style={{ padding: "48px var(--gutter) 96px" }} className="player-meta">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 56, alignItems: "start" }} className="grid-2">
          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>{series.title} · EPISÓDIO {episode.n}</div>
            <h1 className="display" style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 56, lineHeight: 1.0, marginBottom: 16,
            }}>{episode.title}</h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-2)", marginBottom: 24 }}>{episode.synopsis}</p>

            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
              <button className="btn btn-outline btn-sm"><Icon name="download" size={14} /> Material de apoio</button>
              <button className="btn btn-outline btn-sm"><Icon name="heart" size={14} /> Favoritar</button>
              <button className="btn btn-outline btn-sm"><Icon name="share" size={14} /> Compartilhar</button>
              <button className="btn btn-outline btn-sm"><Icon name="edit" size={14} /> Anotações</button>
            </div>

            {/* notes block */}
            <div style={{
              padding: 20, background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10,
            }}>
              <div className="kicker" style={{ marginBottom: 10 }}>SUAS ANOTAÇÕES</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { t: "04:12", txt: "Pressão da máquina — menor que o esperado, deixa a transição mais suave." },
                  { t: "12:50", txt: "Pente 1.5 antes do 1 → muda tudo na difusão da sombra." },
                  { t: "21:08", txt: "Voltar aqui depois pra ver o ângulo da navalha em câmera lenta." },
                ].map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.05em" }}>{n.t}</span>
                    <span style={{ flex: 1, fontSize: 13.5, color: "var(--text-2)" }}>{n.txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right rail: up next */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Episódios da temporada</h3>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{series.episodes} episódios</span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {series.episodeList.map(ep => {
                const active = ep.n === episode.n;
                return (
                  <div key={ep.n}
                       onClick={() => onPlayEpisode(series, ep)}
                       style={{
                         display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12,
                         padding: 12, borderRadius: 8, cursor: "pointer",
                         background: active ? "var(--surface-2)" : "transparent",
                         border: "1px solid " + (active ? "var(--border-2)" : "transparent"),
                         transition: "background 0.18s",
                       }}
                       onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface)"; }}
                       onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                    <div style={{
                      width: 32, textAlign: "center",
                      fontFamily: "var(--font-display)", fontSize: 22,
                      color: active ? "var(--accent)" : "var(--text-dim)",
                      lineHeight: 1.1,
                    }}>{ep.n}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: active ? 600 : 500,
                                    color: ep.progress >= 1 ? "var(--text-muted)" : "var(--text)" }}>
                        {ep.title}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
                        {ep.duration}
                        {ep.progress >= 1 && " · Assistido"}
                        {ep.progress > 0 && ep.progress < 1 && ` · ${fmt.pct(ep.progress)}`}
                      </div>
                    </div>
                    <div>
                      {ep.progress >= 1 && <Icon name="check" size={14} style={{ color: "var(--accent)" }} />}
                      {active && !ep.progress && <Icon name="play" size={14} style={{ color: "var(--accent)" }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// helpers
function parseDuration(d) {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + (s || 0);
}
function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

Object.assign(window, { SeriesScreen, EpisodeScreen });
