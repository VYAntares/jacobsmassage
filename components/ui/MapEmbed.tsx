"use client";
import { useState } from "react";
import { business } from "@/data/business";
import { PinIcon } from "./Icons";

/**
 * Privacy-friendly map: Google Maps is only loaded after the visitor asks
 * for it (no third-party request on page load).
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const label = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;

  return (
    <div className="map-box" data-hero-item>
      {loaded ? (
        <iframe
          src={business.mapsEmbedUrl}
          title={`Carte : ${label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 14, padding: 20, textAlign: "center",
            background: "radial-gradient(circle at 30% 30%, #e6eef0 0, #dce6e9 60%)",
          }}
        >
          <span style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--blanc)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-float)" }}>
            <PinIcon />
          </span>
          <span style={{ fontSize: 15, color: "var(--texte-2)" }}>{label}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <button type="button" className="btn btn--dark" style={{ padding: "12px 20px", fontSize: 15 }} onClick={() => setLoaded(true)}>
              Afficher la carte
            </button>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ padding: "12px 20px", fontSize: 15 }}>
              Ouvrir dans Maps<span className="sr-only"> (nouvel onglet)</span>
            </a>
          </div>
          <span style={{ fontSize: 12, color: "var(--texte-3)" }}>La carte est fournie par Google Maps.</span>
        </div>
      )}
    </div>
  );
}
