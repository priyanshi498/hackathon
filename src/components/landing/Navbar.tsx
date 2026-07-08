import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import isteLogo from "@/assets/iste_logo_1.png";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
  { label: "Sponsors", href: "#sponsors" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-hidden border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl min-w-0 items-center justify-between px-2 sm:h-16 sm:px-6 lg:px-8">
        <a href="#top" className="group flex min-w-0 flex-1 items-center gap-2 md:flex-none">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/40 sm:h-9 sm:w-9">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="absolute inset-0 rounded-md bg-primary/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </div>
          <div className="min-w-0 flex-col leading-none max-[360px]:hidden sm:flex">
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">NexTerra</span>
            <span className="truncate font-mono text-xs font-bold tracking-tight text-foreground sm:text-sm">ORBIT_HACK</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-3">
          <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary min-[381px]:flex sm:h-12 sm:w-12">
            <img
              src={isteLogo}
              alt="ISTE logo"
              className="h-full w-full rounded-full object-contain flex justify-center items-center"
            />
          </div>
          <div className="hidden md:block">
            <Button asChild className="font-mono text-xs uppercase tracking-wider shadow-glow">
              <a href="#register">Register →</a>
            </Button>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className="rounded-md p-1.5 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background/95 md:hidden">
          <div className="max-h-[calc(100vh-3.5rem)] space-y-1 overflow-y-auto px-3 py-3 sm:max-h-[calc(100vh-4rem)] sm:px-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:bg-secondary/40 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2 w-full font-mono text-xs uppercase tracking-wider">
              <a href="#register" onClick={() => setOpen(false)}>Register →</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
