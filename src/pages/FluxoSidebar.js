import React, { useState } from 'react';

export default function FluxoSidebar({
  fluxos,
  fluxoSelecionadoId,
  onSelecionar,
  onAtivar,
  onExcluir,
  onRenomear,
  onCriarNovo,
  fluxoEditado
}) {
  const [emEdicao, setEmEdicao] = useState(null);
  const [novoNome, setNovoNome] = useState('');

  const handleSalvarNome = (fluxo) => {
    if (novoNome.trim() !== '') {
      onRenomear(fluxo.id, novoNome.trim());
      setEmEdicao(null);
      setNovoNome('');
    }
  };

  const handleTrocarFluxo = (fluxo) => {
    if (fluxo.id !== fluxoSelecionadoId) {
      if (fluxoEditado) {
        const confirmar = window.confirm('Você tem alterações não salvas. Deseja sair sem salvar?');
        if (!confirmar) return;
      }
      onSelecionar(fluxo);
    }
  };

  return (
    <aside className="w-72 bg-white shadow px-4 py-6 border-r overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Meus Fluxos</h2>
      <ul className="space-y-3">
        {fluxos.map((fluxo) => (
          <li
            key={fluxo.id}
            className={`p-3 rounded border ${fluxoSelecionadoId === fluxo.id ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'} cursor-pointer`}
            onClick={() => handleTrocarFluxo(fluxo)}
          >
            <div className="flex justify-between items-center">
              {emEdicao === fluxo.id ? (
                <>
                  <input
                    type="text"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="border px-2 py-1 rounded text-sm w-full mr-2"
                  />
                  <button className="text-green-600 text-xs ml-1" onClick={() => handleSalvarNome(fluxo)}>✔️</button>
                </>
              ) : (
                <>
                  <span className="font-medium text-sm">{fluxo.nome}</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-xs" onClick={(e) => { e.stopPropagation(); setEmEdicao(fluxo.id); setNovoNome(fluxo.nome); }}>✏️</button>
                    <button className="text-xs text-red-500" onClick={(e) => { e.stopPropagation(); if (window.confirm('Tem certeza que deseja excluir este fluxo?')) onExcluir(fluxo.id); }}>🗑️</button>
                    <button
                      className={`text-xs px-1 py-0.5 rounded ${fluxo.ativo ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                      onClick={(e) => { e.stopPropagation(); onAtivar(fluxo.id); }}
                    >
                      {fluxo.ativo ? 'Ativo' : 'Ativar'}
                    </button>
                  </div>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500">{fluxo.etapas.length} personalizações</p>
            <p className="text-xs text-gray-400">Atualizado: {fluxo.atualizado}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={onCriarNovo}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        ➕ Novo Fluxo
      </button>
    </aside>
  );
}
