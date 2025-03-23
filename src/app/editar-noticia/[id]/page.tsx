// app/noticias/[id]/page.tsx

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

export default async function EditarNoticia({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const noticia = await fetchNoticia(id);

  if (!noticia) {
    notFound(); // Mostra página 404 caso a notícia não seja encontrada
  }

  // Retorne o JSX com os dados da notícia
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        Editar Notícia
      </h1>

      <form className="bg-white p-6 rounded-lg shadow-lg">
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
          className="w-full bg-[#7208b4] text-white px-4 py-2 rounded-md"
        >
          Atualizar Notícia
        </button>
      </form>
    </div>
  );
}
