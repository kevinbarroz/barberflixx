// BarberFlix — Admin Dashboard

const { useState: useStateAdmin } = React;

function AdminScreen({ onNavigate }) {
  const [tab, setTab] = useStateAdmin("overview");
  const { SERIES } = window.BFData;

  return (
    <div className="page-enter admin-shell" style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{
        background: "var(--bg-deep)",
        borderRight: "1px solid var(--border)",
        padding: "24px 18px",
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        <Brand size="md" onClick={() => onNavigate("home")} />
        <div style={{
          marginTop: 6, fontSize: 9, color: "var(--accent)", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>Studio · Admin</div>

        <nav style={{ marginTop: 32, display: "grid", gap: 4, flex: 1 }}>
          {[
            { id: "overview",  icon: "grid",   label: "Visão geral" },
            { id: "series",    icon: "book",   label: "Séries", count: SERIES.length },
            { id: "episodes",  icon: "play",   label: "Episódios", count: 312 },
            { id: "students",  icon: "users",  label: "Alunos", count: "14.2k" },
            { id: "revenue",   icon: "money",  label: "Receita" },
            { id: "marketing", icon: "trendUp",label: "Marketing" },
            { id: "settings",  icon: "settings",label: "Configurações" },
          ].map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", border: 0, borderRadius: 8,
                background: tab === item.id ? "var(--surface-2)" : "transparent",
                color: tab === item.id ? "var(--text)" : "var(--text-muted)",
                fontSize: 13, fontWeight: tab === item.id ? 600 : 500,
                cursor: "pointer", textAlign: "left",
                transition: "background 0.18s",
                borderLeft: tab === item.id ? "2px solid var(--accent)" : "2px solid transparent",
              }}>
              <Icon name={item.icon} size={16} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count && <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.count}</span>}
            </button>
          ))}
        </nav>

        {/* user footer */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>EP</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>Eduardo Prado</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Admin · Sócio</div>
            </div>
            <button className="btn-icon" style={{ width: 28, height: 28 }} title="Sair" onClick={() => onNavigate("login")}>
              <Icon name="logout" size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ padding: "32px 40px 64px", overflow: "auto" }}>
        {tab === "overview" && <AdminOverview />}
        {tab === "series" && <AdminSeries />}
        {tab === "episodes" && <AdminEpisodes />}
        {tab === "students" && <AdminStudents />}
        {tab === "revenue" && <AdminRevenue />}
        {tab === "marketing" && <AdminMarketing />}
        {tab === "settings" && <AdminSettings />}
      </main>
    </div>
  );
}

// ─────────── Overview ───────────
function AdminOverview() {
  return (
    <div>
      <PageHead title="Visão geral" subtitle="Performance dos últimos 30 dias" />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        <KPI label="Receita (30d)" value="R$ 287.420" delta="+18.4%" up />
        <KPI label="Novos assinantes" value="1.284" delta="+12.1%" up />
        <KPI label="Horas assistidas" value="48.2k" delta="+8.7%" up />
        <KPI label="Churn" value="2.8%" delta="-0.4pp" up subtle />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 32 }}>
        <Panel title="Receita por dia" actions={<button className="btn btn-outline btn-sm">Últimos 30 dias <Icon name="chevD" size={12} /></button>}>
          <RevenueChart />
        </Panel>
        <Panel title="Composição de receita">
          <DonutChart />
        </Panel>
      </div>

      {/* Top content + recent activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        <Panel title="Séries com melhor performance" actions={<a style={{ fontSize: 12, color: "var(--text-muted)" }}>Ver todas ›</a>}>
          <TopSeriesTable />
        </Panel>
        <Panel title="Atividade recente">
          <ActivityFeed />
        </Panel>
      </div>
    </div>
  );
}

function PageHead({ title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 36, letterSpacing: "-0.02em" }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{subtitle}</div>}
      </div>
      {actions || (
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm"><Icon name="download" size={14} /> Exportar</button>
          <button className="btn btn-accent btn-sm"><Icon name="plus" size={14} /> Nova série</button>
        </div>
      )}
    </div>
  );
}

function KPI({ label, value, delta, up, subtle }) {
  const color = subtle ? "var(--text-muted)" : up ? "#22c55e" : "var(--accent)";
  return (
    <div style={{ padding: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 12, color, fontWeight: 600 }}>{delta}</span>
      </div>
      <Spark up={up} />
    </div>
  );
}

function Spark({ up }) {
  // little inline sparkline
  const points = up
    ? "0,30 10,28 20,25 30,26 40,20 50,22 60,15 70,12 80,8 90,10 100,4"
    : "0,4 10,8 20,6 30,12 40,10 50,16 60,18 70,22 80,20 90,28 100,26";
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" style={{ width: "100%", height: 28, marginTop: 12 }}>
      <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="1.6" />
    </svg>
  );
}

function Panel({ title, actions, children }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>{title}</div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function RevenueChart() {
  // synthetic month of revenue data
  const data = [12, 18, 14, 22, 19, 26, 24, 28, 21, 30, 33, 28, 35, 32, 38, 42, 40, 37, 44, 48, 46, 52, 50, 49, 55, 58, 56, 62, 65, 70];
  const w = 100, h = 36, max = 70;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 180 }}>
        <defs>
          <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#rev)" />
        <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="0.4" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--text-dim)" }}>
        <span>1 mai</span><span>10 mai</span><span>20 mai</span><span>30 mai</span>
      </div>
    </div>
  );
}

function DonutChart() {
  const segments = [
    { v: 0.62, color: "var(--accent)", label: "VIP Black" },
    { v: 0.24, color: "var(--gold)",   label: "Premium" },
    { v: 0.14, color: "#666",          label: "Standard" },
  ];
  let acc = 0;
  const r = 38, c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg width={120} height={120} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
        {segments.map((s, i) => {
          const dash = s.v * c;
          const offset = -acc * c;
          acc += s.v;
          return (
            <circle key={i} cx={50} cy={50} r={r} stroke={s.color} fill="none"
                    strokeWidth={10} strokeDasharray={`${dash} ${c}`} strokeDashoffset={offset} />
          );
        })}
        <text x="50" y="48" textAnchor="middle" fill="var(--text)" fontFamily="var(--font-display)" fontSize="18" transform="rotate(90 50 50)">R$287k</text>
        <text x="50" y="62" textAnchor="middle" fill="var(--text-muted)" fontSize="6" transform="rotate(90 50 50)" letterSpacing="1">RECEITA · 30D</text>
      </svg>
      <div style={{ display: "grid", gap: 8, flex: 1 }}>
        {segments.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <span style={{ flex: 1, color: "var(--text-2)" }}>{s.label}</span>
            <span style={{ color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{Math.round(s.v * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopSeriesTable() {
  const { SERIES } = window.BFData;
  const top = [...SERIES].sort((a,b) => b.students - a.students).slice(0, 6);
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <th style={{ textAlign: "left", padding: "8px 8px 12px", fontWeight: 500 }}>Série</th>
          <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Alunos</th>
          <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Conclusão</th>
          <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Avaliação</th>
          <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Receita</th>
        </tr>
      </thead>
      <tbody>
        {top.map((s, i) => {
          const p = window.BFData.POSTERS[s.poster];
          const completion = 0.45 + (i % 3) * 0.12;
          return (
            <tr key={s.id} style={{ borderTop: "1px solid var(--border)" }}>
              <td style={{ padding: "12px 8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 50, borderRadius: 4, background: p.gradient, overflow: "hidden", flex: "0 0 auto", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: p.accent }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.category}</div>
                  </div>
                </div>
              </td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt.num(s.students)}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-2)" }}>{Math.round(completion * 100)}%</td>
              <td style={{ textAlign: "right", color: "var(--gold)" }}>★ {s.rating}</td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text)" }}>R$ {fmt.num(Math.round(s.students * 8.7))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ActivityFeed() {
  const items = [
    { who: "Camila Reis",   what: "publicou a série Atendimento e Fidelização", when: "há 2h",  icon: "book",   color: "var(--accent)" },
    { who: "Lucas Ferreira",what: "subiu 3 novos episódios em Corte Social",    when: "há 5h",  icon: "play",   color: "var(--gold)" },
    { who: "Sistema",       what: "1.284 novos alunos esta semana",             when: "há 1d",  icon: "users",  color: "#22c55e" },
    { who: "Rafael Costa",  what: "respondeu 12 comentários em Degradê Perfeito",when: "há 1d", icon: "mail",   color: "var(--accent)" },
    { who: "Bruno Tavares", what: "agendou live aberta para terça às 20h",      when: "há 2d",  icon: "bell",   color: "var(--gold)" },
    { who: "Sistema",       what: "R$ 18.420 em vendas no checkout ontem",      when: "há 2d",  icon: "money",  color: "#22c55e" },
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: `${it.color}22`, color: it.color,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            flex: "0 0 auto",
          }}><Icon name={it.icon} size={13} /></div>
          <div style={{ flex: 1, fontSize: 13 }}>
            <div><span style={{ fontWeight: 600 }}>{it.who}</span> <span style={{ color: "var(--text-muted)" }}>{it.what}</span></div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{it.when}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────── Series CMS ───────────
function AdminSeries() {
  const { SERIES } = window.BFData;
  const [selected, setSelected] = useStateAdmin(null);
  return (
    <div>
      <PageHead title="Séries" subtitle={`${SERIES.length} séries · ${SERIES.reduce((a,s) => a + s.episodes, 0)} episódios no catálogo`} />
      <div style={{
        display: "flex", gap: 12, marginBottom: 20, alignItems: "center",
        padding: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 34, background: "var(--surface-2)", borderRadius: 6, flex: 1, border: "1px solid var(--border-2)" }}>
          <Icon name="search" size={14} style={{ color: "var(--text-muted)" }} />
          <input placeholder="Buscar série, mentor, tag…"
                 style={{ background: "transparent", border: 0, outline: 0, color: "var(--text)", fontSize: 13, flex: 1 }} />
        </div>
        <button className="btn btn-outline btn-sm">Todos os status <Icon name="chevD" size={12} /></button>
        <button className="btn btn-outline btn-sm">Todos os mentores <Icon name="chevD" size={12} /></button>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Série</th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Mentor</th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Status</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Episódios</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Alunos</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Atualizado</th>
              <th style={{ padding: "10px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {SERIES.map((s, i) => {
              const p = window.BFData.POSTERS[s.poster];
              const status = s.new ? "novo" : i % 4 === 0 ? "rascunho" : "publicado";
              return (
                <tr key={s.id} style={{ borderTop: "1px solid var(--border)", transition: "background 0.18s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 44, borderRadius: 4, background: p.gradient, position: "relative", overflow: "hidden", flex: "0 0 auto" }}>
                        <div style={{ position: "absolute", inset: 0, background: p.accent }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.title}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.category}</div>
                      </div>
                      {s.vip && <span className="badge badge-vip" style={{ height: 18, fontSize: 9 }}>VIP</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--text-2)" }}>{s.mentor}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusPill status={status} />
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{s.episodes}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt.num(s.students)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: "var(--text-muted)" }}>{i % 3 === 0 ? "Há 2 dias" : i % 3 === 1 ? "Há 1 semana" : "Há 3 dias"}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button className="btn-icon" style={{ width: 28, height: 28 }} title="Editar"><Icon name="edit" size={13} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    publicado: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Publicado" },
    novo:      { color: "var(--accent)", bg: "var(--accent-soft)", label: "Recém-lançado" },
    rascunho:  { color: "var(--text-muted)", bg: "var(--surface-3)", label: "Rascunho" },
  };
  const s = map[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 999,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
      {s.label}
    </span>
  );
}

// ─────────── Episodes ───────────
function AdminEpisodes() {
  const { SERIES } = window.BFData;
  const all = SERIES.flatMap(s => s.episodeList.map(e => ({ ...e, series: s.title, mentor: s.mentor, poster: s.poster }))).slice(0, 14);
  return (
    <div>
      <PageHead title="Episódios" subtitle="Biblioteca completa de aulas · publique, edite, agende" />
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Episódio</th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Série</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Duração</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Visualizações</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Conclusão</th>
              <th style={{ padding: "10px 16px", fontWeight: 500 }}>Disponível</th>
            </tr>
          </thead>
          <tbody>
            {all.map((ep, i) => {
              const p = window.BFData.POSTERS[ep.poster];
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 44, height: 26, borderRadius: 3, background: p.gradient, position: "relative", overflow: "hidden", flex: "0 0 auto" }}>
                        <div style={{ position: "absolute", inset: 0, background: p.accent }} />
                      </div>
                      <span style={{ color: "var(--text-dim)", fontSize: 11 }}>EP {String(ep.n).padStart(2,"0")}</span>
                      <span style={{ fontWeight: 600 }}>{ep.title}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px", color: "var(--text-muted)" }}>{ep.series}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{ep.duration}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt.num(1200 + i * 380)}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right" }}>
                    <ProgressMini value={0.4 + (i % 5) * 0.12} />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span className="switch on" />
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Público</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgressMini({ value }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
      <div style={{ width: 80, height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${value * 100}%`, height: "100%", background: value > 0.6 ? "#22c55e" : "var(--accent)" }} />
      </div>
      <span style={{ fontSize: 11, color: "var(--text-muted)", minWidth: 32, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{Math.round(value * 100)}%</span>
    </div>
  );
}

function AdminStudents() {
  const students = [
    { name: "Carlos Andrade",    email: "carlos@gmail.com",         plan: "VIP Black",   joined: "Mar 2024", hours: 47.5, status: "ativo" },
    { name: "Mariana Castro",    email: "mari.castro@hotmail.com",  plan: "VIP Black",   joined: "Jan 2024", hours: 86.2, status: "ativo" },
    { name: "João Pedro Silva",  email: "joaoprosilva@gmail.com",   plan: "Premium",     joined: "Mai 2024", hours: 22.0, status: "ativo" },
    { name: "Ricardo Tavares",   email: "ricardo.tav@yahoo.com",    plan: "Standard",    joined: "Out 2023", hours: 12.4, status: "inativo" },
    { name: "Felipe Moura",      email: "fmoura@outlook.com",       plan: "VIP Black",   joined: "Fev 2024", hours: 64.8, status: "ativo" },
    { name: "Diego Santos",      email: "diego.santos@gmail.com",   plan: "Premium",     joined: "Abr 2024", hours: 38.1, status: "ativo" },
    { name: "Renato Lima",       email: "renato.lima.barbe@me.com", plan: "Standard",    joined: "Dez 2023", hours: 18.7, status: "inativo" },
    { name: "Thiago Almeida",    email: "thiagoalm@gmail.com",      plan: "VIP Black",   joined: "Jul 2024", hours: 31.0, status: "ativo" },
  ];
  return (
    <div>
      <PageHead title="Alunos" subtitle="14.284 inscritos · 9.840 ativos no último mês"
        actions={<button className="btn btn-outline btn-sm"><Icon name="download" size={14} /> Exportar CSV</button>} />
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Aluno</th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Plano</th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontWeight: 500 }}>Status</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Membro desde</th>
              <th style={{ textAlign: "right", padding: "10px 16px", fontWeight: 500 }}>Horas</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="avatar" style={{ width: 30, height: 30, fontSize: 10 }}>
                      {s.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  {s.plan === "VIP Black"
                    ? <span className="badge badge-vip" style={{ height: 20, fontSize: 9 }}>VIP</span>
                    : <span className="badge badge-ghost" style={{ height: 20, fontSize: 9 }}>{s.plan}</span>}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: s.status === "ativo" ? "#22c55e" : "var(--text-dim)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.status === "ativo" ? "#22c55e" : "var(--text-dim)" }} />
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: "10px 16px", textAlign: "right", color: "var(--text-muted)" }}>{s.joined}</td>
                <td style={{ padding: "10px 16px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{s.hours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminRevenue() {
  return (
    <div>
      <PageHead title="Receita" subtitle="MRR, churn, cohorts e previsão" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPI label="MRR" value="R$ 248.140" delta="+11.2%" up />
        <KPI label="ARR projetado" value="R$ 2.98M" delta="+18.4%" up />
        <KPI label="LTV médio" value="R$ 612" delta="+R$ 28" up />
      </div>
      <Panel title="Crescimento mensal">
        <RevenueChart />
      </Panel>
    </div>
  );
}

function AdminMarketing() {
  return (
    <div>
      <PageHead title="Marketing" subtitle="Campanhas, criativos e conversão" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPI label="ROAS médio" value="3.8x" delta="+0.4x" up />
        <KPI label="CAC" value="R$ 84" delta="-R$ 6" up />
        <KPI label="CTR Instagram" value="2.84%" delta="+0.5pp" up />
        <KPI label="Conversão checkout" value="6.2%" delta="+1.1pp" up />
      </div>
      <Panel title="Campanhas ativas">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ textAlign: "left", padding: "8px 8px 12px", fontWeight: 500 }}>Campanha</th>
              <th style={{ textAlign: "left", padding: "8px 8px 12px", fontWeight: 500 }}>Canal</th>
              <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Investido</th>
              <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>Conversões</th>
              <th style={{ textAlign: "right", padding: "8px 8px 12px", fontWeight: 500 }}>ROAS</th>
              <th style={{ textAlign: "left", padding: "8px 8px 12px", fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Lançamento Pigmentação",  "Instagram",  "R$ 18.420", 142, "4.2x", "ativa"],
              ["VIP Black Anual",         "YouTube",    "R$ 12.800", 88, "3.1x", "ativa"],
              ["Black Friday Barbeiros",  "Meta Ads",   "R$ 22.150", 184, "5.4x", "ativa"],
              ["Degradê Perfeito",        "TikTok",     "R$ 6.420",  62, "2.8x", "teste"],
              ["Frete grátis kit",        "Google",     "R$ 4.100",  38, "1.9x", "pausada"],
            ].map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 8px", fontWeight: 600 }}>{row[0]}</td>
                <td style={{ padding: "10px 8px", color: "var(--text-muted)" }}>{row[1]}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{row[2]}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{row[3]}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: parseFloat(row[4]) >= 3 ? "#22c55e" : "var(--accent)" }}>{row[4]}</td>
                <td style={{ padding: "10px 8px" }}><StatusPill status={row[5] === "ativa" ? "publicado" : row[5] === "teste" ? "novo" : "rascunho"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <PageHead title="Configurações" subtitle="Marca, planos, equipe e integrações" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 900 }}>
        {[
          { title: "Identidade da marca",  desc: "Logo, cores de acento, fontes",                   icon: "sparkle" },
          { title: "Planos e preços",      desc: "Configurar VIP, Premium, Standard",               icon: "money" },
          { title: "Mentores",             desc: "Convidar, gerenciar permissões e royalties",     icon: "users" },
          { title: "Integrações",          desc: "Stripe · Pagar.me · Vimeo · Bunny · Hubspot",     icon: "settings" },
          { title: "Notificações",         desc: "E-mail, push, WhatsApp e SMS",                    icon: "bell" },
          { title: "Política de conteúdo", desc: "Diretrizes editoriais e moderação",               icon: "book" },
        ].map(c => (
          <div key={c.title} style={{ padding: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--surface-3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
              <Icon name={c.icon} size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{c.desc}</div>
            </div>
            <Icon name="chevR" size={14} style={{ color: "var(--text-dim)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { AdminScreen });
