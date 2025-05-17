from datetime import datetime

from fastapi import FastAPI, Depends, Query
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from sqlalchemy.orm import Session

import models
import schemas
from databse import SessionLocal

app = FastAPI()

#CORS for react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/pilots", response_model=List[str])
def get_pilots(db: Session = Depends(get_db)):
    pilots = db.query(models.Pass.name).distinct().all()
    return [p[0] for p in pilots]

@app.get("/weapons/", response_model=List[str])
def get_dates(pilots: List[str] = Query(...), db: Session = Depends(get_db)):
    weapons = (
        db.query(models.Pass.weapon)
        .filter(models.Pass.name.in_(pilots))
        .distinct()
        .all()
    )
    return [w[0] for w in weapons]

@app.get("/passes/{pilot}/{weapon}", response_model=List[schemas.PassOut])
def get_passes(pilot: str, weapon: str, db: Session = Depends(get_db)):
    return db.query(models.Pass).filter_by(name=pilot, weapon=weapon).all()

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "Database connection successful"}
    except Exception as e:
        return {"status": "Database connection failed", "error": str(e)}
