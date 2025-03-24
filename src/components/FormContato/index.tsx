'use client'
import { useState } from 'react';

const FormContato = () => {
  // Declaração dos estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

   // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // não deixa recarregar a página
  
    const response = await fetch('/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Envia os dados como JSON
      },
      body: JSON.stringify({ // Converte os dados em JSON para o corpo da requisição
        nome,
        telefone,
        email,
        mensagem,
      }),
    });
  
    const data = await response.json(); // Converte a resposta em JSON
    if (response.ok) {
      console.log('Mensagem enviada com sucesso:', data);
    } else {
      console.log('Erro ao enviar a mensagem:', data);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          id="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={4}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-(--roxo) text-white py-2 px-4 rounded-md hover:bg-(--azul) focus:outline-none"
      >
        Enviar
      </button>
    </form>
  );
};

export default FormContato;
