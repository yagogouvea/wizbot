// fluxosUtils.js

export function gerarNomeSequencial(nomesExistentes) {
    let contador = 1;
    let nome = "Fluxo 1";
  
    const base = "Fluxo ";
    const nomesSet = new Set(nomesExistentes);
  
    while (nomesSet.has(nome)) {
      contador++;
      nome = `${base}${contador}`;
    }
  
    return nome;
  }
  
  export function nomeDuplicado(fluxos, nomeProposto, idAtual) {
    return fluxos.some(f => f.nome === nomeProposto && f.id !== idAtual);
  }
  