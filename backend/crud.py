from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Autor, Genero, Livro
from schemas import SchemaAutorCreate, SchemaAutorResponse, SchemaAutorUpdate, SchemaGeneroCreate, SchemaGeneroResponse, SchemaGeneroUpdate, SchemaLivroCreate, SchemaLivroResponse, SchemaLivroUpdate # pyright: ignore

# CRUD - AUTOR

def criar_autor_db(autor_schema: SchemaAutorCreate, session: Session):
    novo_autor = Autor(nome = autor_schema.nome)
    session.add(novo_autor)
    session.commit()
    session.refresh(novo_autor)
    return novo_autor

def listar_autores_db(session: Session):
    stmt = select(Autor)
    autores = session.execute(stmt).scalars().all()
    return autores

def listar_autor_db(id_autor: int, session: Session):
    autor = session.get(Autor, id_autor)

    if not autor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Autor não encontrado.")

    return autor

def editar_autor_db(id_autor: int, autor_schema: SchemaAutorUpdate, session: Session):
    autor = session.get(Autor, id_autor)
    
    if not autor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Autor não encontrado.")

    autor.nome = autor_schema.nome
    session.commit()
    session.refresh(autor)

    return autor


def excluir_autor_db(id_autor: int, session: Session):
    autor = session.get(Autor, id_autor)

    if not autor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Autor não encontrado.")

    session.delete(autor)
    session.commit()

    return None

# CRUD - GENERO

def criar_genero_db(genero_schema: SchemaGeneroCreate, session: Session):
    novo_genero = Genero(genero = genero_schema.genero)
    session.add(novo_genero)
    session.commit()
    session.refresh(novo_genero)
    return novo_genero

def listar_generos_db(session: Session):
    stmt = select(Genero)
    generos = session.execute(stmt).scalars().all()
    return generos

def listar_genero_db(id_genero: int, session: Session):
    genero = session.get(Genero, id_genero)

    if not genero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gênero não encontrado.")

    return genero

def editar_genero_db(id_genero: int, genero_schema: SchemaGeneroUpdate, session: Session):
    genero = session.get(Genero, id_genero)

    if not genero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gênero não encontrado.")

    genero.genero = genero_schema.genero
    session.commit()
    session.refresh(genero)

    return genero

def excluir_genero_db(id_genero: int, session: Session):
    genero = session.get(Genero, id_genero)

    if not genero:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gênero não encontrado.")

    stmt = select(Livro).where(Livro.id_genero == id_genero)
    livro_vinculado = session.execute(stmt).first()
    
    if livro_vinculado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Não é possível excluir um gênero que possui livros cadastrados."
        )
    session.delete(genero)
    session.commit()

    return None

# CRUD - LIVROS

def criar_livro_db(livro_schema: SchemaLivroCreate, session: Session):
    if not session.get(Autor, livro_schema.id_autor):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Autor não encontrado.")
    
    if not session.get(Genero, livro_schema.id_genero):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gênero não encontrado.")

    novo_livro = Livro(
        titulo=livro_schema.titulo,
        data_publicacao=livro_schema.data_publicacao,
        preco=livro_schema.preco,
        id_autor=livro_schema.id_autor,
        id_genero=livro_schema.id_genero
    )
    session.add(novo_livro)
    session.commit()
    session.refresh(novo_livro)

    return novo_livro

def listar_livros_db(session: Session):
    stmt = select(Livro)
    livros = session.execute(stmt).scalars().all()
    return livros

def listar_livro_db(id_livro: int, session: Session):
    livro = session.get(Livro, id_livro)
    
    if not livro:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Livro não encontrado.")

    return livro

def editar_livro_db(id_livro: int, livro_schema: SchemaLivroUpdate, session: Session):
    livro = session.get(Livro, id_livro)

    if not livro:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Livro não encontrado.")

    if not session.get(Autor, livro_schema.id_autor):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Autor não encontrado.")

    if not session.get(Genero, livro_schema.id_genero):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gênero não encontrado.")

    livro.titulo =  livro_schema.titulo
    livro.data_publicacao =  livro_schema.data_publicacao
    livro.preco =  livro_schema.preco
    livro.id_autor =  livro_schema.id_autor
    livro.id_genero =  livro_schema.id_genero
    session.commit()
    session.refresh(livro)

    return livro

def excluir_livro_db(id_livro: int, session: Session):
    livro = session.get(Livro, id_livro)

    if not livro:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Livro não encontrado.")

    session.delete(livro)
    session.commit()
    
    return None
