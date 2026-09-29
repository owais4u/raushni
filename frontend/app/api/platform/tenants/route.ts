import { NextRequest, NextResponse } from "next/server";

import { enforceBffRateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function upstreamBase(): string {
  return (
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_PYTHON_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://backend:8000"
  ).replace(/\/$/, "");
}

function serviceApiKey(): string {
  return (process.env.INTERNAL_API_KEY || "").trim();
}

type ProvisionBody = {
  slug?: string;
  name?: string;
  admin_email?: string;
  primary_host?: string | null;
};

/**
 * Public SaaS onboarding BFF: provisions a tenant via INTERNAL_API_KEY.
 * Rate-limited; never exposes the service key to the browser.
 */
export async function POST(request: NextRequest) {
  const apiKey = serviceApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { detail: "INTERNAL_API_KEY is not configured on the frontend BFF." },
      { status: 500 },
    );
  }

  const limited = await enforceBffRateLimit({
    key: `platform-provision:${request.headers.get("x-forwarded-for") || "unknown"}`,
    limit: 5,
    windowSeconds: 3600,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { detail: "Too many provisioning attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: ProvisionBody;
  try {
    body = (await request.json()) as ProvisionBody;
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body." }, { status: 400 });
  }

  const slug = (body.slug || "").trim().toLowerCase();
  const name = (body.name || "").trim();
  const adminEmail = (body.admin_email || "").trim().toLowerCase();
  if (!slug || !name || !adminEmail) {
    return NextResponse.json(
      { detail: "slug, name, and admin_email are required." },
      { status: 400 },
    );
  }

  const upstream = await fetch(`${upstreamBase()}/api/v1/organizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      slug,
      name,
      admin_email: adminEmail,
      primary_host: body.primary_host ?? null,
    }),
    cache: "no-store",
  });

  const text = await upstream.text();
  let payload: unknown = text;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { detail: text || "Upstream error" };
  }

  return NextResponse.json(payload, { status: upstream.status });
}
