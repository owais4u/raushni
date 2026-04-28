from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


APP_NAME = "Raushni NGO API"
APP_VERSION = "1.0.0"


def create_app() -> FastAPI:
    app = FastAPI(title=APP_NAME, version=APP_VERSION)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    async def health() -> dict[str, Any]:
        return {
            "status": "healthy",
            "service": "raushni-backend",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "version": APP_VERSION,
        }

    @app.get("/api")
    async def api_root() -> dict[str, Any]:
        return {
            "name": APP_NAME,
            "version": APP_VERSION,
            "status": "running",
            "endpoints": ["GET /health", "GET /api"],
        }

    return app


app = create_app()


def main() -> None:
    """Entry point for `poetry run raushni`."""
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()
