# create_db.py

from databse import engine, Base
import models  # make sure this imports your SQLAlchemy models

# Create all tables defined in models
Base.metadata.create_all(bind=engine)

print(" Database and tables created.")
