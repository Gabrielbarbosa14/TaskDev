//dom.js
export function obterTextoTarefa() {
  const input = document.querySelector("#input-tarefa");
  return input.value;
}

//função para limpar o campo do input apos adicionar uma tarefa
export function limparInput() {
  const input = document.querySelector("#input-tarefa");
  input.value = "";
  input.focus();
}

//função para renderizar a lista de tarefas no DOM
export function renderizarTarefas(tarefas) {
  const lista = document.querySelector("#lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `tarefa${tarefa.concluida ? " concluida" : ""}`;

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;

    const acoes = document.createElement("div");
    acoes.className = "tarefa-acoes";

    const btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.className = "btn-concluir";
    btnConcluir.dataset.id = tarefa.id;
    btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.dataset.id = tarefa.id;
    btnRemover.textContent = "Remover";

    acoes.append(btnConcluir, btnRemover);
    li.append(texto, acoes);
    lista.appendChild(li);
  });
}

//função para exibir mensagens de validaçao ou sucesso para o usuário
export function exibirMensagem(mensagem, tipo) {
  let areaMensagem = document.querySelector("#mensagem");

  if (!areaMensagem) {
    areaMensagem = document.createElement("p");
    areaMensagem.id = "mensagem";
    document.body.insertBefore(
      areaMensagem,
      document.querySelector("#lista-tarefas"),
    );
  }

  areaMensagem.textContent = mensagem;
  areaMensagem.style.display = "block";

  if (tipo === "erro") {
    areaMensagem.style.color = "red";
  } else {
    areaMensagem.style.color = "green";
  }

  const timeoutId = areaMensagem.dataset.timeoutId;
  if (timeoutId) {
    clearTimeout(Number(timeoutId));
  }

  const id = setTimeout(() => {
    areaMensagem.textContent = "";
    areaMensagem.style.display = "none";
    areaMensagem.removeAttribute("style");
    delete areaMensagem.dataset.timeoutId;
  }, 2500);

  areaMensagem.dataset.timeoutId = String(id);
}

// Função exibir dados da API
export function exibirDica(dica) {
  let areaDica = document.querySelector("#dica");

  if (!areaDica) {
    areaDica = document.createComment("p");
    areaDica.id = "dica";
    document.body.appendChild(areaDica);
  }

  if (dica) {
    areaDica.textContent = `💡Dica do dia: ${dica}`;
  } else {
    areaDica.textContent = `⚠️ Não foi possível carregar a dica.`;
  }
}
