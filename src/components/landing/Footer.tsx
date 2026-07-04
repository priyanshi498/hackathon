import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="sponsors" className="border-t border-border/40 bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/40">
              <Rocket className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-foreground">NEXTERRA_ORBIT</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Hackathon · Edition 01
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#timeline" className="hover:text-primary">Timeline</a>
            <a href="#results" className="hover:text-primary">Results</a>
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <a href="#register" className="hover:text-primary">Register</a>
          </nav>

          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} NexTerra Orbit Hackathon. All rights reserved.</span>
          <span className="font-mono uppercase tracking-widest">Powered by NexTerra</span>
        </div>
      </div>
    </footer>
  );
}
