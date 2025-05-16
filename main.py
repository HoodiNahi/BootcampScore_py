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

@app.get("/dates/", response_model=List[str])
def get_dates(pilots: List[str] = Query(...), db: Session = Depends(get_db)):
    dates = (
        db.query(models.Pass.date)
        .filter(models.Pass.name.in_(pilots))
        .distinct()
        .all()
    )
    return [d[0] for d in dates]

@app.get("/passes/{pilot}/{date}", response_model=List[schemas.PassOut])
def get_passes(pilot: str, date: str, db: Session = Depends(get_db)):
    return db.query(models.Pass).filter_by(name=pilot, date=date).all()

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
