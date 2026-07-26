# Sistema de Gerenciamento de Biblioteca Full-Stack

## Visão Geral do Projeto

Este projeto consiste em uma aplicação web full-stack voltada para a gestão e controle de acervos bibliográficos. O sistema permite realizar operações completas de CRUD (Create, Read, Update, Delete) para autores, gêneros literários e livros, além de estabelecer relacionamentos com restrições de integridade referencial entre as entidades.

A aplicação foi arquitetada com uma separação clara entre as camadas de backend e frontend, facilitando a manutenção, escalabilidade e testes dos módulos.

---

## Links de Acesso à Aplicação

* **Aplicação Web (Frontend):** [https://bibliotecasistema.netlify.app/](https://bibliotecasistema.netlify.app/)
* **API REST (Backend):** [https://sistema-biblioteca-fullstack.onrender.com](https://sistema-biblioteca-fullstack.onrender.com)
* **Documentação Interativa (Swagger UI):** [https://sistema-biblioteca-fullstack.onrender.com/docs](https://sistema-biblioteca-fullstack.onrender.com/docs)

*Nota: Por utilizar a infraestrutura gratuita do Render, o serviço de backend entra em modo de hibernação após períodos de inatividade. O primeiro acesso pode levar de 30 a 50 segundos para que a instância seja inicializada.*

---

## Tecnologias Utilizadas

### Backend
* **Python 3:** Linguagem base de desenvolvimento.
* **FastAPI:** Framework web assíncrono de alto desempenho para construção da API REST.
* **SQLAlchemy:** ORM (Object-Relational Mapping) utilizado para modelagem do banco de dados e abstração de consultas SQL.
* **SQLite:** Banco de dados relacional para armazenamento e persistência de dados.
* **Pydantic:** Validação de dados e serialização de schemas para as requisições e respostas da API.
* **Uvicorn:** Servidor ASGI de alta performance para execução da aplicação FastAPI.

### Frontend
* **HTML5:** Estruturação semântica das páginas da interface.
* **CSS3:** Estilização responsiva e padronização visual da interface de usuário.
* **JavaScript (ES6+):** Manipulação dinâmica do DOM e consumo assíncrono dos endpoints da API via Fetch API.

### Deploy e Infraestrutura
* **Render:** Hospedagem do serviço de backend Python/FastAPI.
* **Netlify:** Hospedagem e distribuição contínua dos arquivos estáticos do frontend.

---

## Arquitetura e Estrutura do Projeto

O repositório está organizado na seguinte estrutura de diretórios:

```text
.
├── index.html               # Ponto de entrada e redirecionamento principal
├── pages/                   # Páginas da interface da aplicação
│   ├── cadastro.html
│   ├── editar.html
│   ├── excluir.html
│   └── visualizar.html
├── src/                     # Recursos do frontend (lógica e estilos)
│   ├── api.js               # Camada de integração e chamadas à API
│   ├── script.js            # Manipulação de eventos e lógica de interface
│   └── style.css            # Folha de estilos global
└── backend/                 # Código-fonte da API REST (Python)
    ├── main.py              # Ponto de entrada da aplicação FastAPI e middlewares
    ├── models.py            # Definição dos modelos ORM do banco de dados
    ├── schemas.py           # Schemas Pydantic para validação de entrada/saída
    ├── crud.py              # Lógica de operações no banco de dados
    ├── dependencies.py      # Gerenciamento de sessões do banco de dados
    ├── routes/              # Definição dos endpoints separados por módulo
    │   ├── autor_routes.py
    │   ├── genero_routes.py
    │   └── livro_routes.py
    └── requirements.txt     # Dependências e bibliotecas do projeto Python
```

---

## Modelo de Dados e Regras de Negócio

* **Autor:** Armazena os dados cadastrais dos autores (`id`, `nome`). Possui relacionamento um-para-muitos com a entidade Livro (um autor pode possuir múltiplos livros cadastrados).
* **Gênero:** Armazena as categorias literárias (`id`, `genero`).
* **Livro:** Entidade central que vincula título, data de publicação e preço a um Autor e a um Gênero por meio de chaves estrangeiras (`id_autor`, `id_genero`).

### Regras de Integridade:
* **Exclusão em Cascata:** A exclusão de um Autor remove automaticamente todos os livros associados a ele no banco de dados (`CASCADE`).
* **Restrição de Exclusão:** Um Gênero não pode ser excluído do sistema caso existam livros vinculados a ele, retornando um erro `400 Bad Request`.
* **Validação de Existência:** O cadastro e a edição de livros exigem que os IDs de Autor e Gênero fornecidos existam previamente na base de dados.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* Python 3.10 ou superior instalado.
* Git instalado.

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/gabtapia/Sistema_Biblioteca_FullStack.git
cd Sistema_Biblioteca_FullStack
```

### Passo 2: Configurar o ambiente do Backend
```bash
# Entrar na pasta do backend
cd backend

# Criar um ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ativar o ambiente virtual
# No Linux/macOS:
source venv/bin/activate
# No Windows:
venv\Scripts\activate

# Instalar as dependências
pip install -r requirements.txt

# Executar o servidor FastAPI
uvicorn main:app --reload
```
A API estará acessível em `http://127.0.0.1:8000` e a documentação interativa em `http://127.0.0.1:8000/docs`.

### Passo 3: Executar o Frontend
1. Caso queira rodar o frontend apontando para a API local, certifique-se de que a variável `API_URL` no arquivo `src/api.js` está configurada como `"http://127.0.0.1:8000"`.
2. Abra o arquivo `index.html` em qualquer navegador web ou utilize extensões como o *Live Server* do VS Code.

---

## Demonstração e Aprendizados Técnicos

### Desafios de Engenharia Solucionados
* **Configuração de CORS e Ambientes Distribuídos:** Integração entre domínios distintos de frontend (Netlify) e backend (Render), gerenciando políticas de controle de acesso de origem cruzada.
* **Integridade Referencial no SQLite:** Ativação explícita de chaves estrangeiras via `PRAGMA foreign_keys=ON` no manipulador de eventos de conexão do SQLAlchemy para garantir suporte às constraints de exclusão.
* **Estruturação de Schemas e DTOs:** Separação das camadas de transporte de dados (Pydantic) dos modelos de persistência (SQLAlchemy), assegurando validação rigorosa de dados de entrada.
