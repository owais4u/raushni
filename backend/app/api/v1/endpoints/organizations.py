from __future__ import annotations

from fastapi import APIRouter, Depends

from app.api.dependencies.auth import (
    get_current_organization,
    require_admin_access,
    require_service_key_always,
)
from app.api.dependencies.services import get_organization_service
from app.constants.roles import UserRole
from app.models.organization import OrganizationModel
from app.schemas.organization import (
    MembershipCreate,
    MembershipOut,
    OrganizationCreate,
    OrganizationOut,
    OrganizationProvisioned,
)
from app.services.organization_service import OrganizationService

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.get("/current", response_model=OrganizationOut)
async def get_current_organization_endpoint(
    organization: OrganizationModel = Depends(get_current_organization),
) -> OrganizationOut:
    return OrganizationOut.model_validate(organization)


@router.post(
    "",
    response_model=OrganizationProvisioned,
    status_code=201,
    summary="Provision a new NGO tenant (SaaS)",
)
async def provision_organization(
    payload: OrganizationCreate,
    _service_key: None = Depends(require_service_key_always),
    service: OrganizationService = Depends(get_organization_service),
) -> OrganizationProvisioned:
    """
    Create a tenant org + default platform_settings + ADMIN membership.

    Requires INTERNAL_API_KEY (Next.js BFF / ops scripts). Does not create
    Strapi content — run CMS seed for the new tenantSlug afterward.
    """
    return await service.provision(payload)


@router.post(
    "/current/memberships",
    response_model=MembershipOut,
    status_code=201,
)
async def invite_membership(
    payload: MembershipCreate,
    organization: OrganizationModel = Depends(get_current_organization),
    _role: UserRole = Depends(require_admin_access),
    service: OrganizationService = Depends(get_organization_service),
) -> MembershipOut:
    return await service.add_membership(
        organization_id=organization.id,
        payload=payload,
    )
