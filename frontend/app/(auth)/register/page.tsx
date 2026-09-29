"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, Building2 } from "lucide-react";

export default function RegisterPage() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    slug: string;
    host: string;
    message: string;
  } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/platform/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim().toLowerCase(),
          name: name.trim(),
          admin_email: adminEmail.trim().toLowerCase(),
        }),
      });
      const payload = (await response.json()) as {
        detail?: string | Array<{ msg?: string }>;
        organization?: { slug?: string; primary_host?: string | null };
        message?: string;
      };
      if (!response.ok) {
        const detail = payload.detail;
        const message =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((item) => item.msg || JSON.stringify(item)).join("; ")
              : "Unable to provision organization.";
        setError(message);
        return;
      }
      setSuccess({
        slug: payload.organization?.slug || slug,
        host: payload.organization?.primary_host || `${slug}.raushni.com`,
        message: payload.message || "Tenant provisioned.",
      });
    } catch {
      setError("Network error while provisioning tenant.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-4 py-12 text-white">
      <section className="w-full max-w-lg rounded-2xl border border-white/10 bg-stone-900 p-6 shadow-xl sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-stone-950">
            <Building2 size={22} aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
              SaaS onboarding
            </p>
            <h1 className="text-2xl font-black">Start your organization</h1>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/70">
          Provision a multi-tenant NGO workspace with its own slug, admin membership,
          and platform settings. CMS content can be seeded afterward for your tenantSlug.
        </p>

        {success ? (
          <div className="mt-6 space-y-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-semibold">Organization created: {success.slug}</p>
            <p>{success.message}</p>
            <p>
              Host target: <span className="font-mono text-amber-200">{success.host}</span>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-stone-950"
              >
                Continue to login
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/platform"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-semibold"
              >
                Back to platform
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              Organization name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm outline-none focus:border-amber-400"
                placeholder="Acme Educational Trust"
              />
            </label>
            <label className="block text-sm font-semibold">
              Tenant slug
              <input
                value={slug}
                onChange={(event) => setSlug(event.target.value.toLowerCase())}
                required
                minLength={2}
                pattern="[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?"
                className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 font-mono text-sm outline-none focus:border-amber-400"
                placeholder="acme-trust"
              />
              <span className="mt-1 block text-xs font-normal text-white/45">
                Becomes {slug || "your-slug"}.raushni.com
              </span>
            </label>
            <label className="block text-sm font-semibold">
              Admin email
              <input
                type="email"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                required
                className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm outline-none focus:border-amber-400"
                placeholder="admin@acme.org"
              />
            </label>

            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-4 text-sm font-bold text-stone-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300"
            >
              {submitting ? "Provisioning…" : "Create tenant"}
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-white/45">
          Already have a tenant?{" "}
          <Link href="/login" className="font-semibold text-amber-300 hover:text-amber-200">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
