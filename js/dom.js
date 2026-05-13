// dom.js
export function obterTextoTarefa() {
  return document.querySelector("#input-tarefa").value;
}

// Função para limpar o campo de input após adicionar uma tarefa
export function limparInput() {
  document.querySelector("#input-tarefa").value = "";
}

// Função para renderizar a lista de tarefas no DOM
export function renderizarTarefas(tarefas) {
  const lista = document.querySelector("#lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.style.textDecoration = "line-throug";
    }

    lista.appendChild(li);
  });
}

// Função para exibir mensagens de validação ou sucesso para o usuário
export function exibirMensagem(mensagem, tipo) {
  let msg = document.querySelector("#mensagem");

  if (!msg) {
    msg = document.createElement("p");
    msg.id = "mensagem";
    document.body.insertBefore(msg, document.querySelector("#lista-tarefas"));
  }

  msg.textContent = mensagem;
  msg.style.color = tipo === "error" ? "red" : "green";
}
