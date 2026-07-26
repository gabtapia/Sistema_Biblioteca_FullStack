from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from typing import List

from dependencies import criar_sessao # pyright: ignore
from crud import criar_genero_db, listar_generos_db, listar_genero_db, editar_genero_db, excluir_genero_db # pyright: ignore
from schemas import SchemaGeneroCreate, SchemaGeneroResponse, SchemaGeneroUpdate # pyright: ignore

genero_router = APIRouter(prefix="/generos", tags=["Gêneros"])

@genero_router.post("/", response_model=SchemaGeneroResponse, status_code=status.HTTP_201_CREATED)
async def criar_genero(genero_schema: SchemaGeneroCreate, session: Session = Depends(criar_sessao)):
    return criar_genero_db(genero_schema, session)

@genero_router.get("/", response_model=List[SchemaGeneroResponse])
async def listar_generos(session: Session = Depends(criar_sessao)):
    generos = listar_generos_db(session)
    return generos

@genero_router.get("/{id_genero}", response_model=SchemaGeneroResponse)
async def listar_genero(id_genero: int, session: Session = Depends(criar_sessao)):
    return listar_genero_db(id_genero, session)

@genero_router.put("/{id_genero}", response_model=SchemaGeneroResponse)
async def editar_genero(id_genero: int, genero_schema: SchemaGeneroUpdate, session: Session = Depends(criar_sessao)):
    return editar_genero_db(id_genero, genero_schema, session)

@genero_router.delete("/{id_genero}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_genero(id_genero: int, session: Session = Depends(criar_sessao)):
    excluir_genero_db(id_genero, session)
    return
