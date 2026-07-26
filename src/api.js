const API_URL = "http://127.0.0.1:8000";

// Autores

export async function getAutores() {
  const res = await fetch(`${API_URL}/autores/`);
  return await res.json();
}

export async function getAutorPorId(id) {
  const res = await fetch(`${API_URL}/autores/${id}`);
  if (!res.ok) throw new Error("Autor não encontrado.");
  return await res.json();
}

export async function criarAutor(nome) {
  const res = await fetch(`${API_URL}/autores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  return await res.json();
}

export async function editarAutor(id, nome) {
  const res = await fetch(`${API_URL}/autores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  return await res.json();
}

export async function excluirAutor(id) {
  const res = await fetch(`${API_URL}/autores/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

// Generos

export async function getGeneros() {
  const res = await fetch(`${API_URL}/generos/`);
  return await res.json();
}

export async function getGeneroPorId(id) {
  const res = await fetch(`${API_URL}/generos/${id}`);
  if (!res.ok) throw new Error("Gênero não encontrado.");
  return await res.json();
}

export async function criarGenero(genero) {
  const res = await fetch(`${API_URL}/generos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genero }),
  });
  return await res.json();
}

export async function editarGenero(id, genero) {
  const res = await fetch(`${API_URL}/generos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genero }),
  });
  return await res.json();
}

export async function excluirGenero(id) {
  const res = await fetch(`${API_URL}/generos/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

// Livros

export async function getLivros() {
  const res = await fetch(`${API_URL}/livros/`);
  return await res.json();
}

export async function getLivroPorId(id) {
  const res = await fetch(`${API_URL}/livros/${id}`);
  if (!res.ok) throw new Error("Livro não encontrado.");
  return await res.json();
}

export async function criarLivro(dadosLivro) {
  const res = await fetch(`${API_URL}/livros/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosLivro),
  });
  return await res.json();
}

export async function editarLivro(id, dadosLivro) {
  const res = await fetch(`${API_URL}/livros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosLivro),
  });
  return await res.json();
}

export async function excluirLivro(id) {
  const res = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
