from pydantic import BaseModel


class PassBase(BaseModel):
    name: str
    date: str
    pass_number: int
    target: str
    distance: float
    radial: int
    quality: str
    weapon: str
    airframe: str
    mission_time: str

class PassCreate(PassBase):
    pass
class PassOut(PassBase):
    id:int
    class Config:
        orm_mode = True