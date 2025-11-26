export default function Hero() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        overflow: "hidden",
        backgroundColor: "rgba(0, 70, 150, 0.45)"
      }}
    >
      {/* Imagen de fondo */}
      <img
        src="/hero-bg.jpg"
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.45
        }}
      />

      {/* LOGO */}
      <img
        src="/crystalim-logo.png"
        alt="Crystalim Logo"
        style={{
          width: "240px",
          maxWidth: "70%",
          marginBottom: "20px"
        }}
      />

      {/* TITULO */}
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 700,
          margin: "0 0 10px 0",
          lineHeight: 1.2
        }}
      >
        The Future of Clean is Crystalim™
      </h1>

      {/* SUBTITULO */}
      <p
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(14px, 3vw, 18px)",
          fontWeight: 400,
          maxWidth: "600px",
          margin: "0 auto 30px auto"
        }}
      >
        Discover High-Efficiency cleaning solutions for your Home and Business.
      </p>

      {/* BOTÓN */}
      <button
        style={{
          padding: "12px 26px",
          backgroundColor: "#FFFFFF",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
        }}
      >
        Explore Services
        <span style={{ fontSize: "18px" }}>➜</span>
      </button>
    </div>
  );
}
