// BarberFlix — Profile / Área do Aluno screen

const { useState: useStateProfile } = React;

function ProfileScreen({ onNavigate, onSelectSeries }) {
  const { USER, SERIES, CONTINUE_WATCHING } = window.BFData;
  const [tab, setTab] = useStateProfile("overview");

  const completed   = SERIES.filter(s => s.progress >= 1);
  const inProgress  = SERIES.filter(s => s.progress > 0 && s.progress < 1);
  const certs = inProgress.slice(0,1).concat(completed); // proxy: completed + currently on degrade

  return (
    <div className="page-enter">
      <TopNav current="profile" onNavigate={onNavigate} />

      {/* header */}
      <div style={{
        position: "relative",
        padding: "112px var(--gutter) 40px",
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(180deg, rgba(255,31,58,0.06) 0%, transparent 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.4,
          background: "radial-gradient(ellipse at 20% 50%, rgba(255,31,58,0.18) 0%, transparent 50%)",
        }} />

        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 24 }} className="profile-head">
          {/* big avatar */}
          <div style={{
            width: 112, height: 112, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), #4a0010)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, fontWeight: 700, color: "#fff",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 0 4px rgba(255,31,58,0.20), 0 12px 40px rgba(0,0,0,0.4)",
          }}>{USER.initials}</div>

          <div style={{ flex: 1 }}>
            <div className="kicker">MEU ESTÚDIO · MEMBRO DESDE {USER.memberSince.toUpperCase()}</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em",
              marginTop: 6, marginBottom: 8,
            }}>{USER.name}</h1>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span className="badge badge-vip"><Icon name="crown" size={11} /> {USER.plan}</span>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{USER.email}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }} className="profile-actions">
            <button className="btn btn-outline btn-sm"><Icon name="edit" size={14} /> Editar perfil</button>
            <button className="btn btn-outline btn-sm"><Icon name="settings" size={14} /> Preferências</button>
          </div>
        </div>

        {/* metric strip */}
        <div style={{
          position: "relative",
          marginTop: 36, display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", gap: 16,
        }} className="profile-metrics">
          <Metric label="Sequência atual" value={USER.streak} unit="dias" icon="fire" accent />
          <Metric label="Horas de estudo" value={USER.hoursWatched} unit="h" icon="clock" />
          <Metric label="Cursos concluídos" value={USER.coursesCompleted} icon="check" />
          <Metric label="Em andamento" value={USER.coursesInProgress} icon="play" />
          <Metric label="Certificados" value={USER.certificates} icon="award" gold />
        </div>
      </div>

      {/* tabs */}
      <div style={{
        display: "flex", gap: 32, padding: "0 var(--gutter)",
        borderBottom: "1px solid var(--border)", marginBottom: 40,
        overflowX: "auto", whiteSpace: "nowrap",
      }} className="series-tabs">
        {[
          { id: "overview", label: "Visão geral" },
          { id: "courses",  label: "Meus cursos" },
          { id: "favorites",label: "Favoritos" },
          { id: "certs",    label: "Certificados" },
          { id: "plan",     label: "Plano e pagamento" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              background: "transparent", border: 0, cursor: "pointer",
              color: tab === t.id ? "var(--text)" : "var(--text-muted)",
              fontSize: 14, fontWeight: tab === t.id ? 600 : 500,
              padding: "16px 0", borderBottom: tab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
            }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "0 var(--gutter) 96px" }}>
        {tab === "overview" && <OverviewTab onSelectSeries={onSelectSeries} />}
        {tab === "courses"  && <CoursesTab  onSelectSeries={onSelectSeries} />}
        {tab === "favorites"&& <FavoritesTab onSelectSeries={onSelectSeries} />}
        {tab === "certs"    && <CertsTab certs={certs} />}
        {tab === "plan"     && <PlanTab />}
      </div>
    </div>
  );
}

function Metric({ label, value, unit, icon, accent, gold }) {
  return (
    <div style={{
      padding: "20px 22px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -10, top: -10,
        color: accent ? "var(--accent-soft)" : gold ? "var(--gold-soft)" : "rgba(255,255,255,0.04)",
      }}>
        <Icon name={icon} size={64} />
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1,
                         color: accent ? "var(--accent)" : gold ? "var(--gold)" : "var(--text)" }}>
            {value}
          </span>
          {unit && <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ onSelectSeries }) {
  const { USER, CONTINUE_WATCHING, SERIES } = window.BFData;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40 }} className="overview-grid">
      {/* Left column */}
      <div style={{ display: "grid", gap: 32 }}>
        {/* level/XP card */}
        <div style={{
          padding: 28, borderRadius: 14,
          background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)",
          border: "1px solid var(--border-2)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -40, top: -40, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle, var(--accent-soft), transparent 70%)",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="kicker">SEU NÍVEL</div>
                <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1 }}>{USER.level}</span>
                  <span style={{ fontSize: 16, color: "var(--text-muted)" }}>de 12</span>
                </div>
                <div style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>Barbeiro Mestre · faltam 720 XP para Sênior</div>
              </div>
              <Ring value={USER.xp / USER.xpNextLevel} size={88} stroke={6} label={`${fmt.num(USER.xp)} XP`} />
            </div>
            <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 3, overflow: "hidden", marginTop: 18 }}>
              <div style={{ width: `${USER.xp / USER.xpNextLevel * 100}%`, height: "100%",
                            background: "linear-gradient(90deg, var(--accent), var(--gold))",
                            boxShadow: "0 0 12px var(--accent-glow)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
              <span>Nível 7 · 4.280 XP</span>
              <span>Nível 8 · 5.000 XP</span>
            </div>
          </div>
        </div>

        {/* Continue watching */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Retomar onde parou</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {CONTINUE_WATCHING.slice(0,3).map(s => (
              <ContinueRow key={s.id} series={s} onClick={() => onSelectSeries(s, "series")} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Conquistas recentes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { name: "Primeiro Corte",      icon: "sparkle",  color: "var(--accent)", desc: "Concluiu sua 1ª aula" },
              { name: "Maratonista",         icon: "fire",     color: "#ff6b35", desc: "5 aulas em 1 dia" },
              { name: "Cliente Fiel",        icon: "heart",    color: "#ff4d6d", desc: "30 dias de assinatura" },
              { name: "Mestre da Máquina",   icon: "award",    color: "var(--gold)", desc: "Curso Máquinas 100%" },
            ].map(a => (
              <div key={a.name} style={{
                padding: 16, borderRadius: 10,
                background: "var(--surface)", border: "1px solid var(--border)",
                textAlign: "center",
              }}>
                <div style={{
                  width: 48, height: 48, margin: "0 auto 10px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${a.color}33, ${a.color}11)`,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: a.color,
                }}><Icon name={a.icon} size={22} /></div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: "grid", gap: 24 }}>
        {/* This week activity */}
        <div style={{ padding: 24, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Esta semana</h3>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>4h 12min · +18% vs. anterior</span>
          </div>
          <ActivityChart />
        </div>

        {/* Streak calendar */}
        <div style={{ padding: 24, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Consistência · últimos 30 dias</h3>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}><Icon name="fire" size={12} /> 18 dias seguidos</span>
          </div>
          <StreakGrid />
        </div>

        {/* Recommended */}
        <div style={{ padding: 24, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recomendado para você</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {SERIES.slice(5,7).map(s => {
              const p = window.BFData.POSTERS[s.poster];
              return (
                <div key={s.id} onClick={() => onSelectSeries(s, "series")}
                     style={{ display: "flex", gap: 12, cursor: "pointer", padding: 8, borderRadius: 8 }}
                     onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ width: 60, height: 90, borderRadius: 4, background: p.gradient, flex: "0 0 auto", overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: p.accent }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.category} · {s.episodes} ep</div>
                    <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 4 }}>★ {s.rating}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContinueRow({ series, onClick }) {
  const p = window.BFData.POSTERS[series.poster];
  const nextEp = series.episodeList.find(e => e.progress < 1);
  return (
    <div onClick={onClick} style={{
      display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 16,
      padding: 12, borderRadius: 10, background: "var(--surface)",
      border: "1px solid var(--border)", cursor: "pointer", alignItems: "center",
      transition: "background 0.18s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
    onMouseLeave={e => e.currentTarget.style.background = "var(--surface)"}>
      <div style={{ width: 120, height: 68, borderRadius: 6, overflow: "hidden", background: p.gradient, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: p.accent }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.2)" }}>
          <div style={{ width: `${series.progress * 100}%`, height: "100%", background: "var(--accent)" }} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{series.category}</div>
        <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{series.title}</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
          {nextEp ? `Próximo: EP ${nextEp.n} · ${nextEp.title}` : "Concluído"} · {fmt.pct(series.progress)} feito
        </div>
      </div>
      <button className="btn btn-sm btn-accent">
        <Icon name="play" size={12} /> Retomar
      </button>
    </div>
  );
}

function ActivityChart() {
  const days = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
  const vals = [0.45, 0.82, 0.30, 0.95, 0.60, 0.20, 0.10];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, height: 140 }}>
      {days.map((d, i) => (
        <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{
              width: "100%", height: `${vals[i] * 100}%`,
              background: i === 3
                ? "linear-gradient(180deg, var(--accent), #b3001a)"
                : "var(--surface-3)",
              borderRadius: 4,
              boxShadow: i === 3 ? "0 0 16px var(--accent-glow)" : "none",
              transition: "height 0.4s var(--ease-out)",
            }} />
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{d}</div>
        </div>
      ))}
    </div>
  );
}

function StreakGrid() {
  // 5 rows x 6 cols (30 days). Mostly active in the most recent.
  const cells = Array.from({ length: 30 }, (_, i) => {
    // older = lower probability
    const recent = i >= 12;
    if (recent) return Math.random() > 0.15 ? 2 : 1;
    return Math.random() > 0.5 ? 1 : 0;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
      {cells.map((v, i) => (
        <div key={i} style={{
          aspectRatio: "1", borderRadius: 3,
          background: v === 2 ? "var(--accent)" : v === 1 ? "var(--surface-4)" : "var(--surface-2)",
          boxShadow: v === 2 ? "0 0 6px var(--accent-glow)" : "none",
          opacity: v === 2 ? (0.5 + (i / 30) * 0.5) : 1,
        }} />
      ))}
    </div>
  );
}

function CoursesTab({ onSelectSeries }) {
  const { SERIES } = window.BFData;
  const [filter, setFilter] = useStateProfile("all");
  const items = filter === "progress" ? SERIES.filter(s => s.progress > 0 && s.progress < 1)
              : filter === "completed" ? SERIES.filter(s => s.progress >= 1)
              : filter === "notstarted" ? SERIES.filter(s => s.progress === 0)
              : SERIES;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { id: "all", label: "Todos · " + SERIES.length },
          { id: "progress", label: "Em andamento" },
          { id: "completed", label: "Concluídos" },
          { id: "notstarted", label: "Não iniciados" },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={"btn btn-sm " + (filter === f.id ? "btn-primary" : "btn-outline")}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }} className="courses-grid">
        {items.map(s => (
          <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Poster series={s} onClick={(s) => onSelectSeries(s, "series")} showProgress />
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {s.progress >= 1 ? "Concluído" : s.progress > 0 ? `${fmt.pct(s.progress)} feito` : "Não iniciado"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesTab({ onSelectSeries }) {
  const { SERIES } = window.BFData;
  const favs = [SERIES[0], SERIES[2], SERIES[7]];
  return (
    <div>
      <div style={{ marginBottom: 24, padding: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
        <Icon name="heartF" size={18} style={{ color: "var(--accent)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Sua lista favorita</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>3 séries salvas para assistir mais tarde</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }} className="courses-grid">
        {favs.map(s => <Poster key={s.id} series={s} onClick={(s) => onSelectSeries(s, "series")} />)}
      </div>
    </div>
  );
}

function CertsTab({ certs }) {
  const { USER, POSTERS } = window.BFData;
  const completed = window.BFData.SERIES.filter(s => s.progress >= 1);
  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-display)", fontWeight: 400 }}>Seus certificados</h2>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Emitidos pela BarberFlix · validados com QR e código único</div>
        </div>
        <button className="btn btn-outline btn-sm"><Icon name="download" size={14} /> Baixar todos</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 20 }} className="certs-grid">
        {completed.map(s => (
          <Certificate key={s.id} series={s} userName={USER.name} />
        ))}
        {completed.length === 0 && (
          <div style={{ gridColumn: "1/-1", padding: 60, textAlign: "center", background: "var(--surface)", border: "1px dashed var(--border-2)", borderRadius: 12 }}>
            <Icon name="award" size={40} style={{ color: "var(--text-dim)", marginBottom: 12 }} />
            <div style={{ fontWeight: 600 }}>Você ainda não possui certificados</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Conclua uma série para receber seu certificado oficial</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Certificate({ series, userName }) {
  const p = window.BFData.POSTERS[series.poster];
  return (
    <div style={{
      position: "relative",
      aspectRatio: "1.55 / 1",
      borderRadius: 14, padding: 28,
      background: "linear-gradient(135deg, #0a0a0a 0%, #161616 100%)",
      border: "1px solid var(--border-2)",
      overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      {/* gold border accent */}
      <div style={{
        position: "absolute", inset: 8, borderRadius: 10,
        border: "1px solid var(--gold)", opacity: 0.4, pointerEvents: "none",
      }} />
      {/* watermark */}
      <div style={{
        position: "absolute", right: -20, bottom: -40,
        fontFamily: "var(--font-display)", fontSize: 220, fontWeight: 400,
        color: "rgba(212,175,55,0.06)", lineHeight: 0.8,
      }}>{p.glyph}</div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.3em", color: "var(--gold)" }}>BARBERFLIX</div>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "var(--text-dim)", marginTop: 2 }}>CERTIFICADO DE CONCLUSÃO</div>
        </div>
        <Icon name="award" size={28} style={{ color: "var(--gold)" }} />
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.05em" }}>Certificamos que</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, marginTop: 4, marginBottom: 12 }}>{userName}</div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.05em" }}>concluiu o curso</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: 4, color: "var(--gold)" }}>{series.title}</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
          {series.duration} · {series.episodes} aulas · com {series.mentor}
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 10, color: "var(--text-dim)" }}>
        <div>
          <div>Código de verificação</div>
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-2)", marginTop: 2 }}>BFX-{series.id.slice(0,4).toUpperCase()}-7F2A</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--text-2)" }}>{series.mentor}</div>
          <div style={{ borderTop: "1px solid var(--border-3)", paddingTop: 4, marginTop: 4 }}>MASTER BARBER · ASSINATURA</div>
        </div>
      </div>
    </div>
  );
}

function PlanTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1000 }} className="plan-grid">
      {/* current plan */}
      <div style={{
        padding: 28, borderRadius: 14,
        background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        border: "1px solid var(--gold)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.18) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative" }}>
          <span className="badge badge-vip"><Icon name="crown" size={11} /> SEU PLANO</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 36, marginTop: 14 }}>VIP Black</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4, marginBottom: 24 }}>
            Acesso total · sem anúncios · download offline · conteúdo exclusivo de master barbers
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, color: "var(--gold)" }}>R$ 89,90</span>
            <span style={{ color: "var(--text-muted)" }}>/ mês</span>
          </div>

          <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
            {[
              "Todas as 48 séries do catálogo",
              "Acesso a 12 séries VIP exclusivas",
              "Certificados oficiais para CV",
              "Aulas ao vivo mensais com masters",
              "Download offline ilimitado",
              "Acesso prioritário a novos lançamentos",
            ].map(f => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5 }}>
                <Icon name="check" size={14} style={{ color: "var(--gold)" }} /> {f}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline btn-sm">Gerenciar plano</button>
            <button className="btn btn-outline btn-sm">Cancelar</button>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border-2)", fontSize: 12, color: "var(--text-muted)" }}>
            Próxima cobrança: <span style={{ color: "var(--text-2)" }}>14 jun · R$ 89,90</span><br/>
            Cartão final 4242 · Mastercard
          </div>
        </div>
      </div>

      {/* upgrade options */}
      <div style={{ display: "grid", gap: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Economize com plano anual</h3>
        <div style={{ padding: 22, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--accent)", position: "relative" }}>
          <span style={{ position: "absolute", top: -10, right: 16 }} className="badge badge-new">Economize 30%</span>
          <div style={{ fontWeight: 600, fontSize: 16 }}>VIP Black Anual</div>
          <div style={{ marginTop: 6, color: "var(--text-muted)", fontSize: 13 }}>12 meses · R$ 749 à vista</div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-2)" }}>Equivale a R$ 62,42/mês · economiza R$ 329</div>
          <button className="btn btn-accent" style={{ marginTop: 14 }}>Fazer upgrade</button>
        </div>

        <div style={{ padding: 22, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Plano Empresa</div>
          <div style={{ marginTop: 6, color: "var(--text-muted)", fontSize: 13 }}>Acesso para até 10 barbeiros da sua equipe</div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-2)" }}>Painel de gestão · relatórios de progresso</div>
          <button className="btn btn-outline btn-sm" style={{ marginTop: 14 }}>Falar com vendas</button>
        </div>

        <div style={{ padding: 22, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Histórico de pagamentos</div>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {[
              { m: "Maio 2026", v: "R$ 89,90" },
              { m: "Abril 2026", v: "R$ 89,90" },
              { m: "Março 2026", v: "R$ 89,90" },
            ].map(p => (
              <div key={p.m} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
                <span>{p.m}</span>
                <span style={{ color: "var(--text-2)" }}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
