//importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
  exibirDica,
} from "./dom.js";

//importando funções do módulo tarefas
import {
  validarTarefa,
  adicionarTarefa,
  obterTarefas,
  alternarConcluida,
  removerTarefa,
  carregarTarefas,
} from "./tarefas.js";

// Importando função para buscar dica
import { buscarDica } from "./api.js";

//selecionar o formulario para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Função para iniciar a aplicação, carregando tarefas salvas e buscando uma dica
async function iniciarAplicacao() {
  carregarTarefas();
  renderizarTarefas(obterTarefas());

  const dica = await buscarDica();
  exibirDica(dica);
}

//evento de submit para adicionar uma nova tarefa
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "erro");
    return;
  }

  adicionarTarefa(texto);
  renderizarTarefas(obterTarefas());
  exibirMensagem("tarefa adicionada com sucesso!", "sucesso");
  limparInput();
});

const listaTarefas = document.querySelector("#lista-tarefas");
listaTarefas.addEventListener("click", (event) => {
  const botao = event.target.closest("button");
  if (!botao || !listaTarefas.contains(botao)) {
    return;
  }

  const id = Number(botao.dataset.id);
  if (!id) {
    return;
  }

  if (botao.classList.contains("btn-concluir")) {
    alternarConcluida(id);
    renderizarTarefas(obterTarefas());
    exibirMensagem("tarefa atualizada com sucesso!", "sucesso");
  }

  if (botao.classList.contains("btn-remover")) {
    removerTarefa(id);
    renderizarTarefas(obterTarefas());
    exibirMensagem("tarefa removida com sucesso!", "sucesso");
  }
});

// Iniciar a aplicação ao carregar a página
iniciarAplicacao();
