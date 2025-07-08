from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BootcampBombingRangeBase(BaseModel):
    player_name: str
    pass_attempt: int
    target_name: str
    distance: float
    radial: str
    quality: str
    weapon: str
    airframe: str
    mission_time: str
    mission_type: str
    mission_date: Optional[str]
    created_at: datetime

class BootcampBombingRangeCreate(BootcampBombingRangeBase):
    pass_attempt: int

class BootcampBombingRangeUpdate(BootcampBombingRangeBase):
    updated_at: Optional[datetime] = None

class BootcampBombingRangeInDB(BootcampBombingRangeBase):
    range_id: int
    created_at: Optional[datetime] = None
    processed_date: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
