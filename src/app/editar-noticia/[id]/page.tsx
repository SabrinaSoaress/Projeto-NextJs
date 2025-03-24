'use client';
import { useParams, useRouter } from 'next/navigation';
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

async function fetchNoticia(id: number): Promise<Noticia | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/noticias/${id}`, {
      method: 'GET', 
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar a notícia, status: ' + res.status);
    }

    return await res.json();
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return null;
  }
}

async function atualizarNoticia(id: number, dados: Partial<Noticia>) {
  try {
    const res = await fetch(`http://localhost:3000/api/noticias/${id}`, {
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

export default function EditarNoticia() {
  const { id } = useParams(); 
  const idParsed = parseInt(id as string, 10); 
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const router = useRouter();  // Aqui estamos criando o hook useRouter

  useEffect(() => {
    const fetchData = async () => {
      const noticiaData = await fetchNoticia(idParsed);
      if (noticiaData) {
        setNoticia(noticiaData);
      } else {
        notFound(); 
      }
    };
    fetchData();
  }, [idParsed]);

  if (!noticia) {
    return <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-(--azul)">
        Carregando...
        </h1>
      </div>; 
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
      await atualizarNoticia(idParsed, dadosAtualizados);
      alert('Notícia atualizada com sucesso!');
      router.push('/noticias');  // Redireciona para a página de notícias
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
