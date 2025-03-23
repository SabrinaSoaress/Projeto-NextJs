'use client'; // Não é necessário se você não quiser usar client-side completamente, mas vou mover a busca para o cliente.

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Noticia {
  id: string;
  titulo: string;
  noticia: string;
  imagem: string;
}

// Função para buscar as notícias
async function fetchNoticias() {
  const res = await fetch('http://localhost:3000/noticias.json');
  const noticias = await res.json();
  return noticias;
}

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [noticiasFiltradas, setNoticiasFiltradas] = useState<Noticia[]>([]);

  // Carrega as notícias na inicialização
  useEffect(() => {
    async function loadNoticias() {
      const noticiasData = await fetchNoticias();
      setNoticias(noticiasData);
      setNoticiasFiltradas(noticiasData);
    }
    loadNoticias();
  }, []);

  // Filtra as notícias conforme a pesquisa
  useEffect(() => {
    setNoticiasFiltradas(
      noticias.filter((noticia: Noticia) =>
        noticia.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        noticia.noticia.toLowerCase().includes(pesquisa.toLowerCase())
      )
    );
  }, [pesquisa, noticias]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        Notícias
      </h1>

      {/* Barra de Pesquisa */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Pesquise sua notícia por título ou conteúdo..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {noticiasFiltradas.length > 0 ? (
          noticiasFiltradas.map((noticia: Noticia) => (
            <Link key={noticia.id} href={`/noticias/${noticia.id}`} passHref>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{noticia.titulo}</h2>
                <p className="text-gray-600 text-base">{noticia.noticia}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma notícia encontrada.</p>
        )}
      </div>
    </div>
  );
}
