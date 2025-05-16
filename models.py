from sqlalchemy import Column, Integer, String, Float, ForeignKey
from databse import Base

class Pass(Base):
    __tablename__="passes"

    id = Column(Integer, primary_key=True,index=True)
    name = Column(String, index=True)
    date = Column(String, index=True) # store date as string 'YYYY-MM-DD'
    pass_number = Column(Integer)
    target = Column(String)
    distance = Column(Float)
    radial = Column(Integer)
    quality = Column(String)
    weapon = Column(String)
    airframe = Column(String)
    mission_time = Column(String)