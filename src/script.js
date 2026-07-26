import {
  getAutores,
  getAutorPorId,
  criarAutor,
  editarAutor,
  excluirAutor,
  getGeneros,
  getGeneroPorId,
  criarGenero,
  editarGenero,
  excluirGenero,
  getLivros,
  getLivroPorId,
  criarLivro,
  editarLivro,
  excluirLivro,
} from "./api.js";

// Campos dos forms
const selectTabela = document.querySelector("#select-tabela");
const selectDados = document.querySelector("#select-dados");
const containerCampos = document.querySelector("#container-campos");

if (selectDados) {
  selectDados.addEventListener("change", async (evento) => {
    const id = evento.target.value;
    const tabela = selectTabela.value;

    if (!id) return;

    if (tabela === "autores") {
      const autor = await getAutorPorId(id);
      const inputAutor = document.querySelector("#nome-autor");

      if (inputAutor) inputAutor.value = autor.nome;
    } else if (tabela === "generos") {
      const genero = await getGeneroPorId(id);
      const inputGenero = document.querySelector("#genero");

      if (inputGenero) inputGenero.value = genero.genero;
    } else if (tabela === "livros") {
      const livro = await getLivroPorId(id);

      const inputTitulo = document.querySelector("#titulo-livro");
      const inputDt = document.querySelector("#dt-livro");
      const inputPreco = document.querySelector("#preco-livro");
      const selectAutor = document.querySelector("#autor-livro");
      const selectGenero = document.querySelector("#genero-livro");

      if (inputTitulo) inputTitulo.value = livro.titulo;
      if (inputDt) inputDt.value = livro.data_publicacao;
      if (inputPreco) inputPreco.value = livro.preco;
      if (selectAutor) selectAutor.value = livro.id_autor;
      if (selectGenero) selectGenero.value = livro.id_genero;
    }
  });
}

async function popularTabelaVisualizar() {
  const tabelaHTML = document.querySelector("#tabela-visualizar");
  if (!tabelaHTML || !selectTabela) return;

  const tabelaSelecionada = selectTabela.value;

  tabelaHTML.innerHTML = "";

  if (tabelaSelecionada === "autores") {
    const autores = await getAutores();

    let html = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
    `;

    autores.forEach((autor) => {
      html += `
        <tr>
          <td>${autor.id}</td>
          <td>${autor.nome}</td>
        </tr>
      `;
    });

    html += `</tbody>`;
    tabelaHTML.innerHTML = html;
  } else if (tabelaSelecionada === "generos") {
    const generos = await getGeneros();

    let html = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Gênero</th>
        </tr>
      </thead>
      <tbody>
    `;

    generos.forEach((genero) => {
      html += `
        <tr>
          <td>${genero.id}</td>
          <td>${genero.genero}</td>
        </tr>
      `;
    });

    html += `</tbody>`;
    tabelaHTML.innerHTML = html;
  } else if (tabelaSelecionada === "livros") {
    const livros = await getLivros();

    let html = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Data de Publicação</th>
          <th>Preço</th>
          <th>Autor</th>
          <th>Gênero</th>
        </tr>
      </thead>
      <tbody>
    `;

    livros.forEach((livro) => {
      const precoFormatado = Number(livro.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const nomeAutor = livro.autor ? livro.autor.nome : livro.id_autor;
      const nomeGenero = livro.genero ? livro.genero.genero : livro.id_genero;

      html += `
        <tr>
          <td>${livro.id}</td>
          <td>${livro.titulo}</td>
          <td>${livro.data_publicacao}</td>
          <td>${precoFormatado}</td>
          <td>${nomeAutor}</td>
          <td>${nomeGenero}</td>
        </tr>
      `;
    });

    html += `</tbody>`;
    tabelaHTML.innerHTML = html;
  }
}

function atualizarFormulario() {
  const tabela = selectTabela.value;

  if (tabela === "autores") {
    containerCampos.innerHTML = `
          <label class="label" for="nome-autor"
            >Nome do Autor<span class="obrigatorio">*</span></label
          >
          <input
            class="input"
            id="nome-autor"
            type="text"
            name="nome-autor"
            placeholder="Ex: Machado de Assis"
            required
          />
        `;
  } else if (tabela === "generos") {
    containerCampos.innerHTML = `
          <label class="label" for="genero"
            >Gênero<span class="obrigatorio">*</span></label
          >
          <input
            class="input"
            id="genero"
            type="text"
            name="genero"
            placeholder="Ex: Ficção"
            required
          />
        `;
  } else if (tabela === "livros") {
    containerCampos.innerHTML = `
          <label class="label" for="titulo-livro"
            >Titulo do Livro<span class="obrigatorio">*</span></label
          >
          <input
            class="input"
            id="titulo-livro"
            type="text"
            name="titulo-livro"
            placeholder="Ex: Dom Casmurro"
            required
          />

          <label class="label" for="dt-livro"
            >Data de Publicação (DD/MM/AAAA)<span class="obrigatorio">*</span></label
          >
          <input
            class="input"
            id="dt-livro"
            type="date"
            name="dt-livro"
            placeholder="Ex: 17/08/2016"
            required
          />

          <label class="label" for="preco-livro"
            >Preço do Livro<span class="obrigatorio">*</span></label
          >
          <input
            class="input"
            id="preco-livro"
            type="number"
            name="preco-livro"
            placeholder="Ex: 19.99"
            step="any"
            required
          />

          <label class="label" for="autor-livro"
            >Selecione o autor do Livro<span class="obrigatorio">*</span></label
          >

          <select class="input" id="autor-livro" name="autor-livro" required>
            <option value="" disabled selected>Selecione uma opção</option>
          </select>

          <label class="label" for="genero-livro"
            >Selecione o genero do Livro<span class="obrigatorio">*</span></label
          >

          <select class="input" id="genero-livro" name="genero-livro" required>
            <option value="" disabled selected>Selecione uma opção</option>
          </select>
        `;

    popularSelectLivro();
  }
}

async function popularSelectLivro() {
  const selectAutor = document.querySelector("#autor-livro");
  const selectGenero = document.querySelector("#genero-livro");

  if (!selectAutor || !selectGenero) return;

  const autores = await getAutores();
  const generos = await getGeneros();

  selectAutor.innerHTML =
    '<option value="" disabled selected>Selecione um autor</option>';
  selectGenero.innerHTML =
    '<option value="" disabled selected>Selecione um genero</option>';

  autores.forEach((autor) => {
    const opcao = `<option value="${autor.id}" >${autor.nome}</option>`;

    selectAutor.innerHTML += opcao;
  });

  generos.forEach((genero) => {
    const opcao = `<option value="${genero.id}" >${genero.genero}</option>`;

    selectGenero.innerHTML += opcao;
  });
}

async function popularSelectDados() {
  if (!selectDados || !selectTabela) return;
  const tabela = selectTabela.value;

  selectDados.innerHTML =
    '<option value="" disabled selected>Selecione uma opção</option>';

  if (tabela === "autores") {
    const autores = await getAutores();

    autores.forEach((autor) => {
      selectDados.innerHTML += `<option value="${autor.id}">${autor.nome}</option>`;
    });
  } else if (tabela === "generos") {
    const generos = await getGeneros();

    generos.forEach((genero) => {
      selectDados.innerHTML += `<option value="${genero.id}">${genero.genero}</option>`;
    });
  } else if (tabela === "livros") {
    const livros = await getLivros();

    livros.forEach((livro) => {
      selectDados.innerHTML += `<option value="${livro.id}">${livro.titulo}</option>`;
    });
  }
}

if (selectTabela) {
  selectTabela.addEventListener("change", async () => {
    if (containerCampos) atualizarFormulario();
    await popularSelectDados();
    await popularTabelaVisualizar();
  });
  if (containerCampos) atualizarFormulario();
  popularSelectDados();
  popularTabelaVisualizar();
}

// Parte de envio do form
const formularioCadastro = document.querySelector("#formulario-cadastro");
const formularioEditar = document.querySelector("#formulario-editar");
const formularioExcluir = document.querySelector("#formulario-excluir");

if (formularioCadastro) {
  formularioCadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const tabela = selectTabela.value;

    if (tabela === "autores") {
      const nomeAutor = document.querySelector("#nome-autor").value;
      await criarAutor(nomeAutor);
      alert("Autor criado com sucesso!");
    } else if (tabela === "generos") {
      const nomeGenero = document.querySelector("#genero").value;
      await criarGenero(nomeGenero);
      alert("Gênero criado com sucesso!");
    } else if (tabela === "livros") {
      const dadosLivro = {
        titulo: document.querySelector("#titulo-livro").value,
        data_publicacao: document.querySelector("#dt-livro").value,
        preco: parseFloat(document.querySelector("#preco-livro").value),
        id_autor: parseInt(document.querySelector("#autor-livro").value),
        id_genero: parseInt(document.querySelector("#genero-livro").value),
      };
      await criarLivro(dadosLivro);
      alert("Livro criado com sucesso!");
    }
    formularioCadastro.reset();
  });
}

if (formularioEditar) {
  formularioEditar.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const tabela = selectTabela.value;
    const idAlterado = selectDados.value;

    if (!idAlterado) {
      alert("Por favor, selecione um registro para editar.");
      return;
    }

    if (tabela === "autores") {
      const novoNomeAutor = document.querySelector("#nome-autor").value;
      await editarAutor(idAlterado, novoNomeAutor);
      alert("Autor editado com sucesso!");
    } else if (tabela === "generos") {
      const novoGenero = document.querySelector("#genero").value;
      await editarGenero(idAlterado, novoGenero);
      alert("Genero editado com sucesso!");
    } else if (tabela === "livros") {
      const novosDadosLivro = {
        titulo: document.querySelector("#titulo-livro").value,
        data_publicacao: document.querySelector("#dt-livro").value,
        preco: parseFloat(document.querySelector("#preco-livro").value),
        id_autor: parseInt(document.querySelector("#autor-livro").value),
        id_genero: parseInt(document.querySelector("#genero-livro").value),
      };

      await editarLivro(idAlterado, novosDadosLivro);
      alert("Livro editado com sucesso!");
    }
    formularioEditar.reset();
    await popularSelectDados();
  });
}

if (formularioExcluir) {
  formularioExcluir.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const tabela = selectTabela.value;
    const id = selectDados.value;
    if (!id) {
      alert("Por favor, selecione um registro para excluir.");
      return;
    }

    if (tabela === "autores") {
      await excluirAutor(id);
      alert("Autor excluído com sucesso!");
    } else if (tabela === "generos") {
      try {
        await excluirGenero(id);
        alert("Gênero excluído com sucesso!");
      } catch (erro) {
        alert(erro.message);
      }
    } else if (tabela === "livros") {
      await excluirLivro(id);
      alert("Livro excluído com sucesso!");
    }
    await popularSelectDados();
  });
}
