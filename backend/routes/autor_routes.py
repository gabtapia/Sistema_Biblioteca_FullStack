from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from typing import List

from dependencies import criar_sessao # pyright: ignore
from crud import criar_autor_db, listar_autores_db, listar_autor_db, editar_autor_db, excluir_autor_db # pyright: ignore
from schemas import SchemaAutorCreate, SchemaAutorResponse, SchemaAutorUpdate # pyright: ignore

autor_router = APIRouter(prefix="/autores", tags=["Autores"])

@autor_router.post("/", response_model=SchemaAutorResponse, status_code=status.HTTP_201_CREATED)
async def criar_autor(autor_schema: SchemaAutorCreate, session: Session = Depends(criar_sessao)):
    return criar_autor_db(autor_schema, session)

@autor_router.get("/", response_model=List[SchemaAutorResponse])
async def listar_autores(session: Session = Depends(criar_sessao)):
    autores = listar_autores_db(session)
    return autores

@autor_router.get("/{id_autor}", response_model=SchemaAutorResponse)
async def listar_autor(id_autor: int, session: Session = Depends(criar_sessao)):
    return listar_autor_db(id_autor, session)

@autor_router.put("/{id_autor}", response_model=SchemaAutorResponse)
async def editar_autor(id_autor: int, autor_schema: SchemaAutorUpdate, session: Session = Depends(criar_sessao)):
    return editar_autor_db(id_autor, autor_schema, session)

@autor_router.delete("/{id_autor}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_autor(id_autor: int, session: Session = Depends(criar_sessao)):
    excluir_autor_db(id_autor, session)
    return
