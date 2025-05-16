import json
from databse import SessionLocal
import models

db = SessionLocal()
with open("./seed.json") as f:
    seed = json.load(f)

    for name,dates in seed.items():
        for date,passes in dates.items():
            for p in passes:
                new_pass = models.Pass(
                    name=name,
                    date=date,
                    pass_number=p["pass"],
                    target=p["target"],
                    distance=p["distance"],
                    radial=p["radial"],
                    quality=p["quality"],
                    weapon=p["weapon"],
                    airframe=p["airframe"],
                    mission_time=p["mission_time"],
                )
                db.add(new_pass)

db.commit()
print("Data seeded successfully")