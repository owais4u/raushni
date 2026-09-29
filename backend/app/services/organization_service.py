from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.constants.roles import UserRole
from app.repositories.organization_repository import OrganizationRepository
from app.repositories.settings_repository import PlatformSettingsRepository
from app.schemas.organization import (
    MembershipCreate,
    MembershipOut,
    OrganizationCreate,
    OrganizationOut,
    OrganizationProvisioned,
)


class OrganizationService:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session
        self._orgs = OrganizationRepository(session)

    async def get_by_slug(self, slug: str) -> OrganizationOut:
        org = await self._orgs.get_by_slug(slug)
        if org is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Organization '{slug}' was not found.",
            )
        return OrganizationOut.model_validate(org)

    async def provision(self, payload: OrganizationCreate) -> OrganizationProvisioned:
        existing = await self._orgs.get_by_slug(payload.slug)
        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Organization slug '{payload.slug}' is already taken.",
            )

        primary_host = payload.primary_host or f"{payload.slug}.raushni.com"
        org = await self._orgs.create(
            slug=payload.slug,
            name=payload.name,
            primary_host=primary_host,
        )
        settings_repo = PlatformSettingsRepository(
            self._session, organization_id=org.id
        )
        await settings_repo.get_or_create(default_organization_name=payload.name)
        membership = await self._orgs.ensure_membership(
            organization_id=org.id,
            email=payload.admin_email,
            role=UserRole.ADMIN.value,
        )
        await self._session.flush()
        return OrganizationProvisioned(
            organization=OrganizationOut.model_validate(org),
            admin_membership=MembershipOut.model_validate(membership),
        )

    async def add_membership(
        self,
        *,
        organization_id,
        payload: MembershipCreate,
    ) -> MembershipOut:
        if payload.role == UserRole.GUEST:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot invite guests as org memberships.",
            )
        existing = await self._orgs.get_membership_by_email(
            organization_id, payload.email
        )
        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Membership for '{payload.email}' already exists.",
            )
        row = await self._orgs.ensure_membership(
            organization_id=organization_id,
            email=payload.email,
            role=payload.role.value,
        )
        await self._session.flush()
        return MembershipOut.model_validate(row)
