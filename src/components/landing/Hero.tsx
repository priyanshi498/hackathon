import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function Hero() {
  const title = "NexTerra Orbit";
  const letters = Array.from(title);

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 bg-orbit-gradient" />

      {/* Orbit rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        {[420, 600, 820, 1040].map((size, i) => (
          <motion.div
            key={size}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: i % 2 ? -360 : 360, opacity: 1 }}
            transition={{
              rotate: { duration: 40 + i * 12, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1.2, delay: i * 0.15 },
            }}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
            }}
          >
            <span
              className="absolute h-2 w-2 rounded-full bg-primary shadow-glow"
              style={{ top: -4, left: size / 2 - 4 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Edition 01 · 27 Jul → 29 Aug
        </motion.div>

        <h1 className="text-center font-mono text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="block">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-2 block text-primary text-glow"
          >
            Hackathon
          </motion.span>
        </h1>

        {/* TAGLINE: replace this placeholder text with your final tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-8 max-w-2xl text-center font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          {"// tagline coming soon — add yours here"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="font-mono text-xs uppercase tracking-wider shadow-glow">
            <a href="#register">
              Register Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/40 bg-transparent font-mono text-xs uppercase tracking-wider text-foreground hover:bg-primary/10"
          >
            <a href="#timeline">
              <Calendar className="mr-2 h-4 w-4" /> View Timeline
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-border/40 rounded-xl border border-border/40 bg-card/40 backdrop-blur"
        >
          {[
            { k: "Rounds", v: "03" },
            { k: "Duration", v: "34 Days" },
            { k: "Status", v: "Open" },
          ].map((stat) => (
            <div key={stat.k} className="px-4 py-5 text-center">
              <div className="font-mono text-2xl font-bold text-primary sm:text-3xl">{stat.v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.k}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
