import pytest
from unittest.mock import AsyncMock, patch
from app.services.member_service import MemberService
from app.schemas.member import MemberCreate

@pytest.mark.unit
class TestMemberService:

    @pytest.fixture
    def member_service(self, db_session):
        return MemberService(db_session)

    @pytest.fixture
    def member_data(self):
        return MemberCreate(
            name="John Doe",
            email="john@example.com",
            phone="9876543210",
            join_date="2024-01-01",
            password="Test123!@#"
        )

    @pytest.mark.asyncio
    async def test_create_member_success(self, member_service, member_data):
        """Test successful member creation"""
        member = await member_service.create_member(member_data)

        assert member is not None
        assert member.name == member_data.name
        assert member.email == member_data.email
        assert member.member_id is not None

    @pytest.mark.asyncio
    async def test_create_member_duplicate_email(self, member_service, member_data):
        """Test creating member with duplicate email"""
        await member_service.create_member(member_data)

        with pytest.raises(ValueError, match="Email already registered"):
            await member_service.create_member(member_data)

    @pytest.mark.asyncio
    async def test_get_member_by_id(self, member_service, member_data):
        """Test retrieving member by ID"""
        created = await member_service.create_member(member_data)
        retrieved = await member_service.get_member_by_id(created.id)

        assert retrieved is not None
        assert retrieved.id == created.id
        assert retrieved.email == member_data.email

    @pytest.mark.asyncio
    async def test_update_member(self, member_service, member_data):
        """Test updating member information"""
        created = await member_service.create_member(member_data)

        update_data = {"name": "Updated Name"}
        updated = await member_service.update_member(created.id, update_data)

        assert updated is not None
        assert updated.name == "Updated Name"