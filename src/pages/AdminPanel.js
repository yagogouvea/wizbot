import React, { useState } from 'react';

export default function AdminPanel() {
  const [email, setEmail] = useState('');
  const [clientData, setClientData] = useState(null);

  // Mock de dados temporário para simulação
  const mockDatabase = {
    'cliente@exemplo.com': {
      nome: 'Loja Exemplo',
      plano: 'Plano Personalizado',
      menu: '{ "inicio": "Olá, posso ajudar!", "opcoes": ["Agendamento", "Dúvidas"] }',
      mensagensHorario: 'Atendemos de segunda a sexta, das 9h às 18h.'
    }
  };

  const buscarCliente = () => {
    const dados = mockDatabase[email];
    if (dados) {
      setClientData(dados);
    } else {
      setClientData(null);
      alert('Cliente não encontrado.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>

      {/* Busca por e-mail */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-md">
        <label className="block text-sm font-medium mb-2">Buscar cliente por e-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          placeholder="exemplo@dominio.com"
        />
        <button
          onClick={buscarCliente}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Dados do cliente */}
      {clientData && (
        <div className="bg-white p-4 rounded shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Nome:</label>
            <input
              value={clientData.nome}
              className="w-full border rounded p-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Plano:</label>
            <input
              value={clientData.plano}
              className="w-full border rounded p-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Menu Personalizado (JSON):</label>
            <textarea
              defaultValue={clientData.menu}
              rows={4}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Mensagens de Horário:</label>
            <textarea
              defaultValue={clientData.mensagensHorario}
              rows={2}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar</button>
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Redefinir</button>
          </div>
        </div>
      )}
    </div>
  );
}
