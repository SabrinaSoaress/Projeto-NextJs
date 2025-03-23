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

export default async function Home({ searchParams }: { searchParams: { pagina?: string } }) {
  // Página atual (usando o searchParams.pagina ou valor padrão de 1)
  const paginaAtual = parseInt(searchParams.pagina || '1');
  const noticias = await fetchNoticias();
  const totalDeNoticias = noticias.length;

  // Calcula o intervalo de notícias a serem exibidas para a página atual
  const noticiasPagina = noticias.slice(0, paginaAtual * 6); // A cada clique, adicionamos mais 6 notícias

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        Notícias
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticiasPagina.map((noticia: Noticia) => (
          <Link href={`/noticias/${noticia.id}`}>
          <div
            key={noticia.id}  // Alterado para usar 'noticia.id' como chave
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={noticia.imagem}
              alt={noticia.titulo}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{noticia.titulo}</h2>
            <p className="text-gray-600 text-base">{noticia.noticia}</p>

          </div>
            </Link>
        ))}
      </div>

      {/* Botão para carregar mais notícias */}
      {paginaAtual * 6 < totalDeNoticias && (
        <div className="mt-6 text-center">
          <Link href={`/?pagina=${paginaAtual + 1}`}>
            <button className="px-6 py-3 bg-[#2c039e] text-white rounded-lg hover:bg-[#7208b4] transition cursor-pointer">
              Carregar mais
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
