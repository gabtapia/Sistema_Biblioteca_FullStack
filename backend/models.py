from datetime import date
from typing import List
from sqlalchemy import ForeignKey, create_engine, event
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.engine import Engine

db = create_engine("sqlite:///biblioteca.db")

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

class Base(DeclarativeBase):
    pass

class Autor(Base):
    __tablename__ = "autores"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(nullable=False)
    livros: Mapped[List["Livro"]] = relationship("Livro", back_populates="autor", cascade="all, delete-orphan")


class Genero(Base):
    __tablename__ = "generos"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    genero: Mapped[str] = mapped_column(nullable=False)


class Livro(Base):
    __tablename__ = "livros"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    titulo: Mapped[str] = mapped_column(nullable=False)
    data_publicacao: Mapped[date] = mapped_column(nullable=False)
    preco: Mapped[float] = mapped_column(nullable=False)
    id_autor: Mapped[int] = mapped_column(ForeignKey("autores.id", ondelete="CASCADE"), nullable=False)
    id_genero: Mapped[int] = mapped_column(ForeignKey("generos.id"), nullable=False)

    autor: Mapped["Autor"] = relationship("Autor", back_populates="livros")
