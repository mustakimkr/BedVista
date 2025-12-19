"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Home() {
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const disabled = state === "submitting";

  const placeholder =
    "I saw the domain and wondered what’s here. (Add your own reason.)";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanReason = reason.trim();

    if (!cleanReason) {
      setMessage("Please drop a quick note before sending.");
      setState("error");
      return;
    }

    setState("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/why", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cleanReason, contact }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setState("error");
        setMessage(
          data?.error ??
            "We couldn’t send that just now. Please try again in a moment.",
        );
        return;
      }

      setState("success");
      setMessage("Thanks for telling us. We’ll read every note.");
      setReason("");
      setContact("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="aurora-veil" aria-hidden />
      <div className="glow-grid" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center blur-[110px]">
        <div className="h-56 w-96 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04),rgba(255,255,255,0.18))] animate-gradient" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-12 sm:py-16">
        <header className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">BedVista</div>
          <div className="text-sm text-zinc-500">bedvista.com</div>
        </header>

        <main className="mt-12 grid flex-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              We&apos;re just curious
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Why are you here?
              </h1>
              <p className="max-w-2xl text-lg text-zinc-400">
                BedVista is taking shape. Before we tell you more, we want to
                know why you landed on this page. Drop a line below — it goes
                straight to our inbox.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_45%)] animate-slow-pulse" />
                </div>
                <p className="font-semibold text-white">We read every note</p>
                <p className="mt-1 text-zinc-400">
                  Your words aren&apos;t disappearing into a void. They help us
                  decide what to build.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_45%)] animate-slow-pulse" />
                </div>
                <p className="font-semibold text-white">Minimal + private</p>
                <p className="mt-1 text-zinc-400">
                  Just a single message box. No trackers, no fluff — black and
                  white, like the rest of this page.
                </p>
              </div>
            </div>
          </section>

          <section className="relative">
            <form
              className="relative space-y-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur"
              onSubmit={handleSubmit}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-[-1px] bg-[linear-gradient(120deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04),rgba(255,255,255,0.16))] opacity-60 animate-gradient" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.12),transparent_50%)] blur-2xl opacity-70 animate-slow-pulse" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">What brought you here?</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  required
                  minLength={4}
                  maxLength={600}
                  value={reason}
                  placeholder={placeholder}
                  onChange={(event) => setReason(event.target.value)}
                  disabled={disabled}
                />
                <p className="text-xs text-zinc-500">
                  A sentence or two is perfect.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">
                  How can we reply? (optional)
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  disabled={disabled}
                />
                <p className="text-xs text-zinc-500">
                  We&apos;ll only use this to respond to your note.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={disabled}
                >
                  {state === "submitting" ? "Sending..." : "Send it"}
                </Button>
                <div className="hidden text-xs text-zinc-500 sm:block">
                  Uses Resend + React Email
                </div>
              </div>

              {message && (
                <div
                  role="status"
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    state === "success"
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-red-500/40 bg-red-500/10 text-red-200"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </section>
        </main>

        <footer className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-zinc-500">
          <span>BedVista · quietly built in black & white</span>
          <span className="hidden sm:inline">No spam. Just curiosity.</span>
        </footer>
      </div>
    </div>
  );
}
