import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0A0B0B",
  surface: "#111418", 
  card: "#1A1D23",
  border: "#2D3748",
  accent: "#FF6B35", // Orange moderne
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  text: "#F9FAFB",
  muted: "#9CA3AF",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gold: "#FFB800",
  platinum: "#E5E7EB",
};

const GRADIENTS = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  success: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  danger: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
  warning: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  gold: "linear-gradient(135deg, #FFB800 0%, #FF9500 100%)",
};

// Localisation réelle : Axe Thiès - Pout - Sindhia
const checkpoints = [
  { id: "CP1", label: "Base Thiès (Zone Nord)", km: 0, status: "active" },
  { id: "CP2", label: "Poste Pout (Carrières)", km: 12, status: "active" },
  { id: "CP3", label: "Point de Sortie / Pesage", km: 20, status: "active" },
];

const vehicles = [
  { id: "TH-5512-B", model: "Mitsubishi L200", owner: "Saliou Diop", km: 92100, score: 88, lastPos: "Pout", moving: true },
  { id: "DK-2024-AS", model: "Toyota HiLux", owner: "Modou Fall", km: 145000, score: 42, lastPos: "Thiès", moving: false, alert: true },
  { id: "TH-7889-CD", model: "Nissan Navara", owner: "Alassane Ba", km: 67800, score: 91, lastPos: "En route", moving: true },
];

// --- COMPOSANTS DE DÉMONSTRATION PROFESSIONNELLE ---

function MetricCard({ title, value, subtitle, gradient, icon, trend }) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 20,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 100,
        background: gradient,
        opacity: 0.1,
        borderRadius: "50%",
        transform: "translate(30%, -30%)"
      }} />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ 
          fontSize: 24, 
          fontWeight: "bold", 
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 8
        }}>
          {icon} {value}
        </div>
        <div style={{ fontSize: 13, color: COLORS.text, fontWeight: "600", marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted }}>
          {subtitle}
        </div>
        {trend && (
          <div style={{ 
            marginTop: 8, 
            fontSize: 10, 
            color: trend > 0 ? COLORS.success : COLORS.danger,
            fontWeight: "bold"
          }}>
            {trend > 0 ? "+" : ""}{trend}% aujourd'hui
          </div>
        )}
      </div>
    </div>
  );
}

function LiveChart() {
  const [data, setData] = useState([65, 78, 90, 81, 95, 88, 92]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push(Math.floor(Math.random() * 30) + 70);
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 20,
      height: 200
    }}>
      <div style={{ fontSize: 12, color: COLORS.text, fontWeight: "600", marginBottom: 15 }}>
        PERFORMANCE TEMPS RÉEL
      </div>
      <div style={{ 
        display: "flex", 
        alignItems: "flex-end", 
        height: 120,
        gap: 8
      }}>
        {data.map((value, i) => (
          <div key={i} style={{ 
            flex: 1, 
            background: GRADIENTS.primary,
            borderRadius: 4,
            height: `${value}%`,
            transition: "height 0.5s ease",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 9,
              color: COLORS.muted
            }}>
              {value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoMode({ active }) {
  const [gains, setGains] = useState(125000);
  const [timeSaved, setTimeSaved] = useState(45);
  const [controls, setControls] = useState(23);
  const [efficiency, setEfficiency] = useState(87);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setGains(prev => prev + Math.floor(Math.random() * 8000) + 3000);
      setTimeSaved(prev => prev + Math.floor(Math.random() * 5) + 2);
      setControls(prev => prev + 1);
      setEfficiency(prev => Math.min(99, prev + Math.floor(Math.random() * 3)));
    }, 2500);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div style={{ marginBottom: 25 }}>
      {/* Header Premium */}
      <div style={{
        background: GRADIENTS.primary,
        borderRadius: 20,
        padding: 25,
        marginBottom: 25,
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%"
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 10,
            marginBottom: 10
          }}>
            <div style={{
              width: 12,
              height: 12,
              background: COLORS.success,
              borderRadius: "50%",
              boxShadow: `0 0 20px ${COLORS.success}`,
              animation: "pulse 2s infinite"
            }} />
            <span style={{ 
              fontSize: 14, 
              fontWeight: "bold", 
              color: COLORS.text,
              letterSpacing: 1
            }}>
              SAAYTU-AUTO PRO
            </span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>
            Système de gestion de flotte minier intelligent
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 15,
        marginBottom: 25
      }}>
        <MetricCard
          title="Économies générées"
          value={`${(gains/1000).toFixed(0)}K FCFA`}
          subtitle="Aujourd'hui"
          gradient={GRADIENTS.success}
          icon=""
          trend={12}
        />
        <MetricCard
          title="Temps économisé"
          value={`${timeSaved} min`}
          subtitle="Par contrôle"
          gradient={GRADIENTS.warning}
          icon=""
          trend={8}
        />
        <MetricCard
          title="Contrôles validés"
          value={controls}
          subtitle="Total aujourd'hui"
          gradient={GRADIENTS.primary}
          icon=""
          trend={15}
        />
        <MetricCard
          title="Efficacité système"
          value={`${efficiency}%`}
          subtitle="Performance"
          gradient={GRADIENTS.gold}
          icon=""
          trend={5}
        />
      </div>

      {/* Live Chart */}
      <LiveChart />
    </div>
  );
}

function AlertBanner({ alerts }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  if (!alerts[current]) return null;

  return (
    <div style={{ 
      background: alerts[current].type === "warning" ? `${COLORS.accent}22` : `${COLORS.red}22`,
      border: `1px solid ${alerts[current].type === "warning" ? COLORS.accent : COLORS.red}`,
      borderRadius: 8, 
      padding: 12, 
      marginBottom: 15,
      display: "flex",
      alignItems: "center",
      gap: 10
    }}>
      <div style={{ fontSize: 16 }}>{alerts[current].type === "warning" ? "warning" : "alert"}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: "bold", color: alerts[current].type === "warning" ? COLORS.accent : COLORS.red }}>
          {alerts[current].title}
        </div>
        <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
          {alerts[current].message}
        </div>
      </div>
    </div>
  );
}

// --- COMPOSANTS DE CONTRÔLE ---

function WhatsAppBotSim({ vehicleId, onDone }) {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const questions = [
    { q: "État des pneus (Poussière/Usure) ?", opts: ["OK", "Critique"] },
    { q: "Niveau d'huile et liquide ?", opts: ["OK", "Bas"] },
    { q: "Kilométrage actuel à Pout ?", opts: ["Moins de 15km", "Plus de 15km"] },
  ];

  useEffect(() => {
    setMessages([{ from: "bot", text: `CONTRÔLE MINIER\nVéhicule : ${vehicleId}\n\nRépondez pour valider le trajet.` }]);
  }, [vehicleId]);

  const handleAnswer = (opt) => {
    setMessages(p => [...p, { from: "user", text: opt }]);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setMessages(p => [...p, { from: "bot", text: "✅ *Contrôle validé.*\nDonnées transmises au propriétaire." }]);
      onDone();
    }
  };

  return (
    <div style={{ background: "#0B1419", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.border}`, height: 350, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#128C7E", padding: 10, fontSize: 12, fontWeight: "bold", color: "white" }}>🤖 BOT SAAYTU-AUTO</div>
      <div style={{ flex: 1, padding: 15, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", background: m.from === "user" ? "#005C4B" : "#1F2C34", padding: 10, borderRadius: 8, fontSize: 12 }}>{m.text}</div>
        ))}
        {step < questions.length && messages.length > 0 && !messages.find(m => m.text.includes("✅")) && (
          <div style={{ marginTop: 10, fontSize: 12, color: COLORS.accent }}>{questions[step].q}</div>
        )}
      </div>
      {step < questions.length && !messages.find(m => m.text.includes("✅")) && (
        <div style={{ padding: 10, display: "flex", gap: 10, background: "#0B1419" }}>
          {questions[step].opts.map((o, i) => (
            <button key={i} onClick={() => handleAnswer(o)} style={{ flex: 1, background: COLORS.accent, border: "none", padding: 8, borderRadius: 5, fontWeight: "bold", cursor: "pointer" }}>{o}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("demo");

  const alerts = [
    { type: "warning", title: "Maintenance requise", message: "Véhicule DK-2024-AS nécessite une révision" },
    { type: "alert", title: "Contrôle en cours", message: "TH-5512-B en approche du poste Pout" },
    { type: "warning", title: "Nouveau véhicule ajouté", message: "TH-7889-CD intégré à la flotte" },
    { type: "alert", title: "Contrôle validé", message: "TH-5512-B passé au poste avec succès" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, maxWidth: 480, margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{
        background: GRADIENTS.primary,
        padding: "30px 25px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%"
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>
            <div>
              <h1 style={{ 
                color: COLORS.text, 
                margin: 0, 
                fontSize: 28, 
                fontWeight: "700",
                letterSpacing: 2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
              }}>
                SAAYTU-AUTO
              </h1>
              <div style={{ 
                fontSize: 12, 
                color: "rgba(255,255,255,0.7)", 
                marginTop: 5,
                fontWeight: "500"
              }}>
                FLEET MANAGEMENT SYSTEM
              </div>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <div style={{
                width: 10,
                height: 10,
                background: COLORS.success,
                borderRadius: "50%",
                boxShadow: `0 0 20px ${COLORS.success}`,
                animation: "pulse 2s infinite"
              }} />
              <span style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                fontWeight: "600"
              }}>
                LIVE
              </span>
            </div>
          </div>
          
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "12px 16px",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>
              Zone Minière : Thiès - Pout - Sindhia
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
              3 véhicules actifs | 2 postes de contrôle
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", background: COLORS.surface }}>
        {["demo", "suivi", "bot", "flotte"].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)} 
            style={{ 
              flex: 1, 
              padding: 15, 
              background: "none", 
              border: "none", 
              borderBottom: activeTab === t ? `3px solid ${COLORS.accent}` : "none", 
              color: activeTab === t ? COLORS.accent : COLORS.muted, 
              fontSize: 10, 
              fontWeight: "bold",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
          >
            {t === "demo" ? "DÉMO" : t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        
        {/* Mode Démonstration */}
        {activeTab === "demo" && (
          <div>
            <DemoMode active={true} />
            <AlertBanner alerts={alerts} />
            
            <div style={{ background: COLORS.card, borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <h3 style={{ fontSize: 12, color: COLORS.accent, marginBottom: 10 }}>SCÉNARIO DE DÉMONSTRATION</h3>
              <div style={{ fontSize: 11, color: COLORS.text, lineHeight: 1.6 }}>
                <p style={{ marginBottom: 10 }}>Regardez comment Saaytu-Auto transforme le contrôle minier :</p>
                <ol style={{ paddingLeft: 15, margin: 0 }}>
                  <li style={{ marginBottom: 8 }}>Les gains augmentent en temps réel</li>
                  <li style={{ marginBottom: 8 }}>Les alertes préviennent les problèmes</li>
                  <li style={{ marginBottom: 8 }}>Le bot WhatsApp automatise les contrôles</li>
                  <li>La flotte est monitorée 24/7</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Suivi */}
        {activeTab === "suivi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <AlertBanner alerts={alerts} />
            <h3 style={{ fontSize: 12, color: COLORS.accent }}>AXE DE CONTRÔLE (KM)</h3>
            {checkpoints.map((cp, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${COLORS.border}`, paddingLeft: 15, position: "relative" }}>
                <div style={{ 
                  position: "absolute", left: -6, top: 0, width: 10, height: 10, borderRadius: "50%", 
                  background: COLORS.accent,
                  boxShadow: `0 0 8px ${COLORS.accent}`
                }} />
                <div style={{ fontSize: 14, fontWeight: "bold" }}>{cp.label}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>Position : {cp.km} km</div>
                {i === 1 && (
                  <div style={{ marginTop: 8, fontSize: 10, color: COLORS.green }}>
                    TH-5512-B en approche (2 min)
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Onglet Bot */}
        {activeTab === "bot" && (
          <div>
            <AlertBanner alerts={alerts} />
            <h3 style={{ fontSize: 12, marginBottom: 15 }}>SIMULATION SCAN QR (POSTE POUT)</h3>
            
            {/* QR Code Scanner Visuel */}
            <div style={{ 
              background: COLORS.card, 
              borderRadius: 12, 
              padding: 20, 
              marginBottom: 20,
              textAlign: "center",
              border: `2px solid ${COLORS.accent}`,
              position: "relative"
            }}>
              <div style={{ 
                width: 200, 
                height: 200, 
                margin: "0 auto", 
                border: `2px solid ${COLORS.accent}`, 
                borderRadius: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                position: "relative",
                background: "#000"
              }}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SAAYTU-TH5512B-POUT&color=F5A623&bgcolor=000000`} 
                  alt="QR Code Saaytu-Auto" 
                  style={{ borderRadius: 10 }}
                />
                <div style={{ 
                  position: "absolute", 
                  width: "100%", 
                  height: 2, 
                  background: COLORS.accent, 
                  top: "50%", 
                  opacity: 0.8,
                  animation: "scan 2s linear infinite"
                }} />
              </div>
              <p style={{ marginTop: 15, fontSize: 12, color: COLORS.muted }}>
                Scannez le code QR au poste de Pout
              </p>
              <div style={{ 
                marginTop: 10, 
                fontSize: 10, 
                color: COLORS.green,
                fontWeight: "bold"
              }}>
                Véhicule : TH-5512-B | Poste : POUT
              </div>
            </div>

            <WhatsAppBotSim vehicleId="TH-5512-B" onDone={() => {}} />
          </div>
        )}

        {/* Onglet Flotte */}
        {activeTab === "flotte" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <AlertBanner alerts={alerts} />
            <h3 style={{ fontSize: 12 }}>PROPRIÉTAIRES & VÉHICULES</h3>
            {vehicles.map(v => (
              <div key={v.id} style={{ 
                background: COLORS.card, 
                padding: 15, 
                borderRadius: 10, 
                border: `1px solid ${v.alert ? COLORS.red : COLORS.border}`,
                position: "relative",
                transition: "all 0.3s ease"
              }}>
                {v.moving && (
                  <div style={{ 
                    position: "absolute", top: 5, right: 5, 
                    width: 6, height: 6, borderRadius: "50%", 
                    background: COLORS.green,
                    boxShadow: `0 0 6px ${COLORS.green}`
                  }} />
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "bold", color: COLORS.accent }}>{v.id}</span>
                  <span style={{ fontSize: 11, color: v.score > 70 ? COLORS.green : COLORS.red }}>{v.score}/100</span>
                </div>
                <div style={{ fontSize: 12, marginTop: 5 }}>{v.model} {v.owner}</div>
                <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 10 }}>
                  Dernier point : {v.lastPos}
                  {v.moving && <span style={{ color: COLORS.green, marginLeft: 5 }}> En mouvement</span>}
                </div>
                {v.alert && (
                  <div style={{ marginTop: 8, fontSize: 10, color: COLORS.red }}>
                    Maintenance requise
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}