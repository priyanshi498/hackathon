import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Timeline } from "@/components/landing/Timeline";
import { Results } from "@/components/landing/Results";
import { Footer } from "@/components/landing/Footer";
import { Registration } from "@/components/landing/Registration";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexTerra Orbit Hackathon — Build the Future" },
      {
        name: "description",
        content:
          "Three rounds, thirty-four days, one orbit. Join the NexTerra Orbit Hackathon: 27 Jul – 29 Aug.",
      },
      { property: "og:title", content: "NexTerra Orbit Hackathon" },
      {
        property: "og:description",
        content: "Three rounds. One orbit. Build the future at NexTerra Orbit Hackathon.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Timeline />
      <Results />
      <Registration />
      <Footer />
    </main>
  );
}
