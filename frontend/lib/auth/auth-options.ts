import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { normalizeRole } from "@/lib/auth/permissions";
import {
  authCredentialsRequired,
  isPlaceholderCredential,
} from "@/lib/auth/safe-callback-url";
import { DEFAULT_TENANT_SLUG, normalizeTenantSlug } from "@/lib/tenant";

const adminEmail = (process.env.NEXTAUTH_ADMIN_EMAIL || "").trim() || "admin@raushni.com";
const adminPassword = (process.env.NEXTAUTH_ADMIN_PASSWORD || "").trim();
const staffEmail = (process.env.NEXTAUTH_STAFF_EMAIL || "").trim() || "staff@raushni.com";
const staffPassword = (process.env.NEXTAUTH_STAFF_PASSWORD || "").trim();

function tenantClaimsFromCredentials(tenantSlugRaw?: string) {
  const tenantSlug = normalizeTenantSlug(tenantSlugRaw || DEFAULT_TENANT_SLUG);
  return {
    tenantSlug,
    organizationId:
      tenantSlug === DEFAULT_TENANT_SLUG
        ? (process.env.DEFAULT_ORGANIZATION_ID || "").trim() || undefined
        : undefined,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Raushni account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        tenantSlug: { label: "Tenant", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        const tenant = tenantClaimsFromCredentials(
          typeof credentials?.tenantSlug === "string" ? credentials.tenantSlug : undefined,
        );
        const requireCreds = authCredentialsRequired();

        if (requireCreds) {
          if (isPlaceholderCredential(adminPassword) && isPlaceholderCredential(staffPassword)) {
            return null;
          }
        }

        if (
          email === adminEmail.toLowerCase() &&
          adminPassword &&
          !isPlaceholderCredential(adminPassword) &&
          password === adminPassword
        ) {
          return {
            id: `${tenant.tenantSlug}-admin`,
            name: "Admin User",
            email: adminEmail,
            role: "ADMIN",
            ...tenant,
          };
        }

        if (
          email === staffEmail.toLowerCase() &&
          staffPassword &&
          !isPlaceholderCredential(staffPassword) &&
          password === staffPassword
        ) {
          return {
            id: `${tenant.tenantSlug}-staff`,
            name: "Staff User",
            email: staffEmail,
            role: "STAFF",
            ...tenant,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = normalizeRole((user as { role?: string }).role);
        const claims = user as { tenantSlug?: string; organizationId?: string };
        token.tenantSlug = claims.tenantSlug || DEFAULT_TENANT_SLUG;
        token.organizationId = claims.organizationId;
      }
      token.role = normalizeRole(token.role);
      token.tenantSlug = token.tenantSlug || DEFAULT_TENANT_SLUG;
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: normalizeRole(token.role),
        accessLevel: normalizeRole(token.role) === "GUEST" ? "read" : "write",
        tenantSlug: token.tenantSlug || DEFAULT_TENANT_SLUG,
        organizationId: token.organizationId,
      };
      return session;
    },
  },
};
