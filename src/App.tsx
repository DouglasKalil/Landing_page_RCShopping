import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import { ShoppingBag, Star, Tag, Handshake, Store, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import logoImg from "@/imports/image.png";
import heroImg from "@/imports/image-1.png";
import modaFemininaImg from "@/imports/moda-feminina.png";
import modaMasculinaImg from "@/imports/moda-masculina.png";
import modaInfantilImg from "@/imports/moda-infantil.png";
import criancaImg from "@/imports/crianca.png";
import fotoCriancaImg from "@/imports/foto-crianca.png";
import mochilaImg from "@/imports/mochila.png";
import sapatoImg from "@/imports/sapato.png";
import roupaCriancaImg from "@/imports/roupa-crianca.png";
import fotoImg from "@/imports/foto.png";
import fotoHistoriaImg from "@/imports/foto-historia.png";

// ── Instagram real content (@rcshopping) ───────────────────────────────────────
const IG = {
  profile: "https://www.instagram.com/rcshopping/",
  sneakerReel: "https://www.instagram.com/rcshopping/reel/DcJpeBMR9jF/",
  promoReel: "https://www.instagram.com/rcshopping/reel/Dcwjkx9xnKd/",
  colorReel: "https://www.instagram.com/rcshopping/reel/DcBy-YZRCgd/",
  liveShopPost: "https://www.instagram.com/rcshopping/p/DclO-qFRREL/",
  giftReel: "https://www.instagram.com/p/DbA-UlUxIuA/",
  tripReel: "https://www.instagram.com/p/Da0454ugYeW/",
  lookReel: "https://www.instagram.com/p/DanJ5cfxmCa/",
};

// ── Instagram embed loader ──────────────────────────────────────────────────────
let instagramScriptPromise: Promise<void> | null = null;
function loadInstagramEmbedScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).instgrm) return Promise.resolve();
  if (instagramScriptPromise) return instagramScriptPromise;
  instagramScriptPromise = new Promise((resolve) => {
    const existing = document.getElementById("instagram-embed-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
  return instagramScriptPromise;
}

// ── Instagram embed (plays inline, click-through to Instagram) ─────────────────
function InstagramEmbed({ url, style }: { url: string; style?: CSSProperties }) {
  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (!cancelled) (window as any).instgrm?.Embeds?.process();
    });
    return () => { cancelled = true; };
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ background: "#FFF", border: 0, borderRadius: 12, margin: "0 auto", maxWidth: 400, minWidth: 270, width: "100%", ...style }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block" }} />
    </blockquote>
  );
}

// ── Icon components ────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill={color} aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill={color} aria-hidden="true">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function MapIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

// ── Reveal wrapper component ──────────────────────────────────────────────────
function Reveal({ children, direction = "up", delay = 0, className = "" }: {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ── Logo Component ────────────────────────────────────────────────────────────
function Logo({ size = "default" }: { size?: "default" | "small" }) {
  return (
    <img
      src={logoImg}
      alt="R&C Shopping — Sinta a diferença"
      className={size === "small" ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain"}
    />
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Moda", href: "#moda" },
    { label: "Cama, Mesa e Banho", href: "#casa" },
    { label: "Brinquedos", href: "#brinquedos" },
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "white",
      boxShadow: scrolled ? "0 2px 20px rgba(59,87,34,0.12)" : "0 1px 0 #D8E4CC",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.35s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Logo />

          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="nav-desktop">
            <a href="https://instagram.com/rcshopping" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ color: "var(--text-mid)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--brand-dark)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}>
              <InstagramIcon size={20} />
            </a>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              style={{ color: "#25D366", display: "flex", alignItems: "center", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              <WhatsAppIcon size={20} />
            </a>
            <a href="#categorias" className="btn-lime" style={{ padding: "10px 18px", fontSize: 14 }}>
              Ver produtos
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"
            className="hamburger"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <div style={{ width: 24, height: 2, background: "var(--brand-dark)", marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: "var(--brand-dark)", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 24, height: 2, background: "var(--brand-dark)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`} style={{ borderTop: menuOpen ? "1px solid var(--border)" : "none" }}>
          <div style={{ padding: "16px 0 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ padding: "12px 0", fontFamily: "var(--font-sf)", fontWeight: 500, fontSize: 16, color: "var(--text-dark)", textDecoration: "none", borderBottom: "1px solid var(--bg-soft)" }}>
                {l.label}
              </a>
            ))}
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
              style={{ marginTop: 12 }} className="btn-lime">
              <WhatsAppIcon size={18} /> Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 72 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={heroImg}
          alt="R&C Shopping" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(255,255,255,0.96) 45%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.1) 100%)" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 620 }}>
          <p className="section-label animate-fade-in" style={{ marginBottom: 20 }}>Bem-vindo à R&C Shopping</p>

          <h1 className="animate-fade-in-up delay-100"
            style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(38px, 6vw, 74px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 14, color: "var(--text-dark)" }}>
            Tudo o que você{" "}
            <span style={{ color: "var(--brand-dark)", position: "relative", display: "inline-block" }}>
              precisa
              <span style={{ position: "absolute", bottom: 6, left: 0, right: 0, height: 5, background: "var(--brand-light)", borderRadius: 3, opacity: 0.55, zIndex: -1 }} />
            </span>
            {" "}em um só lugar.
          </h1>

          <p className="animate-fade-in-up delay-200"
            style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(17px, 2.5vw, 22px)", fontWeight: 500, color: "var(--brand-mid)", marginBottom: 14 }}>
            Moda, casa, diversão e muito mais.
          </p>
          <p className="animate-fade-in-up delay-300"
            style={{ fontSize: 16, color: "var(--text-mid)", lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
            Na R&C Shopping você encontra variedade, qualidade e produtos para todos os momentos.
          </p>

          <div className="animate-fade-in-up delay-400" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
            <a href="#categorias" className="btn-primary">Ver produtos →</a>
            <a href="#categorias" className="btn-outline">Conhecer categorias</a>
          </div>

          <div className="animate-fade-in-up delay-500" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Grande variedade de produtos", "Qualidade e bons preços", "Atendimento especializado"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>✓</span>
                </div>
                <span style={{ fontFamily: "var(--font-sf)", fontWeight: 500, fontSize: 15, color: "var(--text-dark)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="animate-float" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-sf)", fontSize: 11, color: "var(--text-muted)", letterSpacing: 3, textTransform: "uppercase" }}>Role</span>
        <div style={{ width: 1, height: 32, background: "var(--border)" }} />
      </div>
    </section>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({ title, desc, img, w, h, href, delay }: { title: string; desc: string; img: string; w: number; h: number; href: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="cat-card frame-box" style={{ "--fw": `${w}px`, borderRadius: 16, overflow: "hidden", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", cursor: "pointer" } as CSSProperties}>
        <div style={{ aspectRatio: `${w} / ${h}`, overflow: "hidden", background: "#e8eee0" }}>
          <img src={img} alt={title} className="cat-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-sf)", fontWeight: 700, fontSize: 20, marginBottom: 8, color: "var(--text-dark)" }}>{title}</h3>
          <p style={{ color: "var(--text-mid)", fontSize: 14, marginBottom: 16, lineHeight: 1.65 }}>{desc}</p>
          <a href={href} style={{ fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 14, color: "var(--brand-dark)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "gap 0.2s ease" }}
            onMouseEnter={e => (e.currentTarget.style.gap = "12px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "6px")}>
            Explorar →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

// ── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection() {
  const categories = [
    { title: "Moda", desc: "Estilo para todos os momentos.", img: modaFemininaImg, w: 184, h: 260, href: "#moda" },
    { title: "Cama, Mesa e Banho", desc: "Mais conforto e beleza para sua casa.", img: "https://images.unsplash.com/photo-1758974817671-24f627809115?w=600&h=700&fit=crop&auto=format", w: 223, h: 260, href: "#casa" },
    { title: "Brinquedos", desc: "Diversão para todas as idades.", img: criancaImg, w: 208, h: 260, href: "#brinquedos" },
    { title: "Utilidades", desc: "Soluções práticas para sua rotina.", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=700&fit=crop&auto=format", w: 223, h: 260, href: "#utilidades" },
  ];

  return (
    <section id="categorias" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Navegue pelo nosso acervo</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "var(--text-dark)", lineHeight: 1.15 }}>
              Encontre o que você procura
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} {...cat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Fashion Section ───────────────────────────────────────────────────────────
function FashionSection() {
  const subs = [
    { label: "Feminino", img: modaFemininaImg, w: 198, h: 280 },
    { label: "Masculino", img: modaMasculinaImg, w: 285, h: 280 },
    { label: "Infantil", img: modaInfantilImg, w: 223, h: 280 },
    { label: "Acessórios", img: sapatoImg, w: 300, h: 280 },
  ];

  return (
    <section id="moda" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} className="two-col-grid">
        <Reveal direction="left">
          <div>
            <p className="section-label" style={{ marginBottom: 16 }}>Coleção exclusiva</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: "var(--text-dark)" }}>
              Moda para todos os estilos
            </h2>
            <p style={{ color: "var(--text-mid)", lineHeight: 1.85, fontSize: 16, marginBottom: 36 }}>
              Encontre peças para todas as idades e ocasiões. Feminino, masculino, infantil e muito mais — com estilo, conforto e os melhores preços.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {[[subs[0], subs[1]], [subs[2], subs[3]]].map((row, ri) => (
                <div key={ri} className="pair-row" style={{ gap: 12 }}>
                  {row.map((s) => (
                    <div key={s.label} className="cat-card frame-box" style={{ "--fw": `${s.w}px`, borderRadius: 12, overflow: "hidden", cursor: "pointer" } as CSSProperties}>
                      <div style={{ aspectRatio: `${s.w} / ${s.h}`, background: "#e8eee0", overflow: "hidden" }}>
                        <img src={s.img} alt={s.label} className="cat-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ padding: "10px 12px", background: "white" }}>
                        <span style={{ fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 14, color: "var(--text-dark)" }}>{s.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <a href="#" className="btn-primary">Explorar moda →</a>
          </div>
        </Reveal>

        <Reveal direction="right">
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "669 / 872", background: "#e8eee0" }}>
              <img src={fotoImg} alt="Moda R&C Shopping" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "var(--brand-dark)", borderRadius: 16, padding: "20px 26px", color: "white", boxShadow: "0 12px 32px rgba(59,87,34,0.3)" }}>
              <div style={{ fontFamily: "var(--font-sf)", fontWeight: 900, fontSize: 30 }}>+200</div>
              <div style={{ fontFamily: "var(--font-sf)", fontSize: 13, opacity: 0.75 }}>peças disponíveis</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Home / Bed-Bath Section ───────────────────────────────────────────────────
function HomeSection() {
  const items = ["Jogos de cama", "Toalhas premium", "Almofadas", "Itens de mesa", "Decoração"];
  return (
    <section id="casa" style={{ padding: "100px 24px", background: "var(--brand-dark)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
        <img src="https://images.unsplash.com/photo-1780510101194-294d3b7b0935?w=1600&h=800&fit=crop&auto=format"
          alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }} className="two-col-grid">
        <Reveal direction="left">
          <div style={{ borderRadius: 20, overflow: "hidden", height: 460, background: "rgba(255,255,255,0.05)" }}>
            <img src="https://images.unsplash.com/photo-1758974817671-24f627809115?w=700&h=600&fit=crop&auto=format"
              alt="Cama, Mesa e Banho" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Reveal>
        <Reveal direction="right">
          <div>
            <p style={{ fontFamily: "var(--font-sf)", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--brand-light)", marginBottom: 16 }}>
              Para sua casa
            </p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: "white" }}>
              Conforto para sua casa
            </h2>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.85, fontSize: 16, marginBottom: 32 }}>
              Transforme seus ambientes com produtos para cama, mesa e banho. Qualidade e beleza que você merece.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {items.map((item) => (
                <span key={item} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "7px 16px", color: "white", fontFamily: "var(--font-sf)", fontWeight: 500, fontSize: 13 }}>
                  {item}
                </span>
              ))}
            </div>
            <a href="#" className="btn-lime">Conhecer produtos para casa →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Toys Section ──────────────────────────────────────────────────────────────
function ToysSection() {
  const toys = [
    { label: "Educativos", img: mochilaImg, w: 200, h: 200 },
    { label: "Infantis", img: fotoCriancaImg, w: 160, h: 200 },
    { label: "Jogos", img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=300&fit=crop&auto=format&sat=-30", w: 200, h: 200 },
    { label: "Presentes", img: roupaCriancaImg, w: 184, h: 200 },
  ];
  return (
    <section id="brinquedos" style={{ padding: "100px 24px", background: "var(--bg-soft)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} className="two-col-grid">
        <Reveal direction="left">
          <div>
            <p className="section-label" style={{ marginBottom: 16 }}>Para as crianças</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: "var(--text-dark)" }}>
              Diversão começa aqui
            </h2>
            <p style={{ color: "var(--text-mid)", lineHeight: 1.85, fontSize: 16, marginBottom: 32 }}>
              Brinquedos para criar momentos inesquecíveis. Educação, criatividade e alegria em cada produto.
            </p>
            <a href="#" className="btn-primary" style={{ marginBottom: 0 }}>Ver brinquedos →</a>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[[toys[0], toys[1]], [toys[2], toys[3]]].map((row, ri) => (
              <div key={ri} className="pair-row" style={{ gap: 16 }}>
                {row.map((t) => (
                  <div key={t.label} className="cat-card frame-box" style={{ "--fw": `${t.w}px`, borderRadius: 14, overflow: "hidden", background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" } as CSSProperties}>
                    <div style={{ aspectRatio: `${t.w} / ${t.h}`, background: "#e8f5d0", overflow: "hidden" }}>
                      <img src={t.img} alt={t.label} className="cat-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "12px 14px", background: "white" }}>
                      <span style={{ fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 14, color: "var(--text-dark)" }}>{t.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, delay }: { icon: typeof ShoppingBag; title: string; desc: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div style={{ background: "var(--bg-soft)", borderRadius: 16, padding: "32px 24px", textAlign: "center", border: "1px solid var(--border)", transition: "all 0.3s ease", cursor: "default", height: "100%" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--brand-light)"; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 12px 32px rgba(59,87,34,0.12)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><Icon size={36} strokeWidth={1.75} color="var(--brand-dark)" /></div>
        <h3 style={{ fontFamily: "var(--font-sf)", fontWeight: 700, fontSize: 18, marginBottom: 10, color: "var(--text-dark)" }}>{title}</h3>
        <p style={{ color: "var(--text-mid)", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
      </div>
    </Reveal>
  );
}

// ── Why Us ────────────────────────────────────────────────────────────────────
function WhyUsSection() {
  const features = [
    { icon: ShoppingBag, title: "Variedade", desc: "Produtos para diferentes momentos da sua vida." },
    { icon: Star, title: "Qualidade", desc: "Produtos selecionados com cuidado para você." },
    { icon: Tag, title: "Bons preços", desc: "Ofertas e preços acessíveis no dia a dia." },
    { icon: Handshake, title: "Atendimento", desc: "Uma equipe pronta para ajudar você." },
    { icon: Store, title: "Praticidade", desc: "Diferentes produtos em um só lugar." },
  ];
  return (
    <section style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Nossos diferenciais</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "var(--text-dark)", lineHeight: 1.15 }}>
              Por que comprar na R&C Shopping?
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 20 }}>
          {features.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="sobre" style={{ padding: "100px 24px", background: "var(--bg-soft)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }} className="two-col-grid">
        <Reveal direction="left">
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "624 / 657", background: "#e8eee0" }}>
            <img src={fotoHistoriaImg} alt="A família por trás da R&C Shopping" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Reveal>
        <Reveal direction="right">
          <div>
            <p className="section-label" style={{ marginBottom: 16 }}>Nossa história</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20, color: "var(--text-dark)" }}>
              Mais do que uma loja, uma experiência de compra.
            </h2>
            <p style={{ color: "var(--text-mid)", lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
              A R&C Shopping reúne diferentes categorias de produtos para facilitar o seu dia a dia. Moda, produtos para casa, brinquedos e muito mais em um só lugar.
            </p>
            <p style={{ color: "var(--text-mid)", lineHeight: 1.9, fontSize: 16, marginBottom: 36 }}>
              Com anos de experiência no varejo, nos dedicamos a oferecer qualidade, variedade e um atendimento que faz a diferença. Venha sentir a diferença.
            </p>
            <a href="#" className="btn-primary">Conheça nossa história →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Instagram ─────────────────────────────────────────────────────────────────
function InstagramSection() {
  const reels = [IG.sneakerReel, IG.promoReel, IG.colorReel, IG.liveShopPost];
  const featured = [IG.giftReel, IG.tripReel, IG.lookReel];
  return (
    <section style={{ padding: "100px 24px", background: "var(--bg-soft)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Redes sociais</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "var(--text-dark)", marginBottom: 12 }}>
              Siga a R&C Shopping
            </h2>
            <p style={{ color: "var(--text-mid)", fontSize: 15 }}>Direto do nosso Instagram — toque em um vídeo para assistir e clique para ver o post completo.</p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: "grid", gap: 20, marginBottom: 48 }} className="insta-embed-grid">
            {reels.map((url) => (
              <InstagramEmbed key={url} url={url} />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 14, color: "var(--brand-mid)", textAlign: "center", marginBottom: 20 }}>
            Momentos com quem confia na R&C Shopping
          </p>
          <div style={{ display: "grid", gap: 20, marginBottom: 36 }} className="insta-embed-grid-3">
            {featured.map((url) => (
              <InstagramEmbed key={url} url={url} />
            ))}
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <a href={IG.profile} target="_blank" rel="noopener noreferrer" className="btn-primary"><InstagramIcon size={18} color="white" /> Seguir no Instagram</a>
        </div>
      </div>
    </section>
  );
}

// ── CTA Final ─────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ position: "relative", padding: "120px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=600&fit=crop&auto=format"
          alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(59,87,34,0.96) 0%, rgba(78,122,45,0.88) 100%)" }} />
      </div>
      <Reveal>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Encontre tudo o que você precisa na R&C Shopping.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 17, lineHeight: 1.75, marginBottom: 48 }}>
            Venha conhecer nossa variedade de produtos e aproveite nossas ofertas.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#categorias" className="btn-lime">Conhecer a loja →</a>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
              style={{ background: "transparent", color: "white", padding: "14px 28px", borderRadius: 8, fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 15, textDecoration: "none", border: "2px solid rgba(255,255,255,0.45)", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "white"; el.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.45)"; el.style.background = "transparent"; }}>
              <WhatsAppIcon size={18} /> Falar conosco
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const infos = [
    { icon: MapPin, label: "Endereço", value: "R. Vinte e Três de Dezembro, 669\nCapitão Poço - PA, 68650-000" },
    { icon: Phone, label: "Telefone", value: "(00) 1234-5678" },
    { icon: MessageCircle, label: "WhatsApp", value: "(00) 99999-9999" },
    { icon: Clock, label: "Horário", value: "Segunda a Sábado: 8h às 19h" },
  ];
  return (
    <section id="contato" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>Onde estamos</p>
            <h2 style={{ fontFamily: "var(--font-sf)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "var(--text-dark)" }}>
              Venha nos visitar
            </h2>
          </div>
        </Reveal>
        <div className="two-col-grid" style={{ maxWidth: 1280 }}>
          <Reveal direction="left">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {infos.map((c) => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 22px", background: "var(--bg-soft)", borderRadius: 14, border: "1px solid var(--border)" }}>
                  <span style={{ flexShrink: 0 }}><c.icon size={22} strokeWidth={1.75} color="var(--brand-dark)" /></span>
                  <div>
                    <div style={{ fontFamily: "var(--font-sf)", fontWeight: 700, fontSize: 12, color: "var(--brand-dark)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1.5 }}>{c.label}</div>
                    <div style={{ color: "var(--text-mid)", fontSize: 15, lineHeight: 1.65, whiteSpace: "pre-line" }}>{c.value}</div>
                  </div>
                </div>
              ))}
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
                style={{ background: "#25D366", color: "white", padding: "16px 28px", borderRadius: 10, fontFamily: "var(--font-sf)", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", marginTop: 4 }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 20px rgba(37,211,102,0.4)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                <WhatsAppIcon size={18} color="white" /> Falar pelo WhatsApp
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=R.+Vinte+e+Tr%C3%AAs+de+Dezembro%2C+669%2C+Capit%C3%A3o+Po%C3%A7o+-+PA%2C+68650-000%2C+Brasil"
                target="_blank" rel="noopener noreferrer"
                style={{ border: "2px solid var(--brand-dark)", color: "var(--brand-dark)", padding: "14px 28px", borderRadius: 10, fontFamily: "var(--font-sf)", fontWeight: 600, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--brand-dark)"; el.style.color = "white"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--brand-dark)"; }}>
                <MapIcon size={18} /> Como chegar
              </a>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div style={{ borderRadius: 20, overflow: "hidden", height: 480, border: "1px solid var(--border)" }}>
              <iframe
                title="Localização da R&C Shopping no Google Maps"
                src="https://www.google.com/maps?q=R.%20Vinte%20e%20Tr%C3%AAs%20de%20Dezembro%2C%20669%2C%20Capit%C3%A3o%20Po%C3%A7o%20-%20PA%2C%2068650-000%2C%20Brasil&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "R&C Shopping", links: ["Sobre nós", "Nossa loja", "Contato"] },
    { title: "Categorias", links: ["Moda", "Cama, Mesa e Banho", "Brinquedos", "Utilidades"] },
    { title: "Atendimento", links: ["WhatsApp", "Telefone", "Horário", "Localização"] },
    { title: "Redes Sociais", links: ["Instagram", "Facebook", "TikTok"] },
  ];
  return (
    <footer style={{ background: "#141710", color: "white", padding: "64px 24px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ background: "white", borderRadius: 10, padding: "8px 14px", display: "inline-flex" }}>
              <Logo size="small" />
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.85, marginTop: 18, maxWidth: 220 }}>
              Variedade, qualidade e preços acessíveis. Tudo em um só lugar.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a href={IG.profile} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--brand-dark)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                <InstagramIcon size={17} color="white" />
              </a>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#25D366")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                <WhatsAppIcon size={17} color="white" />
              </a>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "var(--font-sf)", fontWeight: 700, fontSize: 12, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--brand-light)", marginBottom: 20 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>© 2026 R&C Shopping. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Política de Privacidade", "Termos de Uso"].map((t) => (
              <a key={t} href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <style>{`
        /* Responsive two-col layout */
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .two-col-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        /* Header responsive */
        .nav-desktop { display: flex; }
        .hamburger { display: none; }
        @media (max-width: 920px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; flex-direction: column; }
        }

        /* Footer grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 40px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FashionSection />
        <HomeSection />
        <ToysSection />
        <WhyUsSection />
        <AboutSection />
        <InstagramSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      {/* WhatsApp float */}
      <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1000, background: "#25D366", color: "white", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "scale(1.12)"; el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.55)"; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "scale(1)"; el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)"; }}>
        <WhatsAppIcon size={28} color="white" />
      </a>
    </div>
  );
}
