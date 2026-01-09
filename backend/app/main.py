from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Importing internal modules (assuming you have these folders)
# from app.api.v1 import api_router
# from app.core.config import settings

app = FastAPI(
    title="My Project API",
    description="A comprehensive API built with FastAPI",
    version="1.0.0",
)

# 1. Middleware Configuration
# Adjust 'allow_origins' for production (e.g., ["https://example.com"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 3. Health Check / Root Endpoint
@app.get("/", tags=["Health"])
async def root():
    return {"message": "API is online", "status": "healthy"}

# 4. Include Routers
# This keeps your main.py clean by moving logic to separate files
# app.include_router(api_router, prefix="/api/v1")

# 5. Example Endpoint


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)