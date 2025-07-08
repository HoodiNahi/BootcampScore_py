from datetime import datetime

from fastapi import FastAPI, Depends, Query
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy import and_

import models
import schemas
from databse import SessionLocal, engine

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",# Your React frontend URL
]

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

@app.get("/scores")
def get_scores(db: Session = Depends(get_db)):
    return db.query(models.BootcampBombingRange).all()

@app.get("/pilots", response_model=List[str])
def get_pilots(db: Session = Depends(get_db)):
    pilots = db.query(models.BootcampBombingRange.player_name).distinct().all()
    return [p[0] for p in pilots]

@app.get("/missionTypes/{pilotName}", response_model=List[str])
def get_mission_types(pilotName: str, db: Session = Depends(get_db)):
    missiontypes = (
        db.query(models.BootcampBombingRange.mission_type)
        .filter(models.BootcampBombingRange.player_name == pilotName)
        .distinct()
        .all()
    )
    return [m[0] for m in missiontypes]

@app.get("/weapons/{pilotName}/{missionType}", response_model=List[str])
def get_weapons(pilotName: str, missionType: str, db: Session = Depends(get_db)):
    weapons = (
        db.query(models.BootcampBombingRange.weapon)
        .filter(
            models.BootcampBombingRange.player_name == pilotName,
            models.BootcampBombingRange.mission_type == missionType
        )
        .distinct()
        .all()
    )
    return [w[0] for w in weapons]

@app.get("/passes/{pilotName}/{missionType}/{weapon}", response_model=List[schemas.BootcampBombingRangeBase])
def get_passes(pilotName: str, missionType: str, weapon: str, db: Session = Depends(get_db)):
    query = db.query(models.BootcampBombingRange).filter(
        models.BootcampBombingRange.player_name == pilotName,
        models.BootcampBombingRange.mission_type == missionType,
        models.BootcampBombingRange.weapon == weapon
    )
    print(str(query.statement.compile(compile_kwargs={"literal_binds": True})))  # Print the full SQL with params
    return query.all()


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/test-db")
def test_db():
    try:
        # only attempt to open & close a connection
        with engine.connect():
            pass
        return {"status": "Database connection successful"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"DB connection failed: {e}")

@app.get("/health")
def healthcheck():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
