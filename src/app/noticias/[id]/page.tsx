import { notFound } from 'next/navigation';

interface Noticia {
  id: string;
  titulo: string;
  noticia: string;
  conteudo: string;
  autor: string;
  imagem: string;
  data_publicacao: string;
}

async function fetchNoticiaById(id: string): Promise<Noticia | null> {
  const res = await fetch('http://localhost:3000/noticias.json');
  const noticias = await res.json();
  return noticias.find((noticia: Noticia) => noticia.id === id) || null;
}

export default async function NoticiaDetalhes({ params }: { params: { id: string } }) {
  const noticia = await fetchNoticiaById(params.id);

  if (!noticia) {
    notFound(); // Retorna uma página 404 se a notícia não for encontrada
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        {noticia.titulo}
      </h1>

      <img
        src={noticia.imagem}
        alt={noticia.titulo}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-600 text-base">{noticia.noticia}</p>
      <p className="text-gray-600 text-base mt-6">{noticia.conteudo}</p>
      <p className="text-gray-600 text-base mt-6">Publicado por: {noticia.autor}</p>
      <p className="text-gray-600 text-base mt-6">Data: {new Date(noticia.data_publicacao).toLocaleDateString()}</p>
    </div>
  );
}
