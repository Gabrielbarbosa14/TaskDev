//importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
} from "./dom.js";

//importando funções do módulo tarefas
import { validarTarefa, adicionarTarefa, obterTarefas } from "./tarefas.js";

//selecionar o formulario para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

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
