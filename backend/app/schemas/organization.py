from __future__ import annotations

import re
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.constants.roles import UserRole
from app.core.sanitize import SanitizedStr

_SLUG_RE = re.compile(r"^[a-z0-9](?:[a-z0-9-]{1,62}[a-z0-9])?$")
_RESERVED_SLUGS = frozenset(
    {
        "www",
        "cms",
        "api",
        "app",
        "admin",
        "static",
        "assets",
        "mail",
        "status",
        "platform",
        "raushni",
        "localhost",
    }
)


class OrganizationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slug: str
    name: str
    status: str
    primary_host: str | None = None
    created_at: datetime | None = None


class OrganizationCreate(BaseModel):
    """Provision a new NGO tenant on the shared SaaS platform."""

    slug: SanitizedStr = Field(min_length=2, max_length=80)
    name: SanitizedStr = Field(min_length=2, max_length=160)
    admin_email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    primary_host: SanitizedStr | None = Field(default=None, max_length=255)

    @field_validator("slug")
    @classmethod
    def validate_slug(cls, value: str) -> str:
        slug = value.strip().lower()
        if not _SLUG_RE.match(slug):
            raise ValueError(
                "Slug must be 2–64 chars: lowercase letters, digits, hyphens."
            )
        if slug in _RESERVED_SLUGS:
            raise ValueError(f"Slug '{slug}' is reserved.")
        return slug

    @field_validator("admin_email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class MembershipCreate(BaseModel):
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    role: UserRole = UserRole.STAFF

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class MembershipOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    organization_id: UUID
    email: str
    role: str
    created_at: datetime | None = None


class OrganizationProvisioned(BaseModel):
    organization: OrganizationOut
    admin_membership: MembershipOut
    message: str = (
        "Tenant provisioned. Point DNS (slug.raushni.com) at the platform and "
        "seed CMS content for this tenantSlug."
    )
