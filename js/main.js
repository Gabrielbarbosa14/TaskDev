//importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
  exibirDica,
} from "./dom.js";

//importando funções do módulo tarefas
import { validarTarefa, adicionarTarefa, obterTarefas } from "./tarefas.js";

// Importando função para buscar dica
import { buscarDica } from "./api.js";

//selecionar o formulario para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Função para iniciar a aplicação, buscando uma dica e exibindo-a
async function iniciarAplicacao() {
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

// Iniciar a aplicação ao carregar a página
iniciarAplicacao();
