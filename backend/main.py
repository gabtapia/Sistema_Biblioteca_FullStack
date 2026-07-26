from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.autor_routes import autor_router
from routes.genero_routes import genero_router
from routes.livro_routes import livro_router
from models import Base, db

app = FastAPI()

Base.metadata.create_all(bind=db)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(autor_router)
app.include_router(genero_router)
app.include_router(livro_router)
