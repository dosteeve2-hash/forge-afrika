'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Zap, Globe, TrendingUp, ChevronDown } from 'lucide-react'
import { FILIALES_FORGE, PHASES_ROADMAP } from '@/lib/constants'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

/* ── Constants ─────────────────────────────────────────── */
const NB_SECTEURS = new Set(FILIALES_FORGE.map(f => f.categorie)).size
const NB_ACTIVES  = FILIALES_FORGE.filter(f => f.statut === 'Actif').length

const STATS = [
  { label: 'Filiales lancées',   value: FILIALES_FORGE.length, suffix: '' },
  { label: 'En production',      value: NB_ACTIVES,            suffix: '' },
  { label: 'Secteurs couverts',  value: NB_SECTEURS,           suffix: '' },
  { label: 'Année de fondation', value: 2026,                  suffix: '' },
]

const FEATURES = [
  { icon: Zap,         title: 'Technologie Native',    color: '#D4AF37',
    desc: 'Chaque filiale est un SaaS construit pour les marchés africains dès le premier jour — pas une adaptation.' },
  { icon: Globe,       title: 'Expansion Systématique', color: '#00D4FF',
    desc: 'BF → UEMOA → CEDEAO → Continent. Chaque marché conquis devient la base du suivant.' },
  { icon: TrendingUp,  title: 'Monopole Sectoriel',    color: '#22c55e',
    desc: 'Une filiale, un secteur, un marché. Domination verticale, scalabilité horizontale.' },
]

const PARTICLES_CFG = Array.from({ length: 28 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  delay: Math.random() * 4, size: 3 + Math.random() * 10,
}))

/* ── Particle ──────────────────────────────────────────── */
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size,
        background: `radial-gradient(circle, rgba(212,175,55,0.55) 0%, transparent 70%)` }}
      animate={{ y: [0, -28, 0], opacity: [0.15, 0.65, 0.15], scale: [1, 1.35, 1] }}
      transition={{ duration: 4 + Math.random() * 4, delay, repeat: Infinity, ease: 'easeInOut', type: 'tween' }} />
  )
}

/* ── CountUp ───────────────────────────────────────────── */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref  = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let v = 0; const inc = target / (1500 / 16)
    const t = setInterval(() => {
      v += inc
      if (v >= target) { setCount(target); clearInterval(t) } else setCount(Math.floor(v))
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── EcosystemMap ──────────────────────────────────────── */
function EcosystemMap() {
  const total = FILIALES_FORGE.length
  const radius = 40
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {FILIALES_FORGE.map((f, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2
          const x = 50 + radius * Math.cos(angle), y = 50 + radius * Math.sin(angle)
          return (
            <motion.line key={f.slug} x1="50" y1="50" x2={x} y2={y}
              stroke={f.couleur} strokeWidth="0.28" strokeOpacity="0"
              animate={{ strokeOpacity: 0.45 }}
              transition={{ delay: i * 0.07, duration: 0.7 }} />
          )
        })}
        {/* Outer ring */}
        <motion.circle cx="50" cy="50" r={radius} fill="none"
          stroke="rgba(212,175,55,0.12)" strokeWidth="0.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }} />
      </svg>
      {/* Hub */}
      <motion.div className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '22%', aspectRatio: '1',
          background: 'linear-gradient(135deg, #D4AF37, #F5D76E)',
          boxShadow: '0 0 80px rgba(212,175,55,0.55), 0 0 160px rgba(212,175,55,0.2)' }}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, delay: 0.3 }}>
        <span style={{ color: '#0A1628', fontSize: 'clamp(0.5rem,1.8vw,0.85rem)', fontWeight: 900, lineHeight: 1.2 }}>
          FORGE<br />AFRIKA
        </span>
      </motion.div>

      {/* Filiale nodes */}
      {FILIALES_FORGE.map((f, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2
        const x = 50 + radius * Math.cos(angle), y = 50 + radius * Math.sin(angle)
        return (
          <motion.a key={f.slug} href={f.url !== '#' ? f.url : '/ecosystem'}
            target={f.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
            className="absolute flex flex-col items-center gap-1 group"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: 64 }}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.05, type: 'spring' }}
            whileHover={{ scale: 1.25 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all"
              style={{ background: '#0c1a34', border: `2px solid ${f.couleur}`,
                boxShadow: `0 0 14px ${f.couleur}45` }}>
              {f.icon}
            </div>
            <span className="text-[9px] text-center leading-tight text-gray-500 group-hover:text-white transition-colors">
              {f.nom}
            </span>
          </motion.a>
        )
      })}
    </div>
  )
}

/* ── RoadmapPhase ──────────────────────────────────────── */
function RoadmapPhase({ phase, index }: { phase: typeof PHASES_ROADMAP[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const done = phase.milestones.filter(m => m.done).length
  const pct  = Math.round((done / phase.milestones.length) * 100)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring' }}
      className="relative p-6 rounded-2xl border overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${pct===100?'#22c55e':'#D4AF37'}, transparent)` }} />
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-3xl">{phase.icon}</span>
          <p className="text-xs font-bold mt-1 uppercase tracking-widest" style={{ color: '#D4AF37' }}>
            Phase {phase.phase} · {phase.annee}
          </p>
          <h3 className="font-bold text-white text-lg mt-0.5">{phase.titre}</h3>
        </div>
        <div className="text-right shrink-0 ml-4">
          <div className="text-3xl font-black" style={{ color: pct === 100 ? '#22c55e' : '#D4AF37' }}>{pct}%</div>
          <div className="text-xs text-gray-600">complété</div>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">{phase.description}</p>
      <div className="space-y-1.5">
        {phase.milestones.map((m, mi) => (
          <div key={mi} className="flex items-center gap-2.5 text-sm">
            <span className="text-base" style={{ color: m.done ? '#22c55e' : 'rgba(255,255,255,0.15)' }}>
              {m.done ? '✓' : '○'}
            </span>
            <span style={{ color: m.done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── PAGE ──────────────────────────────────────────────── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const heroRef     = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const filialesRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  /* GSAP: hero title char-by-char */
  useEffect(() => {
    if (!mounted || !titleRef.current) return
    const chars = titleRef.current.querySelectorAll<HTMLSpanElement>('.char')
    if (!chars.length) return
    gsap.fromTo(chars,
      { y: 90, opacity: 0, rotateX: -70, transformOrigin: 'center bottom' },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.045, duration: 0.85,
        ease: 'back.out(1.5)', delay: 0.4 }
    )
  }, [mounted])

  /* GSAP ScrollTrigger: filiales stagger */
  useEffect(() => {
    if (!filialesRef.current) return
    const cards = filialesRef.current.querySelectorAll<HTMLDivElement>('.filiale-card')
    gsap.fromTo(cards,
      { y: 55, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.065, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: filialesRef.current, start: 'top 78%', once: true } }
    )
  }, [mounted])

  const TITLE = 'FORGE Afrika'

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: '#0A1628' }}>

      {/* ── NAV ── */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: 'rgba(10,22,40,0.82)', backdropFilter: 'blur(24px) saturate(1.8)',
          borderBottom: '1px solid rgba(212,175,55,0.12)' }}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-xl"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', color: '#0A1628',
              boxShadow: '0 0 20px rgba(212,175,55,0.35)' }}>F</div>
          <span className="font-black text-white tracking-tight">FORGE Afrika</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {[['Filiales','#filiales'],['Écosystème','#ecosystem'],['Roadmap','#roadmap'],['Vision','#vision']].map(([l,h]) => (
            <a key={l} href={h} className="text-gray-400 hover:text-white transition-colors font-medium">{l}</a>
          ))}
        </div>
        <Link href="/dashboard"
          className="text-sm px-4 py-2 rounded-lg font-bold transition-all hover:scale-105 hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', color: '#0A1628',
            boxShadow: '0 0 20px rgba(212,175,55,0.25)' }}>
          Accéder au QG
        </Link>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px' }} />
        {/* Glow radial */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 38%, rgba(212,175,55,0.09) 0%, transparent 70%)' }} />
        {/* Cyan accent glow bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && PARTICLES_CFG.map(p => <Particle key={p.id} {...p} />)}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold mb-10 uppercase tracking-widest"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)', color: '#00D4FF' }}>
            🏛️ Entreprise Mère · Groupe Panafricain · Burkina Faso
          </motion.div>

          {/* Title — GSAP char-by-char */}
          <h1 ref={titleRef} className="font-black mb-6 leading-none" aria-label={TITLE}
            style={{ fontSize: 'clamp(3.2rem, 9vw, 7rem)', perspective: '800px', display: 'block' }}>
            {TITLE.split('').map((char, i) => (
              <span key={i} className="char inline-block"
                style={{ color: 'transparent', opacity: 0,
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F5D76E 45%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  minWidth: char === ' ' ? '0.35em' : undefined }}>
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}>
            L'écosystème technologique des entreprises africaines du futur
          </motion.p>

          {/* Quote */}
          <motion.blockquote className="text-sm italic max-w-xl mx-auto mb-12 text-left"
            style={{ color: 'rgba(255,255,255,0.38)', borderLeft: '3px solid rgba(212,175,55,0.6)', paddingLeft: '1.25rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.7 }}>
            « Nous ne construisons pas des outils. Nous forgeons l'Afrique. »
          </motion.blockquote>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35, type: 'spring' }}>
            <a href="#filiales"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', color: '#0A1628',
                boxShadow: '0 0 50px rgba(212,175,55,0.35)' }}>
              Découvrir les filiales <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border transition-all hover:scale-105"
              style={{ border: '1px solid rgba(212,175,55,0.38)', color: '#D4AF37', background: 'rgba(212,175,55,0.06)' }}>
              Accéder au QG →
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, type: 'tween' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-700">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-700" />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 px-4"
        style={{ background: 'rgba(212,175,55,0.03)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring' }} viewport={{ once: true }}>
              <div className="text-5xl md:text-6xl font-black mb-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-500 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] font-bold mb-4 block" style={{ color: '#D4AF37' }}>
              Notre Approche
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Pourquoi FORGE Afrika ?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Une stratégie de conquête sectorielle — pas un outil généraliste.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                className="relative p-8 rounded-2xl border group overflow-hidden cursor-default"
                style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }} viewport={{ once: true }}
                whileHover={{ y: -6, borderColor: f.color, boxShadow: `0 20px 60px ${f.color}18` }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-80" style={{ background: f.color }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${f.color}0a, transparent 65%)` }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative"
                  style={{ background: `${f.color}15` }}>
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed relative">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILIALES ── */}
      <section id="filiales" className="py-24 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] font-bold mb-4 block" style={{ color: '#D4AF37' }}>
              L'Arsenal
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Nos {FILIALES_FORGE.length} Filiales
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Chacune souveraine sur son secteur. Toutes connectées au QG.
            </p>
          </motion.div>

          <div ref={filialesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FILIALES_FORGE.map((f) => (
              <motion.div key={f.slug}
                className="filiale-card relative rounded-xl p-5 border group overflow-hidden cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.028)', borderColor: 'rgba(255,255,255,0.07)', opacity: 0 }}
                whileHover={{ y: -7, borderColor: f.couleur, boxShadow: `0 24px 70px ${f.couleur}22` }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: f.couleur }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${f.couleur}08, transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white text-sm">{f.nom}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full ml-2 shrink-0 font-semibold"
                      style={{ background: f.statut === 'Actif' ? 'rgba(34,197,94,0.15)' : 'rgba(212,175,55,0.12)',
                        color: f.statut === 'Actif' ? '#22C55E' : '#D4AF37' }}>
                      {f.statut === 'Actif' ? '● Actif' : '◎ Dev'}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold mb-3 uppercase tracking-widest" style={{ color: f.couleur }}>
                    {f.categorie}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.description}</p>
                  {f.url !== '#' ? (
                    <a href={f.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-all group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.38)' }}>
                      <ExternalLink className="w-3 h-3" /> Voir le site
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>En développement</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] font-bold mb-4 block" style={{ color: '#00D4FF' }}>
              Carte de l'Écosystème
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">La Constellation</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              FORGE Afrika au centre. Chaque filiale, un satellite autonome.
            </p>
          </motion.div>
          <EcosystemMap />
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-24 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] font-bold mb-4 block" style={{ color: '#D4AF37' }}>
              La Stratégie
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Roadmap 2026–2030</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Production → Expansion → Consolidation → Monopole Panafricain.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES_ROADMAP.map((p, i) => <RoadmapPhase key={p.phase} phase={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.35em] font-bold mb-4 block" style={{ color: '#D4AF37' }}>
              Le Manifeste
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Notre Vision</h2>
          </motion.div>
          <motion.div className="rounded-2xl p-8 md:p-14 space-y-6 text-gray-300 leading-relaxed text-lg"
            style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.16)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}>
            <p>
              L'Afrique n'a pas besoin d'un outil de plus. Elle a besoin d'une{' '}
              <strong style={{ color: '#D4AF37' }}>infrastructure</strong> — des fondations technologiques
              que ses propres entrepreneurs construisent, possèdent et gouvernent.
            </p>
            <p>
              FORGE Afrika n'est pas une startup. C'est une{' '}
              <strong style={{ color: '#D4AF37' }}>entreprise mère</strong> : chaque filiale résout un
              problème réel dans un secteur réel. Chacune est autonome. Toutes sont connectées.
            </p>
            <p>
              À la manière des grands conglomérats qui ont bâti les économies occidentales, FORGE Afrika
              ambitionne de devenir{' '}
              <strong style={{ color: '#D4AF37' }}>l'infrastructure économique critique</strong> de l'Afrique
              de l'Ouest — puis du continent.
            </p>
            <p className="italic text-base" style={{ color: '#00D4FF' }}>
              Le Burkina Faso comme point de départ. L'Afrique comme terrain de jeu. Un siècle comme horizon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }} viewport={{ once: true }}
            className="relative rounded-3xl p-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,212,255,0.05))',
              border: '1px solid rgba(212,175,55,0.22)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative">Rejoindre l'Écosystème</h2>
            <p className="text-gray-400 text-lg mb-8 relative max-w-xl mx-auto">
              Accédez au QG central pour piloter tous les projets depuis un seul tableau de bord.
            </p>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 relative"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', color: '#0A1628',
                boxShadow: '0 0 60px rgba(212,175,55,0.4)' }}>
              Accéder au QG <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-4" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', color: '#0A1628' }}>F</div>
              <span className="font-black text-white text-xl">FORGE Afrika</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              L'écosystème technologique panafricain.<br />Burkina Faso · UEMOA · Continent.
            </p>
            <p className="text-gray-700 text-xs mt-3">© 2026 FORGE Afrika · Tous droits réservés</p>
          </div>
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-center text-[10px] uppercase tracking-widest mb-5 text-gray-700">Toutes les filiales</p>
            <div className="flex flex-wrap justify-center gap-2">
              {FILIALES_FORGE.map(f => (
                <a key={f.slug} href={f.url !== '#' ? f.url : '/ecosystem'}
                  target={f.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: `${f.couleur}12`, color: f.couleur, border: `1px solid ${f.couleur}28` }}>
                  {f.icon} {f.nom}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
