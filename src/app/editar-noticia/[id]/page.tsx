// app/editar-noticia/[id]/page.tsx

'use client'; // Coloque a diretiva 'use client' no topo do arquivo

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Noticia = {
  id: number;
  titulo: string;
  noticia: string;
  conteudo: string;
  data_publicacao: string;
  autor: string;
  imagem: string;
};

// Função para buscar a notícia diretamente no servidor
async function fetchNoticia(id: number): Promise<Noticia | null> {
  const res = await fetch(`http://localhost:3000/noticias.json`);
  const noticias = await res.json();
  return noticias.find((noticia: Noticia) => noticia.id === id) || null;
}

// Função para atualizar a notícia
async function atualizarNoticia(id: number, dados: Partial<Noticia>) {
  try {
    const res = await fetch(`http://localhost:3000/noticias/${id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok) {
      throw new Error('Erro ao atualizar a notícia');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Componente Client
export default function EditarNoticia({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10); // Obtendo o ID a partir do parâmetro da URL

  const [noticia, setNoticia] = useState<Noticia | null>(null);

  useEffect(() => {
    // Função para buscar a notícia
    const fetchData = async () => {
      const noticiaData = await fetchNoticia(id);
      setNoticia(noticiaData);
    };
    fetchData();
  }, [id]);

  if (!noticia) {
    return <div>Carregando...</div>; // Exibe um carregando enquanto os dados são buscados
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const dadosAtualizados = {
      titulo: formData.get('titulo') as string,
      noticia: formData.get('noticia') as string,
      conteudo: formData.get('conteudo') as string,
      autor: formData.get('autor') as string,
    };

    try {
      await atualizarNoticia(id, dadosAtualizados);
      alert('Notícia atualizada com sucesso!');
    } catch (error) {
      alert('Não foi possível atualizar a notícia.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        Editar Notícia
      </h1>

      <Link href="/noticias" className="text-(--rosa) hover:text-(--azul) mb-4 inline-block">
        Voltar para as Notícias
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-700">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            defaultValue={noticia.titulo}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noticia" className="block text-gray-700">Notícia</label>
          <textarea
            id="noticia"
            name="noticia"
            defaultValue={noticia.noticia}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="conteudo" className="block text-gray-700">Conteúdo</label>
          <textarea
            id="conteudo"
            name="conteudo"
            defaultValue={noticia.conteudo}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="autor" className="block text-gray-700">Autor</label>
          <input
            type="text"
            id="autor"
            name="autor"
            defaultValue={noticia.autor}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-(--roxo) text-white px-4 py-2 rounded-md">
          Atualizar Notícia
        </button>
      </form>
    </div>
  );
}
