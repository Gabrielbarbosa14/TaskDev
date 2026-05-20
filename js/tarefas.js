//Este modulo é responsavel por validar tarefas antes de adiciona-las

//Função para validar o txto da tarefa, tem quer ter ao menos 3 caracteres
const STORAGE_KEY = "tarefas";

//Array para armazenar as tarefas
let tarefas = [];

function salvarTarefas() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  } catch (error) {
    console.warn("Não foi possível salvar as tarefas:", error);
  }
}

export function carregarTarefas() {
  try {
    const tarefasSalvas = localStorage.getItem(STORAGE_KEY);
    tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  } catch (error) {
    tarefas = [];
    console.warn("Não foi possível carregar as tarefas:", error);
  }

  return tarefas;
}

//função para adicionar uma nova tarefa
export function adicionarTarefa(texto) {
  const tarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
  };

  tarefas.push(tarefa);
  salvarTarefas();
  return tarefa;
}

// Função para validar o texto da tarefa
export function validarTarefa(texto) {
  if (texto.trim() === "") {
    return {
      valida: false,
      mensagem: "A tarefa não pode estar vazia.",
    };
  }

  if (texto.length < 3) {
    return {
      valida: false,
      mensagem: "A tarefa deve ter ao menos 3 caracteres.",
    };
  }

  return {
    valida: true,
  };
}

//Função para obter todas as tarefas
export function obterTarefas() {
  return tarefas;
}

export function alternarConcluida(id) {
  const tarefa = tarefas.find((item) => item.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarTarefas();
  }
  return tarefa;
}

export function removerTarefa(id) {
  tarefas = tarefas.filter((item) => item.id !== id);
  salvarTarefas();
}
