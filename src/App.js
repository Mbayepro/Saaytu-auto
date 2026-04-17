import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0D0F0E",
  surface: "#161A18",
  card: "#1C211F",
  border: "#2A3330",
  accent: "#F5A623",
  green: "#25D366",
  red: "#FF4545",
  text: "#E8EDE9",
  muted: "#7A9085",
};

// Simulation des installations tous les 7-8km
const checkpoints = [
  { id: "CP1", label: "Base Ndioum", km: 0 },
  { id: "CP2", label: "Installation Km 8", km: 8 },
  { id: "CP3", label: "Installation Km 15", km: 15 },
];

const initialVehicles = [
  { id: "SN-4821-DK", model: "Toyota HiLux", owner: "Moussa Diallo", km: 87420, score: 82, lastCp: "CP2" },
  { id: "SN-1193-KG", model: "Nissan Navara", owner: "Ibrahima Sow", km: 124300, score: 54, lastCp: "CP1" },
];

// --- COMPOSANTS UI ---

function StatusBadge({ score }) {
  const color = score >= 80 ? COLORS.green : score >= 55 ? COLORS.accent : COLORS.red;
  const label = score >= 80 ? "RAS" : score >= 55 ? "VIGILANCE" : "DANGER";
  return (
    <div style={{ padding: "4px 8px", borderRadius: 4, fontSize: 10, fontWeight: "bold", border: `1px solid ${color}`, color }}>
      {label}
    </div>
  );
}

function SyncStatus({ isOnline }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: isOnline ? COLORS.green : COLORS.muted }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: isOnline ? COLORS.green : COLORS.muted }} />
      {isOnline ? "SYNC CLOUD OK" : "MODE HORS-LIGNE (STOCKAGE LOCAL)"}
    </div>
  );
}

// --- APPLICATION PRINCIPALE ---

export default function SaaytuAuto() {
  const [tab, setTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(true);

  // Simulation de perte de réseau pour la démo
  useEffect(() => {
    const interval = setInterval(() => setIsOnline(prev => !prev), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "monospace", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, maxWidth: 450, margin: "0 auto", border: `1px solid ${COLORS.border}` }}>
      
      {/* Top Bar */}
      <div style={{ padding: "20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: COLORS.accent, margin: 0, fontSize: 18 }}>SAAYTU-AUTO</h1>
          <SyncStatus isOnline={isOnline} />
        </div>
        <div style={{ fontSize: 20 }}>🚛</div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", background: COLORS.surface }}>
        {[
          { id: "dashboard", label: "FLOTTE", icon: "📊" },
          { id: "checkpoints", label: "TRAJETS", icon: "📍" },
          { id: "scan", label: "SCAN QR", icon: "📷" }
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "15px", background: "none", border: "none",
            borderBottom: tab === t.id ? `3px solid ${COLORS.accent}` : "none",
            color: tab === t.id ? COLORS.accent : COLORS.muted, cursor: "pointer"
          }}>
            {t.icon}<br/><span style={{ fontSize: 9 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div style={{ padding: "20px" }}>
        
        {tab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <h3 style={{ fontSize: 12, color: COLORS.muted }}>ÉTAT DE LA FLOTTE</h3>
            {initialVehicles.map(v => (
              <div key={v.id} style={{ background: COLORS.card, padding: 15, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: "bold" }}>{v.id}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>{v.model} • {v.owner}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 18, fontWeight: "bold", color: COLORS.accent }}>{v.score}%</div>
                  <StatusBadge score={v.score} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "checkpoints" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontSize: 12, color: COLORS.muted }}>SUIVI DES INSTALLATIONS (7-8 KM)</h3>
            <div style={{ position: "relative", paddingLeft: 20, borderLeft: `2px dashed ${COLORS.border}` }}>
              {checkpoints.map((cp, i) => (
                <div key={cp.id} style={{ marginBottom: 30, position: "relative" }}>
                  <div style={{ 
                    position: "absolute", left: -26, top: 0, width: 10, height: 10, borderRadius: "50%", 
                    background: i === 0 ? COLORS.green : COLORS.accent 
                  }} />
                  <div style={{ fontWeight: "bold", fontSize: 13 }}>{cp.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Position : {cp.km} km</div>
                  {i === 1 && (
                    <div style={{ marginTop: 8, background: "#F5A62322", padding: 8, borderRadius: 5, fontSize: 10, border: "1px solid #F5A62355" }}>
                      ⏱️ Dernier passage : SN-4821-DK (Il y a 12 min)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "scan" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 200, height: 200, margin: "0 auto", border: `2px solid ${COLORS.accent}`, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=INSTALL_KM8&color=F5A623&bgcolor=1C211F`} alt="QR" />
               <div style={{ position: "absolute", width: "100%", height: 2, background: COLORS.accent, top: "50%", opacity: 0.5 }}></div>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, color: COLORS.muted }}>Scannez le code à l'installation pour valider l'étape</p>
          </div>
        )}

      </div>
    </div>
  );
}