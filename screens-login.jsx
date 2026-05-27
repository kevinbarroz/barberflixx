// BarberFlix — Login / Signup screen

const { useState: useStateLogin } = React;

function LoginScreen({ onNavigate }) {
  const [mode, setMode] = useStateLogin("login"); // "login" | "signup"
  const { POSTERS } = window.BFData;

  return (
    <div className="page-enter" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Cinematic background: layered posters */}
      <BackgroundCollage />

      {/* Overlay scrim */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.65) 100%)",
        zIndex: 1,
      }} />
      <div className="hero-noise" />

      {/* Top brand bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px var(--gutter)",
      }}>
        <Brand size="md" onClick={() => onNavigate("home")} />
        <button onClick={() => onNavigate("home")} className="btn btn-sm btn-ghost">
          Voltar ao site
        </button>
      </div>

      {/* Two-column layout */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "grid", gridTemplateColumns: "1.05fr 1fr",
        minHeight: "100vh",
        padding: "120px var(--gutter) 64px",
        gap: 64, alignItems: "center",
      }} className="login-grid">
        {/* Left — editorial pitch */}
        <div>
          <div className="kicker" style={{ marginBottom: 18 }}>BARBERFLIX · 2025</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(48px, 6vw, 88px)", lineHeight: 0.96,
            letterSpacing: "-0.02em", marginBottom: 24,
          }}>
            A escola que <em style={{ color: "var(--accent)", textShadow: "0 0 24px var(--accent-glow)", fontStyle: "italic" }}>transforma</em><br/>
            barbeiros em <em style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontStyle: "italic" }}>autoridades</em>.
          </h1>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: "var(--text-2)",
            maxWidth: 560, marginBottom: 32,
          }}>
            Conteúdo cinematográfico produzido por master barbers — Rafael Costa, Lucas Ferreira, Eduardo Prado. Técnica avançada, gestão e marketing reunidos em um único lugar.
          </p>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Stat n="48" sub="séries" />
            <Stat n="312" sub="episódios" />
            <Stat n="14k+" sub="alunos" />
            <Stat n="4.9★" sub="avaliação" color="var(--gold)" />
          </div>

          {/* trust badges */}
          <div style={{ marginTop: 56, display: "flex", gap: 28, opacity: 0.5, alignItems: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--text-dim)" }}>PARCEIROS:</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.05em" }}>WAHL</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.05em" }}>Andis</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.05em" }}>Babyliss</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.05em" }}>QOD</span>
          </div>
        </div>

        {/* Right — auth card */}
        <div style={{
          width: "100%", maxWidth: 440, justifySelf: "end",
          padding: "40px 36px",
          background: "rgba(15,15,15,0.78)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 14,
          backdropFilter: "blur(28px) saturate(160%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }} className="login-card">
          {/* tabs */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            background: "var(--surface-2)", borderRadius: 10, padding: 4, marginBottom: 28,
          }}>
            {[
              { id: "login", label: "Entrar" },
              { id: "signup", label: "Criar conta" },
            ].map(t => (
              <button key={t.id} onClick={() => setMode(t.id)}
                style={{
                  background: mode === t.id ? "var(--surface-4)" : "transparent",
                  color: mode === t.id ? "var(--text)" : "var(--text-muted)",
                  border: 0, padding: "9px 0", borderRadius: 7, fontSize: 13,
                  fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                }}>{t.label}</button>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
            {mode === "login" ? "Bem-vindo de volta" : "Comece em 2 minutos"}
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
            {mode === "login" ? "Continue sua evolução técnica e profissional." : "Acesso imediato a 7 dias grátis. Sem cartão."}
          </p>

          {mode === "signup" && (
            <Field icon="user" label="Nome completo" placeholder="Como gostaria de ser chamado" />
          )}
          <Field icon="mail" label="E-mail" placeholder="seu@email.com" type="email" />
          <Field icon="lock" label="Senha" placeholder={mode === "login" ? "••••••••" : "Mínimo 8 caracteres"} type="password" />

          {mode === "login" && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: -4, marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }} />
                Lembrar-me
              </label>
              <a style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer" }}>Esqueci a senha</a>
            </div>
          )}

          <button className="btn btn-accent" onClick={() => onNavigate("home")}
                  style={{ width: "100%", height: 48, marginTop: 8 }}>
            {mode === "login" ? "Entrar" : "Criar minha conta"}
            <Icon name="arrowR" size={18} />
          </button>

          {mode === "signup" && (
            <p style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
              Ao criar conta você aceita os <a style={{ color: "var(--text-muted)", textDecoration: "underline" }}>termos</a> e a <a style={{ color: "var(--text-muted)", textDecoration: "underline" }}>política de privacidade</a>.
            </p>
          )}

          {/* divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            margin: "24px 0", color: "var(--text-dim)", fontSize: 11,
          }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-2)" }} />
            ou continue com
            <div style={{ flex: 1, height: 1, background: "var(--border-2)" }} />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <SocialBtn icon="google" label="Continuar com Google" />
            <SocialBtn icon="apple"  label="Continuar com Apple" />
          </div>

          {mode === "login" && (
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 22 }}>
              Não tem conta?{" "}
              <a onClick={() => setMode("signup")} style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>Criar agora →</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, placeholder, type = "text" }) {
  const [focus, setFocus] = useStateLogin(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
        {label}
      </label>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "0 14px", height: 44,
        background: "var(--surface-2)",
        border: `1px solid ${focus ? "var(--accent)" : "var(--border-2)"}`,
        borderRadius: 8,
        boxShadow: focus ? "0 0 0 3px rgba(255,31,58,0.18)" : "none",
        transition: "all 0.18s",
      }}>
        <Icon name={icon} size={16} style={{ color: focus ? "var(--accent)" : "var(--text-dim)" }} />
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, background: "transparent", border: 0, outline: "none",
            color: "var(--text)", fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button style={{
      display: "flex", alignItems: "center", gap: 10,
      width: "100%", height: 42, padding: "0 14px",
      background: "var(--surface-2)", border: "1px solid var(--border-2)",
      borderRadius: 8, color: "var(--text)", fontSize: 13, fontWeight: 500,
      cursor: "pointer", transition: "background 0.18s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--surface-3)"}
    onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2)"}>
      <Icon name={icon} size={16} />
      <span>{label}</span>
    </button>
  );
}

function Stat({ n, sub, color }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1,
        color: color || "var(--text)",
      }}>{n}</div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{sub}</div>
    </div>
  );
}

// Cinematic collage of posters as background
function BackgroundCollage() {
  const { POSTERS, SERIES } = window.BFData;
  // Tilted grid of posters
  return (
    <div style={{
      position: "absolute", inset: 0,
      transform: "rotate(-8deg) scale(1.4) translateX(15%)",
      transformOrigin: "right center",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 18,
      padding: 60,
      opacity: 0.55,
    }} className="login-collage">
      {[...SERIES, ...SERIES.slice(0, 4)].map((s, i) => {
        const p = POSTERS[s.poster];
        return (
          <div key={i} style={{
            width: 220, height: 330, borderRadius: 8,
            background: p.gradient, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: p.accent }} />
            <div style={{
              position: "absolute", right: -10, bottom: -16,
              fontFamily: "var(--font-display)", fontSize: 140, lineHeight: 0.8,
              color: "rgba(255,255,255,0.10)", letterSpacing: "-0.04em",
            }}>{p.glyph}</div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { LoginScreen });
