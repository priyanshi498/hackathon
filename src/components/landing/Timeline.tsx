import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Radio } from "lucide-react";

type Status = "done" | "live" | "upcoming";

const MILESTONES: {
  code: string;
  date: string;
  title: string;
  description: string;
  status: Status;
}[] = [
  {
    code: "M_01",
    date: "27 Jul — 4 Aug",
    title: "Round 1 · Idea Submission",
    description:
      "Form your team and submit your initial concept. Pitch the problem, your angle, and the impact.",
    status: "upcoming",
  },
  {
    code: "M_02",
    date: "8 Aug",
    title: "Round 1 · Results",
    description: "Shortlisted teams are announced and invited into the build phase.",
    status: "upcoming",
  },
  {
    code: "M_03",
    date: "8 Aug — 18 Aug",
    title: "Round 2 · Build Sprint",
    description:
      "Ten days to ship a working prototype. Mentor office hours, async reviews, and weekly check-ins.",
    status: "upcoming",
  },
  {
    code: "M_04",
    date: "20 Aug",
    title: "Round 2 · Results",
    description: "Finalists announced and matched with judging panels for the closing round.",
    status: "upcoming",
  },
  {
    code: "M_05",
    date: "29 Aug",
    title: "Final Round · Demo Day",
    description: "Live demos, jury Q&A, and the announcement of the Orbit champions.",
    status: "upcoming",
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-primary" />;
  if (status === "live") return <Radio className="h-4 w-4 animate-pulse text-primary" />;
  return <Circle className="h-4 w-4 text-muted-foreground" />;
}

function StatusBadge({ status }: { status: Status }) {
  const map = {
    done: { label: "Completed", cls: "border-primary/30 bg-primary/10 text-primary" },
    live: { label: "Live", cls: "border-primary/50 bg-primary/20 text-primary" },
    upcoming: { label: "Upcoming", cls: "border-border bg-muted/30 text-muted-foreground" },
  } as const;
  const s = map[status];
  return (
    <Badge variant="outline" className={`font-mono text-[10px] uppercase tracking-widest ${s.cls}`}>
      {s.label}
    </Badge>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            [ THE_ORBIT ]
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            From Launchpad to Landing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Five checkpoints across thirty-four days. One mission: ship something that matters.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {MILESTONES.map((m, idx) => {
              const alignRight = idx % 2 === 1;
              return (
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Node */}
                  <div className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-primary/30 animate-ping" />
                      <span className="h-3 w-3 rounded-full bg-primary shadow-glow" />
                    </div>
                  </div>

                  <div className={alignRight ? "md:col-start-2" : ""}>
                    <div
                      className={`ml-10 rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40 md:ml-0 ${
                        alignRight ? "md:ml-8" : "md:mr-8 md:text-right"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 ${alignRight ? "" : "md:justify-end"}`}
                      >
                        <StatusIcon status={m.status} />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {m.code} · {m.date}
                        </span>
                      </div>
                      <h3 className="mt-3 font-mono text-xl font-bold text-foreground">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {m.description}
                      </p>
                      <div className={`mt-4 flex ${alignRight ? "" : "md:justify-end"}`}>
                        <StatusBadge status={m.status} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
