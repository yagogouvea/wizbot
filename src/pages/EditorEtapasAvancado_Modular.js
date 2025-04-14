
// EditorEtapasAvancado_Modular.js
import React, { useState } from 'react';
import BlocoEtapaVisual from './BlocoEtapaVisual';
import FluxoSidebar from './FluxoSidebar';
import Simulador from '../components/Simulador';
import { gerarNomeSequencial, nomeDuplicado } from './fluxosUtils';

export default function EditorEtapasAvancado_Modular() {
  const [fluxos, setFluxos] = useState([
    {
      id: 1,
      nome: 'Fluxo 1',
      etapas: [],
      ativo: true,
      atualizado: new Date().toLocaleString()
    }
  ]);
  const [fluxoSelecionadoId, setFluxoSelecionadoId] = useState(1);
  const [etapasTemp, setEtapasTemp] = useState([]);
  const [editado, setEditado] = useState(false);
  const [modoAvancado, setModoAvancado] = useState(false);
  const [mostrarSimulador, setMostrarSimulador] = useState(false);

  const fluxoSelecionado = fluxos.find(f => f.id === fluxoSelecionadoId);

  const atualizarFluxo = (id, novosDados) => {
    setFluxos(prev => prev.map(f => f.id === id ? { ...f, ...novosDados } : f));
  };

  const salvarEtapas = () => {
    atualizarFluxo(fluxoSelecionadoId, {
      etapas: etapasTemp,
      atualizado: new Date().toLocaleString()
    });
    setEditado(false);
    alert('Fluxo salvo com sucesso!');
  };

  const criarNovoFluxo = () => {
    const nomes = fluxos.map(f => f.nome);
    const nomeUnico = gerarNomeSequencial(nomes);
    const novo = {
      id: Date.now(),
      nome: nomeUnico,
      etapas: [],
      ativo: false,
      atualizado: new Date().toLocaleString()
    };
    setFluxos([...fluxos, novo]);
    setFluxoSelecionadoId(novo.id);
    setEtapasTemp([]);
  };

  const trocarFluxo = (fluxo) => {
    if (editado) {
      const confirmar = window.confirm("Você tem alterações não salvas. Deseja sair sem salvar?");
      if (!confirmar) return;
    }
    setFluxoSelecionadoId(fluxo.id);
    setEtapasTemp(fluxo.etapas || []);
    setEditado(false);
    setMostrarSimulador(false);
  };

  const ativarFluxo = (id) => {
    const atualizados = fluxos.map(f => ({ ...f, ativo: f.id === id }));
    setFluxos(atualizados);
  };

  const excluirFluxo = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este fluxo?")) return;
    const atualizados = fluxos.filter(f => f.id !== id);
    setFluxos(atualizados);
    if (fluxoSelecionadoId === id && atualizados.length > 0) {
      setFluxoSelecionadoId(atualizados[0].id);
      setEtapasTemp(atualizados[0].etapas || []);
    }
  };

  const renomearFluxo = (id, novoNome) => {
    if (nomeDuplicado(fluxos, novoNome, id)) {
      alert("Já existe um fluxo com esse nome.");
      return;
    }
    atualizarFluxo(id, { nome: novoNome });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <FluxoSidebar
        fluxos={fluxos}
        fluxoSelecionadoId={fluxoSelecionadoId}
        onSelecionar={trocarFluxo}
        onAtivar={ativarFluxo}
        onExcluir={excluirFluxo}
        onRenomear={renomearFluxo}
        onCriarNovo={criarNovoFluxo}
        fluxoEditado={editado}
      />

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Editando: {fluxoSelecionado.nome}</h1>
            <p className="text-sm text-gray-500">Última edição: {fluxoSelecionado.atualizado}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={salvarEtapas} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">💾 Salvar</button>
            <button className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400">📥 Importar</button>
            <button
              className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setMostrarSimulador(!mostrarSimulador)}
            >
              🧪 Simular
            </button>
          </div>
        </header>

        <div className="mb-4">
          <label className="text-sm font-medium mr-2">Modo:</label>
          <button
            onClick={() => setModoAvancado(false)}
            className={`px-4 py-2 rounded-l ${!modoAvancado ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Visual
          </button>
          <button
            onClick={() => setModoAvancado(true)}
            className={`px-4 py-2 rounded-r ${modoAvancado ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Avançado (JSON)
          </button>
        </div>

        {!modoAvancado ? (
          <>
            <BlocoEtapaVisual
              etapaId={1}
              etapas={etapasTemp}
              onChange={(etapasAtualizadas) => {
                setEtapasTemp(etapasAtualizadas);
                setEditado(true);
              }}
            />

            {mostrarSimulador && etapasTemp?.length > 0 && (
              <Simulador fluxo={etapasTemp} />
            )}
          </>
        ) : (
          <textarea
            className="w-full border p-4 rounded h-64 bg-white text-sm font-mono"
            placeholder="Cole aqui seu fluxo em JSON"
          />
        )}
      </main>
    </div>
  );
}
