from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from typing import List

from dependencies import criar_sessao # pyright: ignore
from crud import criar_livro_db, listar_livros_db, listar_livro_db, editar_livro_db, excluir_livro_db # pyright: ignore
from schemas import SchemaLivroCreate, SchemaLivroResponse, SchemaLivroUpdate # pyright: ignore

livro_router = APIRouter(prefix="/livros", tags=["Livros"])

@livro_router.post("/", response_model=SchemaLivroResponse, status_code=status.HTTP_201_CREATED)
async def criar_livro(livro_schema: SchemaLivroCreate, session: Session = Depends(criar_sessao)):
    return criar_livro_db(livro_schema, session)

@livro_router.get("/", response_model=List[SchemaLivroResponse])
async def listar_livros(session: Session = Depends(criar_sessao)):
    livros = listar_livros_db(session)
    return livros

@livro_router.get("/{id_livro}", response_model=SchemaLivroResponse)
async def listar_livro(id_livro: int, session: Session = Depends(criar_sessao)):
    return listar_livro_db(id_livro, session)

@livro_router.put("/{id_livro}", response_model=SchemaLivroResponse)
async def editar_livro(id_livro: int, livro_schema: SchemaLivroUpdate, session: Session = Depends(criar_sessao)):
    return editar_livro_db(id_livro, livro_schema, session)

@livro_router.delete("/{id_livro}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_livro(id_livro: int, session: Session = Depends(criar_sessao)):
    excluir_livro_db(id_livro, session)
    return
