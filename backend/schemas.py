from pydantic import BaseModel
from datetime import date

class SchemaAutorCreate(BaseModel):
    nome: str

class SchemaAutorUpdate(BaseModel):
    nome: str

class SchemaAutorResponse(BaseModel):
    id: int
    nome: str

    class Config:
        from_attributes = True


class SchemaGeneroCreate(BaseModel):
    genero: str

class SchemaGeneroUpdate(BaseModel):
    genero: str

class SchemaGeneroResponse(BaseModel):
    id: int
    genero: str

    class Config:
        from_attributes = True


class SchemaLivroCreate(BaseModel):
    titulo: str
    data_publicacao: date
    preco: float
    id_autor: int
    id_genero: int

class SchemaLivroUpdate(BaseModel):
    titulo: str
    data_publicacao: date
    preco: float
    id_autor: int
    id_genero: int

class SchemaLivroResponse(BaseModel):
    id: int
    titulo: str
    data_publicacao: date
    preco: float
    id_autor: int
    id_genero: int

    class Config:
        from_attributes = True
