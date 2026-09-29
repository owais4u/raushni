#!/usr/bin/env bash
# Provision a SaaS NGO tenant via the FastAPI organizations API.
# Usage:
#   API_BASE_URL=http://localhost:8000 INTERNAL_API_KEY=... \
#     ./scripts/provision-tenant.sh acme-trust "Acme Educational Trust" admin@acme.org
set -euo pipefail

SLUG="${1:-}"
NAME="${2:-}"
ADMIN_EMAIL="${3:-}"
API_BASE_URL="${API_BASE_URL:-http://localhost:8000}"
INTERNAL_API_KEY="${INTERNAL_API_KEY:-}"

if [[ -z "$SLUG" || -z "$NAME" || -z "$ADMIN_EMAIL" ]]; then
  echo "Usage: $0 <slug> <organization-name> <admin-email>" >&2
  exit 1
fi

if [[ -z "$INTERNAL_API_KEY" ]]; then
  echo "INTERNAL_API_KEY is required." >&2
  exit 1
fi

curl -fsS -X POST "${API_BASE_URL%/}/api/v1/organizations" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${INTERNAL_API_KEY}" \
  -d "$(python3 - <<PY
import json
print(json.dumps({
  "slug": "${SLUG}",
  "name": "${NAME}",
  "admin_email": "${ADMIN_EMAIL}",
}))
PY
)" | python3 -m json.tool

echo
echo "Next: seed CMS for tenantSlug=${SLUG}, then open https://${SLUG}.raushni.com"
