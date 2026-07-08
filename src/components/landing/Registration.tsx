import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255, "Email too long"),
  teamName: z
    .string()
    .trim()
    .min(2, "Team name is required")
    .max(60, "Team name too long"),
  teamSize: z.enum(["1", "2", "3", "4"], {
    message: "Select a team size",
  }),
  track: z.enum(["ai", "web3", "climate", "open"], {
    message: "Pick a track",
  }),
  idea: z
    .string()
    .trim()
    .min(20, "Tell us at least 20 characters about your idea")
    .max(500, "Keep it under 500 characters"),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const initial: Record<keyof FormValues, string> = {
  fullName: "",
  email: "",
  teamName: "",
  teamSize: "",
  track: "",
  idea: "",
};

export function Registration() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = (key: keyof FormValues, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="register" className="relative border-t border-border/40 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            [ REGISTER_04 ]
          </span>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lock in your orbit slot
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Submissions open until 27 July. Spin up your team, pick a track, drop your idea.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 shadow-glow backdrop-blur sm:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-5 font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                You're in orbit, {values.fullName.split(" ")[0]}!
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                A confirmation has been queued for{" "}
                <span className="font-mono text-primary">{values.email}</span>. Team{" "}
                <span className="font-mono text-foreground">{values.teamName}</span> is
                registered for Round 1.
              </p>
              <Button
                onClick={reset}
                variant="outline"
                className="mt-6 font-mono text-xs uppercase tracking-wider"
              >
                Register another team
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <Field
                label="Full name"
                error={errors.fullName}
                className="sm:col-span-1"
              >
                <Input
                  value={values.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Ada Lovelace"
                  maxLength={80}
                  aria-invalid={!!errors.fullName}
                />
              </Field>

              <Field label="Email" error={errors.email} className="sm:col-span-1">
                <Input
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@domain.com"
                  maxLength={255}
                  aria-invalid={!!errors.email}
                />
              </Field>

              <Field label="Team name" error={errors.teamName} className="sm:col-span-1">
                <Input
                  value={values.teamName}
                  onChange={(e) => update("teamName", e.target.value)}
                  placeholder="Orbital Foxes"
                  maxLength={60}
                  aria-invalid={!!errors.teamName}
                />
              </Field>

              <Field label="Team size" error={errors.teamSize} className="sm:col-span-1">
                <Select
                  value={values.teamSize}
                  onValueChange={(v) => update("teamSize", v)}
                >
                  <SelectTrigger aria-invalid={!!errors.teamSize}>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo</SelectItem>
                    <SelectItem value="2">2 members</SelectItem>
                    <SelectItem value="3">3 members</SelectItem>
                    <SelectItem value="4">4 members</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Track" error={errors.track} className="sm:col-span-2">
                <Select
                  value={values.track}
                  onValueChange={(v) => update("track", v)}
                >
                  <SelectTrigger aria-invalid={!!errors.track}>
                    <SelectValue placeholder="Choose your track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI &amp; Agents</SelectItem>
                    <SelectItem value="web3">Web3 &amp; Infra</SelectItem>
                    <SelectItem value="climate">Climate Tech</SelectItem>
                    <SelectItem value="open">Open Innovation</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field
                label="Idea pitch"
                error={errors.idea}
                hint={`${values.idea.length}/500`}
                className="sm:col-span-2"
              >
                <Textarea
                  value={values.idea}
                  onChange={(e) => update("idea", e.target.value)}
                  placeholder="In a sentence or two — what are you building?"
                  rows={4}
                  maxLength={500}
                  aria-invalid={!!errors.idea}
                />
              </Field>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full font-mono text-xs uppercase tracking-wider shadow-glow"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Launching…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" /> Submit registration
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  By registering you agree to the NexTerra Orbit code of conduct.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between">
        <Label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </Label>
        {hint && (
          <span className="font-mono text-[10px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[11px] text-destructive">{error}</p>
      )}
    </div>
  );
}
