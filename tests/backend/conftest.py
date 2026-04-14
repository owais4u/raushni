import pytest
from typing import AsyncGenerator
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.main import app
from app.core.database import get_db
from app.core.config import settings

# Test database URL
TEST_DATABASE_URL = settings.DATABASE_URL + "_test"

# Create test engine
engine = create_async_engine(TEST_DATABASE_URL, echo=True)
TestingSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
    async with TestingSessionLocal() as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
async def client() -> AsyncGenerator:
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

@pytest.fixture
async def db_session() -> AsyncGenerator:
    async with TestingSessionLocal() as session:
        yield session

@pytest.fixture
def test_user_data():
    return {
        "email": "test@example.com",
        "password": "Test123!@#",
        "name": "Test User",
        "phone": "9876543210"
    }

@pytest.fixture
async def test_user(db_session, test_user_data):
    from app.models.user import User
    from app.core.security import hash_password

    user = User(
        email=test_user_data["email"],
        hashed_password=hash_password(test_user_data["password"]),
        name=test_user_data["name"],
        phone=test_user_data["phone"]
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user