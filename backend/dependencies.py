from sqlalchemy.orm import sessionmaker
from models import db

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=db)

def criar_sessao():
    session = SessionLocal()

    try:
        yield session
    finally:
        session.close()
