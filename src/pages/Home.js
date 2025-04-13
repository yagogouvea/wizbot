import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <img src="/img/logo-wizbot.png" alt="WizBot Logo" className="h-16" />
        </div>
        <nav className="space-x-6 text-base font-semibold text-gray-700">
          <a href="#caracteristicas" className="hover:text-blue-500">Características</a>
          <a href="#precos" className="hover:text-blue-500">Preços</a>
          <a href="#contato" className="hover:text-blue-500">Contato</a>
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Acessar</a>
        </nav>
      </header>

      {/* Hero Section com imagem do celular ao lado */}
      <section className="py-16 px-6 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Automatize seu atendimento no WhatsApp
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Venda mais com menos esforço usando mensagens automatizadas e inteligência artificial
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Experimente agora
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
              Ver demonstração
            </button>
          </div>
        </div>
        <img src="/img/phone-preview.png" alt="Preview Celular" className="w-72 md:w-96" />
      </section>

      {/* Funcionalidades novas - mais próximas da seção anterior */}
      <section className="py-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6 text-center">
          <div>
            <div className="text-5xl mb-2">🤖</div>
            <h3 className="font-bold mb-1">IA Personalizada</h3>
            <p className="text-sm text-gray-600">Respostas inteligentes com base no seu negócio.</p>
          </div>
          <div>
            <div className="text-5xl mb-2">📁</div>
            <h3 className="font-bold mb-1">Histórico de Clientes</h3>
            <p className="text-sm text-gray-600">Visualize e gerencie todas as conversas anteriores.</p>
          </div>
          <div>
            <div className="text-5xl mb-2">📋</div>
            <h3 className="font-bold mb-1">Menus Automáticos</h3>
            <p className="text-sm text-gray-600">Crie fluxos de atendimento objetivos com rapidez.</p>
          </div>
          <div>
            <div className="text-5xl mb-2">🔌</div>
            <h3 className="font-bold mb-1">Integração Simples</h3>
            <p className="text-sm text-gray-600">Conecte facilmente ao seu número em minutos.</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Depoimentos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-bold">João, Loja Exemplo</p>
                <div className="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p className="text-sm">"Reduzi em 80% o tempo de atendimento com o WizBot."</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-bold">Ana, Clínica Digital</p>
                <div className="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p className="text-sm">"O sistema de IA parece um atendente humano!"</p>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="px-6 py-12 max-w-5xl mx-auto bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Planos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 shadow bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Plano Basic</h3>
            <p className="text-2xl font-bold mb-2">R$ 149<span className="text-base font-normal">/mês</span></p>
            <ul className="text-sm text-gray-600 mb-4">
              <li>Menus</li>
              <li>WhatsApp 1x</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Assinar</button>
          </div>
          <div className="border rounded-lg p-6 shadow bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Plano Pro IA</h3>
            <p className="text-2xl font-bold mb-2">R$ 249<span className="text-base font-normal">/mês</span></p>
            <ul className="text-sm text-gray-600 mb-4">
              <li>Menus + IA</li>
              <li>WhatsApp 1x</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Assinar</button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-400 py-8 border-t mt-10">
        <p className="mb-2">&copy; 2025 WizBot — Seu atendimento inteligente no WhatsApp.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Termos de Uso</a>
          <a href="#" className="hover:underline">Política de Privacidade</a>
          <a href="#" className="hover:underline">Fale Conosco</a>
        </div>
      </footer>
    </div>
  );
}
