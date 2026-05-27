// BarberFlix — App root: router + tweaks panel

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "regular",
  "thumb": "poster",
  "theme": "dark",
  "type": "sans"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // route state — kept in URL hash for shareable links
  const parseHash = () => {
    const h = location.hash.replace(/^#/, "") || "home";
    const [route, id, sub] = h.split("/");
    return { route, id, sub };
  };
  const [route, setRoute] = useStateApp(parseHash());

  useEffectApp(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (r) => { location.hash = r; window.scrollTo(0, 0); };
  const selectSeries = (s, kind = "series") => { location.hash = `${kind}/${s.id}`; window.scrollTo(0, 0); };
  const playEpisode = (s, ep) => { location.hash = `play/${s.id}/${ep.n}`; window.scrollTo(0, 0); };

  // page resolution
  let page;
  if (route.route === "home" || !route.route) {
    page = <HomeScreen onNavigate={navigate} onSelectSeries={selectSeries} />;
  } else if (route.route === "series" && route.id) {
    const series = window.BFData.SERIES.find(s => s.id === route.id);
    if (series) {
      page = <SeriesScreen series={series} onNavigate={navigate} onSelectSeries={selectSeries} onPlayEpisode={playEpisode} />;
    } else { navigate("home"); }
  } else if (route.route === "play" && route.id) {
    const series = window.BFData.SERIES.find(s => s.id === route.id);
    if (series) {
      const ep = series.episodeList.find(e => e.n === Number(route.sub)) || series.episodeList[0];
      page = <EpisodeScreen series={series} episode={ep} onNavigate={navigate} onSelectSeries={selectSeries} onPlayEpisode={playEpisode} />;
    } else { navigate("home"); }
  } else if (route.route === "login") {
    page = <LoginScreen onNavigate={navigate} />;
  } else if (route.route === "profile") {
    page = <ProfileScreen onNavigate={navigate} onSelectSeries={selectSeries} />;
  } else if (route.route === "admin") {
    page = <AdminScreen onNavigate={navigate} />;
  } else {
    page = <HomeScreen onNavigate={navigate} onSelectSeries={selectSeries} />;
  }

  // Apply tweaks via root className
  const rootClass = [
    `density-${t.density}`,
    `thumb-${t.thumb}`,
    t.theme === "ultra" ? "theme-ultra" : "",
    t.type === "serif" ? "type-serif" : "",
  ].filter(Boolean).join(" ");

  return (
    <div key={route.route + (route.id || "")} className={rootClass}>
      {page}

      {/* Screen-switcher dock (always visible — this is a prototype) */}
      <ScreenDock current={route.route || "home"} navigate={navigate} />

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks · BarberFlix">
        <TweakSection label="Layout" />
        <TweakRadio  label="Densidade carrosséis" value={t.density}
                     options={[{ value: "compact", label: "Compacto" },
                               { value: "regular", label: "Padrão" },
                               { value: "cinematic", label: "Cinema" }]}
                     onChange={v => setTweak("density", v)} />
        <TweakRadio  label="Formato thumbnail" value={t.thumb}
                     options={[{ value: "poster", label: "Pôster" },
                               { value: "landscape", label: "Landscape" },
                               { value: "square", label: "Quadrado" }]}
                     onChange={v => setTweak("thumb", v)} />

        <TweakSection label="Aparência" />
        <TweakRadio  label="Tema" value={t.theme}
                     options={[{ value: "dark", label: "Escuro" },
                               { value: "ultra", label: "Ultra-escuro" }]}
                     onChange={v => setTweak("theme", v)} />
        <TweakRadio  label="Tipografia" value={t.type}
                     options={[{ value: "sans", label: "Sans moderna" },
                               { value: "serif", label: "Serif premium" }]}
                     onChange={v => setTweak("type", v)} />

        <TweakSection label="Navegação rápida" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 4 }}>
          {[
            { id: "home",    label: "Home" },
            { id: "profile", label: "Aluno" },
            { id: "admin",   label: "Admin" },
            { id: "login",   label: "Login" },
          ].map(s => (
            <button key={s.id} onClick={() => navigate(s.id)}
                    style={{
                      padding: "6px 8px", borderRadius: 6,
                      background: route.route === s.id ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.08)",
                      color: route.route === s.id ? "#fff" : "rgba(41,38,27,0.85)",
                      border: 0, cursor: "pointer", fontSize: 11.5, fontWeight: 500,
                    }}>{s.label}</button>
          ))}
        </div>
      </TweaksPanel>
    </div>
  );
}

// Floating screen-switcher dock — pills at bottom-center
function ScreenDock({ current, navigate }) {
  const items = [
    { id: "home",    label: "Início",  icon: "grid" },
    { id: "series",  label: "Série",   icon: "book",  alias: ["series", "play"] },
    { id: "play",    label: "Player",  icon: "play",  hidden: true },
    { id: "login",   label: "Login",   icon: "lock" },
    { id: "profile", label: "Aluno",   icon: "user" },
    { id: "admin",   label: "Admin",   icon: "settings" },
  ].filter(i => !i.hidden);

  const activeId = current === "play" ? "series" : current;

  return (
    <div style={{
      position: "fixed", left: "50%", bottom: 18, transform: "translateX(-50%)",
      zIndex: 200,
      display: "flex", gap: 4,
      padding: 5,
      background: "rgba(15,15,15,0.82)",
      backdropFilter: "blur(20px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 999,
      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      fontSize: 12,
    }}>
      {items.map(it => {
        const isActive = activeId === it.id || (it.alias && it.alias.includes(current));
        return (
          <button
            key={it.id}
            onClick={() => {
              if (it.id === "series") {
                navigate(`series/${window.BFData.SERIES[0].id}`);
              } else {
                navigate(it.id);
              }
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 14px",
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "#fff" : "var(--text-2)",
              border: 0, borderRadius: 999, cursor: "pointer",
              fontSize: 12, fontWeight: 600,
              boxShadow: isActive ? "0 0 16px var(--accent-glow)" : "none",
              transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
            <Icon name={it.icon} size={13} />
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const mount = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
