from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime
from databse import Base  # your Base declarative

class BootcampBombingRange(Base):
    __tablename__ = "range_eval"
    __table_args__ = {"schema": "common"}

    range_id = Column(Integer, primary_key=True, index=True)
    player_name = Column(String, nullable=False)
    pass_attempt = Column(Integer, nullable=False)  # 'pass' renamed to pass_ in Python, but maps to "pass" column
    target_name = Column(String, nullable=False)
    distance = Column(Numeric, nullable=False)
    radial = Column(String, nullable=False)
    quality = Column(String, nullable=False)
    weapon = Column(String, nullable=False)
    airframe = Column(String, nullable=False)
    mission_time = Column(String, nullable=False)
    mission_type = Column(String, nullable=False)
    mission_date = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=True)


