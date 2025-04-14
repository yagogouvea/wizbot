
import React from 'react';
import CardContainer from '../components/CardContainer';

export default function BlocoEtapaVisual({
  etapaId,
  etapas,
  onChange
}) {
  const atualizarEtapa = (index, novosDados) => {
    const novasEtapas = [...etapas];
    novasEtapas[index] = { ...novasEtapas[index], ...novosDados };
    onChange(novasEtapas);
  };

  const adicionarOpcao = (index) => {
    const novasEtapas = [...etapas];
    novasEtapas[index].opcoes = novasEtapas[index].opcoes || [];
    novasEtapas[index].opcoes.push({
      texto: '',
      acao: 'mensagem',
      mensagem: '',
      submenu: [],
      numero: '',
      arquivo: null
    });
    onChange(novasEtapas);
  };

  const atualizarOpcao = (etapaIndex, opcaoIndex, novoValor) => {
    const novasEtapas = [...etapas];
    novasEtapas[etapaIndex].opcoes[opcaoIndex] = {
      ...novasEtapas[etapaIndex].opcoes[opcaoIndex],
      ...novoValor
    };
    onChange(novasEtapas);
  };

  const excluirOpcao = (etapaIndex, opcaoIndex) => {
    const novasEtapas = [...etapas];
    novasEtapas[etapaIndex].opcoes.splice(opcaoIndex, 1);
    onChange(novasEtapas);
  };

  const adicionarNovaEtapa = () => {
    onChange([...etapas, { mensagem: '', opcoes: [] }]);
  };

  return (
    <div className="space-y-6">
      {etapas.map((etapa, etapaIndex) => (
        <CardContainer key={etapaIndex} title={`Etapa ${etapaIndex + 1}`}>
          <textarea
            className="w-full border border-gray-400 bg-white p-2 rounded mb-4 text-sm"
            placeholder="Escolha uma opção abaixo"
            value={etapa.mensagem}
            onChange={e => atualizarEtapa(etapaIndex, { mensagem: e.target.value })}
          />

          {etapa.opcoes?.map((opcao, opcaoIndex) => (
            <div key={opcaoIndex} className="border border-gray-300 p-4 rounded-lg mb-3 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1 text-sm flex-1"
                  placeholder="Texto da opção"
                  value={opcao.texto}
                  onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { texto: e.target.value })}
                />
                <button
                  className="text-red-500 text-sm"
                  onClick={() => excluirOpcao(etapaIndex, opcaoIndex)}
                >
                  🗑️
                </button>
              </div>

              <select
                className="border border-gray-300 rounded px-3 py-1 text-sm w-full mb-2 bg-white"
                value={opcao.acao}
                onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { acao: e.target.value })}
              >
                <option value="mensagem">💬 Enviar mensagem</option>
                <option value="arquivo">📎 Enviar arquivo</option>
                <option value="redirecionar">📲 Redirecionar para número</option>
                <option value="submenu">🧩 Ir para novo menu</option>
              </select>

              {['mensagem', 'redirecionar', 'arquivo'].includes(opcao.acao) && (
                <textarea
                  className="w-full border border-gray-300 p-2 rounded text-sm mb-2"
                  placeholder="Mensagem que será enviada com a ação..."
                  value={opcao.mensagem}
                  onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { mensagem: e.target.value })}
                />
              )}

              {opcao.acao === 'redirecionar' && (
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-1 text-sm w-full mb-2"
                  placeholder="Número de WhatsApp: 5511999999999"
                  value={opcao.numero}
                  onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { numero: e.target.value })}
                />
              )}

              {opcao.acao === 'arquivo' && (
                <input
                  type="file"
                  className="block mb-2 text-sm"
                  onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { arquivo: e.target.files[0] })}
                />
              )}

              {opcao.acao === 'submenu' && (
                <div className="ml-4 pl-4 border-l-2 border-purple-300 mt-3">
                  <p className="font-medium text-sm mb-2 text-purple-700">Submenu: {opcao.texto || `Opção ${opcaoIndex + 1}`}</p>

                  <textarea
                    className="w-full border border-gray-300 p-2 rounded text-sm mb-3"
                    placeholder="Mensagem da etapa..."
                    value={opcao.mensagem}
                    onChange={e => atualizarOpcao(etapaIndex, opcaoIndex, { mensagem: e.target.value })}
                  />

                  {opcao.submenu?.map((sub, subIndex) => (
                    <div key={subIndex} className="mb-3 border border-gray-200 p-3 rounded bg-gray-50">
                      <input
                        type="text"
                        className="border border-gray-300 px-2 py-1 rounded flex-1 text-sm w-full mb-2"
                        placeholder="Texto do submenu"
                        value={sub.texto || ''}
                        onChange={e => {
                          const novas = [...opcao.submenu];
                          novas[subIndex] = { ...novas[subIndex], texto: e.target.value };
                          atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                        }}
                      />

                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-2 bg-white"
                        value={sub.acao || 'mensagem'}
                        onChange={e => {
                          const novas = [...opcao.submenu];
                          novas[subIndex] = { ...novas[subIndex], acao: e.target.value };
                          atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                        }}
                      >
                        <option value="mensagem">💬 Enviar mensagem</option>
                        <option value="arquivo">📎 Enviar arquivo</option>
                        <option value="redirecionar">📲 Redirecionar para número</option>
                      </select>

                      {['mensagem', 'arquivo', 'redirecionar'].includes(sub.acao) && (
                        <textarea
                          className="w-full border p-2 rounded text-sm mb-2"
                          placeholder="Mensagem da ação"
                          value={sub.mensagem || ''}
                          onChange={e => {
                            const novas = [...opcao.submenu];
                            novas[subIndex] = { ...novas[subIndex], mensagem: e.target.value };
                            atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                          }}
                        />
                      )}

                      {sub.acao === 'redirecionar' && (
                        <input
                          type="text"
                          className="border px-2 py-1 rounded text-sm w-full mb-2"
                          placeholder="Número para redirecionamento"
                          value={sub.numero || ''}
                          onChange={e => {
                            const novas = [...opcao.submenu];
                            novas[subIndex] = { ...novas[subIndex], numero: e.target.value };
                            atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                          }}
                        />
                      )}

                      {sub.acao === 'arquivo' && (
                        <input
                          type="file"
                          className="block text-sm"
                          onChange={e => {
                            const novas = [...opcao.submenu];
                            novas[subIndex] = { ...novas[subIndex], arquivo: e.target.files[0] };
                            atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                          }}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => {
                      const novas = [...(opcao.submenu || []), { texto: '', acao: 'mensagem', mensagem: '' }];
                      atualizarOpcao(etapaIndex, opcaoIndex, { submenu: novas });
                    }}
                  >
                    ➕ Adicionar opção
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => adicionarOpcao(etapaIndex)}
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded mt-2"
          >
            + Adicionar Opção
          </button>
        </CardContainer>
      ))}

      <button
        onClick={adicionarNovaEtapa}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-4 text-sm"
      >
        ➕ Nova Etapa
      </button>
    </div>
  );
}
