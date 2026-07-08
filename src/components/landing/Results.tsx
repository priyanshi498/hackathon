import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";

const PODIUM = [
  { place: "1st", icon: Trophy, label: "Champion" },
  { place: "2nd", icon: Medal, label: "Runner-up" },
  { place: "3rd", icon: Award, label: "Third Place" },
];

const ROUND_1_TEAMS = [
  "Team Orbit",
  "Nova Grid",
  "Code Tide",
  "Quantum Loop",
  "Skyframe",
  "Pulse Stack",
  "Neon Forge",
  "Astra Hive",
];

const ROUND_2_TEAMS = [
  "Vertex Crew",
  "Lunar Shift",
  "Binary Bloom",
  "Core Relay",
  "Signal Nest",
  "Echo Drift",
  "Flux Foundry",
  "Mint Circuit",
];

function PodiumGrid({ announceDate }: { announceDate: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PODIUM.map((p, i) => (
        <Card
          key={p.place}
          className={`relative overflow-hidden border-border/60 bg-card/60 p-4 backdrop-blur sm:p-6 ${
            i === 0 ? "sm:-translate-y-2 sm:border-primary/40" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {p.place}
            </span>
            <p.icon className={`h-5 w-5 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div className="mt-6 font-mono text-2xl font-bold text-foreground">TBA</div>
          <div className="mt-1 text-sm text-muted-foreground">{p.label}</div>
          <div className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary/80">
            <Sparkles className="h-3 w-3" /> {announceDate}
          </div>
        </Card>
      ))}
    </div>
  );
}

function TeamGrid({ teams, announceDate }: { teams: string[]; announceDate: string }) {
  return (
    <Card className="border-border/60 bg-card/60 p-4 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Shortlisted teams
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Compact view for rounds with many selections.
          </div>
        </div>
        <div className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary/80">
          <Sparkles className="h-3 w-3" /> {announceDate}
        </div>
      </div>

      <div className="mt-4 max-h-72 overflow-y-auto pr-1 sm:max-h-80">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team}
              className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm"
            >
              {team}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function Results() {
  return (
    <section id="results" className="relative py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            [ RESULTS_FEED ]
          </div>
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Results &amp; Announcements
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Live updates land here as each round closes. Bookmark this section.
          </p>
        </motion.div>

        <Tabs defaultValue="r1" className="w-full">
          <TabsList className="mx-auto mb-8 grid h-auto w-full max-w-md grid-cols-3 gap-1 bg-card/60 p-1 backdrop-blur sm:mb-10">
            <TabsTrigger value="r1" className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.15em] sm:text-xs sm:tracking-wider">
              Round 1
            </TabsTrigger>
            <TabsTrigger value="r2" className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.15em] sm:text-xs sm:tracking-wider">
              Round 2
            </TabsTrigger>
            <TabsTrigger value="final" className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.15em] sm:text-xs sm:tracking-wider">
              Finals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="r1">
            <div className="mb-6 flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-center">
              <h3 className="font-mono text-lg font-bold text-foreground">Round 1 · Shortlist</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Announces 8 Aug
              </span>
            </div>
            <TeamGrid teams={ROUND_1_TEAMS} announceDate="8 Aug" />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Awaiting announcement. Shortlisted teams will be listed here in a compact grid.
            </p>
          </TabsContent>

          <TabsContent value="r2">
            <div className="mb-6 flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-center">
              <h3 className="font-mono text-lg font-bold text-foreground">Round 2 · Finalists</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Announces 20 Aug
              </span>
            </div>
            <TeamGrid teams={ROUND_2_TEAMS} announceDate="20 Aug" />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Awaiting announcement. Finalists will appear as team-name boxes instead of large cards.
            </p>
          </TabsContent>

          <TabsContent value="final">
            <div className="mb-6 flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-center">
              <h3 className="font-mono text-lg font-bold text-foreground">Finals · Champions</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Announces 29 Aug
              </span>
            </div>
            <PodiumGrid announceDate="29 Aug" />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Awaiting announcement. Champions will be revealed live on Demo Day.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
