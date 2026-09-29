import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Multi-tenant by design",
    text: "Each NGO gets its own slug, memberships, branding, donations, and CMS content — on one shared secure platform.",
    icon: Building2,
  },
  {
    title: "Public site + ops dashboard",
    text: "Outreach pages, donations, volunteers, and a staff dashboard for members, beneficiaries, projects, and documents.",
    icon: LayoutDashboard,
  },
  {
    title: "Host-aware tenancy",
    text: "Resolve tenants from subdomain (your-ngo.raushni.com) with BFF-enforced X-Tenant-Slug isolation.",
    icon: Globe2,
  },
  {
    title: "Role-based access",
    text: "Organization memberships drive admin vs staff write access — not spoofable client headers.",
    icon: ShieldCheck,
  },
];

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
          Raushni Platform
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
          SaaS operations for NGOs and social trusts
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
          Run your organization&apos;s public website, donations, members, beneficiaries,
          and documents as an isolated tenant — without standing up a separate stack for
          every NGO.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-bold text-stone-950 transition hover:bg-amber-300"
          >
            Start your organization
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Staff login
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            View default tenant site
          </Link>
        </div>

        <section className="mt-20 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                  <Icon size={22} aria-hidden />
                </div>
                <h2 className="mt-4 text-xl font-black">{feature.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{feature.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-16 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-8">
          <div className="flex items-start gap-4">
            <Users className="mt-1 flex-none text-amber-300" size={28} aria-hidden />
            <div>
              <h2 className="text-2xl font-black">How tenancy works</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80">
                Create a tenant with a unique slug. Staff join via organization memberships.
                Public and dashboard traffic is scoped by host →{" "}
                <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-100">
                  X-Tenant-Slug
                </code>
                . CMS content is filtered by{" "}
                <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-100">
                  tenantSlug
                </code>
                . Deploy with the AWS SaaS overlay for{" "}
                <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-100">
                  *.raushni.com
                </code>
                .
              </p>
              <p className="mt-4 text-sm text-white/60">
                Details: docs/MULTI_TENANT.md · Deferred billing/Razorpay: docs/DEFERRED.md
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
