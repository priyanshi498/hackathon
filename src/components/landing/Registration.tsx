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
  member1Name: z.string().trim().max(80, "Name too long"),
  member1Gender: z.enum(["male", "female", "other", ""]),
  member2Name: z.string().trim().max(80, "Name too long"),
  member2Gender: z.enum(["male", "female", "other", ""]),
  member3Name: z.string().trim().max(80, "Name too long"),
  member3Gender: z.enum(["male", "female", "other", ""]),
  member4Name: z.string().trim().max(80, "Name too long"),
  member4Gender: z.enum(["male", "female", "other", ""]),
  teamName: z
    .string()
    .trim()
    .min(2, "Team name is required")
    .max(60, "Team name too long"),
  college: z
    .string()
    .trim()
    .min(2, "College is required")
    .max(120, "College name too long"),
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
  member1Name: "",
  member1Gender: "",
  member2Name: "",
  member2Gender: "",
  member3Name: "",
  member3Gender: "",
  member4Name: "",
  member4Gender: "",
  teamName: "",
  college: "",
  teamSize: "",
  track: "",
  idea: "",
};

const MEMBER_FIELDS = [
  { number: 1, nameKey: "member1Name", genderKey: "member1Gender" },
  { number: 2, nameKey: "member2Name", genderKey: "member2Gender" },
  { number: 3, nameKey: "member3Name", genderKey: "member3Gender" },
  { number: 4, nameKey: "member4Name", genderKey: "member4Gender" },
] as const;

const STEPS = [
  { title: "Team Information", fields: ["teamName", "teamSize", "track", "college"] as const },
  {
    title: "Team Members",
    fields: [
      "member1Name",
      "member1Gender",
      "member2Name",
      "member2Gender",
      "member3Name",
      "member3Gender",
      "member4Name",
      "member4Gender",
    ] as const,
  },
  { title: "Contact & Idea", fields: ["fullName", "email", "idea"] as const },
  { title: "Review & Submit", fields: [] as const },
] as const;

export function Registration() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [step, setStep] = useState(0);
  const [submitArmed, setSubmitArmed] = useState(false);

  const update = (key: keyof FormValues, val: string) => {
    if (key === "teamSize") {
      const size = Math.max(0, Math.min(4, Number(val) || 0));
      setValues((v) => {
        const next = { ...v, teamSize: val };
        for (const member of MEMBER_FIELDS.slice(size)) {
          next[member.nameKey] = "";
          next[member.genderKey] = "";
        }
        return next;
      });

      setErrors((prev) => {
        const next = { ...prev };
        for (const member of MEMBER_FIELDS.slice(size)) {
          next[member.nameKey] = undefined;
          next[member.genderKey] = undefined;
        }
        return next;
      });
      return;
    }

    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const getSelectedMemberCount = () => Math.max(0, Math.min(4, Number(values.teamSize) || 0));

  const validateSelectedMembers = () => {
    const count = getSelectedMemberCount();
    const selected = MEMBER_FIELDS.slice(0, count);
    const memberErrors: Errors = {};

    for (const member of selected) {
      const nameValue = values[member.nameKey].trim();
      if (nameValue.length < 2) {
        memberErrors[member.nameKey] = `Member ${member.number} name is required`;
      }

      if (!values[member.genderKey]) {
        memberErrors[member.genderKey] = `Select gender for member ${member.number}`;
      }
    }

    const hasFemale = selected.some((member) => values[member.genderKey] === "female");
    if (!hasFemale && selected.length > 0) {
      memberErrors[selected[0].genderKey] = "At least one girl member is required in the team";
    }

    setErrors((prev) => {
      const next = { ...prev };
      for (const member of MEMBER_FIELDS) {
        next[member.nameKey] = undefined;
        next[member.genderKey] = undefined;
      }
      return { ...next, ...memberErrors };
    });

    return Object.keys(memberErrors).length === 0;
  };

  const validateFields = (fields: ReadonlyArray<keyof FormValues>) => {
    const parsed = schema.safeParse(values);

    if (parsed.success) {
      setErrors((prev) => {
        const next = { ...prev };
        for (const field of fields) {
          next[field] = undefined;
        }
        return next;
      });
      return true;
    }

    const stepErrors: Errors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof FormValues;
      if (fields.includes(field) && !stepErrors[field]) {
        stepErrors[field] = issue.message;
      }
    }

    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1) {
      if (!validateSelectedMembers()) return;
    } else {
      const fields = STEPS[step].fields;
      if (!validateFields(fields)) return;
    }

    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== STEPS.length - 1) return;
    if (!submitArmed) return;
    setSubmitArmed(false);

    if (!validateSelectedMembers()) {
      setStep(1);
      return;
    }

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
    setStep(0);
    setSubmitArmed(false);
  };

  const current = STEPS[step];
  const selectedMemberCount = getSelectedMemberCount();

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
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="rounded-lg border border-border/60 bg-background/30 px-4 py-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Step {step + 1} of {STEPS.length}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">-----------------</p>
                <h3 className="mt-2 font-mono text-lg font-bold text-foreground">{current.title}</h3>
              </div>

              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
                    <Select value={values.teamSize} onValueChange={(v) => update("teamSize", v)}>
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
                    <Select value={values.track} onValueChange={(v) => update("track", v)}>
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

                  <Field label="College" error={errors.college} className="sm:col-span-2">
                    <Input
                      value={values.college}
                      onChange={(e) => update("college", e.target.value)}
                      placeholder="Your college or university"
                      maxLength={120}
                      aria-invalid={!!errors.college}
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="sm:col-span-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                    Note: At least one girl member should be in the team.
                  </div>

                  {selectedMemberCount === 0 && (
                    <div className="sm:col-span-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      Select team size in Step 1 to enter member details.
                    </div>
                  )}

                  {MEMBER_FIELDS.slice(0, selectedMemberCount).map((member) => (
                    <div key={`member-${member.number}`} className="contents">
                      <Field
                        label={`Member ${member.number} Name`}
                        error={errors[member.nameKey]}
                        className="sm:col-span-1"
                      >
                        <Input
                          value={values[member.nameKey]}
                          onChange={(e) => update(member.nameKey, e.target.value)}
                          placeholder={`Member ${member.number} full name`}
                          maxLength={80}
                          aria-invalid={!!errors[member.nameKey]}
                        />
                      </Field>

                      <Field
                        label={`Member ${member.number} Gender`}
                        error={errors[member.genderKey]}
                        className="sm:col-span-1"
                      >
                        <Select
                          value={values[member.genderKey]}
                          onValueChange={(v) => update(member.genderKey, v)}
                        >
                          <SelectTrigger aria-invalid={!!errors[member.genderKey]}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field label="Full name" error={errors.fullName} className="sm:col-span-1">
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

                  <Field
                    label="Idea pitch"
                    error={errors.idea}
                    hint={`${values.idea.length}/500`}
                    className="sm:col-span-2"
                  >
                    <Textarea
                      value={values.idea}
                      onChange={(e) => update("idea", e.target.value)}
                      placeholder="In a sentence or two - what are you building?"
                      rows={5}
                      maxLength={500}
                      aria-invalid={!!errors.idea}
                    />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 rounded-xl border border-border/60 bg-background/30 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Review details before submit
                  </p>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <ReviewItem label="Team Name" value={values.teamName} />
                    <ReviewItem label="Team Size" value={values.teamSize} />
                    <ReviewItem label="Track" value={trackLabel(values.track)} />
                    <ReviewItem label="College" value={values.college} />
                    <ReviewItem label="Full Name" value={values.fullName} />
                    <ReviewItem label="Email" value={values.email} />
                    {MEMBER_FIELDS.slice(0, selectedMemberCount).map((member) => (
                      <ReviewItem
                        key={`review-${member.number}`}
                        label={`Member ${member.number}`}
                        value={`${values[member.nameKey]} (${genderLabel(values[member.genderKey])})`}
                      />
                    ))}
                    <div className="sm:col-span-2">
                      <ReviewItem label="Idea" value={values.idea} />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full font-mono text-xs uppercase tracking-wider sm:w-auto"
                  >
                    Back
                  </Button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full font-mono text-xs uppercase tracking-wider shadow-glow sm:w-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => setSubmitArmed(true)}
                    disabled={status === "submitting"}
                    className="w-full font-mono text-xs uppercase tracking-wider shadow-glow sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Launching...
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4" /> Submit registration
                      </>
                    )}
                  </Button>
                )}
              </div>

              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                By registering you agree to the NexTerra Orbit code of conduct.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-1 wrap-break-word text-foreground">{value || "-"}</p>
    </div>
  );
}

function trackLabel(track: string) {
  if (track === "ai") return "AI & Agents";
  if (track === "web3") return "Web3 & Infra";
  if (track === "climate") return "Climate Tech";
  if (track === "open") return "Open Innovation";
  return "-";
}

function genderLabel(gender: string) {
  if (gender === "male") return "Male";
  if (gender === "female") return "Female";
  if (gender === "other") return "Other";
  return "-";
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
