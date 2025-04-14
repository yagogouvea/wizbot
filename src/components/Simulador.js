
import React, { useState } from 'react';

export default function Simulador({ fluxo }) {
  const [historico, setHistorico] = useState([]);
  const [pilhaEtapas, setPilhaEtapas] = useState([{ tipo: 'etapas', data: fluxo }]);
  const [indiceEtapaAtual, setIndiceEtapaAtual] = useState(0);
  const [opcoesTemp, setOpcoesTemp] = useState(null);

  const topo = pilhaEtapas[pilhaEtapas.length - 1];
  const etapaAtual = topo.tipo === 'etapas' ? topo.data[indiceEtapaAtual] : null;
  const opcoesAtuais = opcoesTemp || (topo.tipo === 'opcoes' ? topo.data : etapaAtual?.opcoes);

  const handleOpcao = (opcao) => {
    const novaMensagemUsuario = { tipo: 'usuario', texto: opcao.texto };
    const novaMensagemBot = { tipo: 'bot', texto: opcao.mensagem || '...' };
    setHistorico(prev => [...prev, novaMensagemUsuario, novaMensagemBot]);

    setOpcoesTemp(null); // limpa opções da tela após clique

    // 🔧 Correção: remove pilha se for submenu simples
    if (topo.tipo === 'opcoes') {
      setPilhaEtapas(prev => prev.slice(0, -1));
    }

    if (opcao.acao === 'submenu' && Array.isArray(opcao.submenu)) {
      if (opcao.submenu[0]?.opcoes) {
        setPilhaEtapas(prev => [...prev, { tipo: 'etapas', data: opcao.submenu }]);
        setIndiceEtapaAtual(0);
      } else {
        setPilhaEtapas(prev => [...prev, { tipo: 'opcoes', data: opcao.submenu }]);
        setOpcoesTemp(opcao.submenu);
      }
    } else if (topo.tipo === 'etapas') {
      setIndiceEtapaAtual(prev => prev + 1);
    }
  };

  const handleVoltar = () => {
    if (opcoesTemp) {
      setOpcoesTemp(null);
    } else if (topo.tipo === 'opcoes') {
      setPilhaEtapas(prev => prev.slice(0, -1));
    } else if (indiceEtapaAtual > 0) {
      setIndiceEtapaAtual(prev => prev - 1);
    } else if (pilhaEtapas.length > 1) {
      setPilhaEtapas(prev => prev.slice(0, -1));
      setIndiceEtapaAtual(0);
    }
    setHistorico(h => h.slice(0, -2));
  };

  const handleResetar = () => {
    setHistorico([]);
    setPilhaEtapas([{ tipo: 'etapas', data: fluxo }]);
    setIndiceEtapaAtual(0);
    setOpcoesTemp(null);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 max-w-md mx-auto mt-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">🧪 Simulador de Conversa</h2>

      <div className="flex flex-col gap-2 mb-4 max-h-96 overflow-y-auto px-1">
        {historico.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.tipo === 'usuario'
                ? 'self-end bg-blue-100'
                : msg.tipo === 'bot'
                ? 'self-start bg-gray-100'
                : 'text-center text-gray-500'
            } px-4 py-2 rounded-2xl text-sm max-w-[70%]`}
          >
            {msg.texto}
          </div>
        ))}

        {etapaAtual?.mensagem && topo.tipo !== 'opcoes' && (
          <div className="self-start bg-gray-100 px-4 py-2 rounded-2xl text-sm max-w-[70%]">
            {etapaAtual.mensagem}
          </div>
        )}

        {opcoesAtuais?.map((opcao, idx) => (
          <button
            key={idx}
            className="mt-2 w-full text-left bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
            onClick={() => handleOpcao(opcao)}
          >
            {opcao.texto || '(opção sem texto)'}
          </button>
        ))}

        {!etapaAtual && topo.tipo === 'etapas' && (
          <p className="text-gray-500 text-sm italic text-center mt-4">Fim da simulação.</p>
        )}
      </div>

      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={handleVoltar}
          disabled={historico.length === 0}
          className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          🔙 Voltar
        </button>
        <button
          onClick={handleResetar}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>
  );
}
