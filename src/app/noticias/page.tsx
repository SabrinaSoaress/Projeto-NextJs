import React from 'react';

interface Noticia {
  titulo: string;
  conteudo: string;
  imagem: string;
}

// Função para buscar as notícias
async function fetchNoticias() {
  const res = await fetch('http://localhost:3000/noticias.json');
  const noticias = await res.json();
  return noticias;
}

const Home = async () => {
  const noticias = await fetchNoticias(); // Busca as notícias diretamente

  return (
    <div>
      <h1 className='text-center mt-5 mb-2 font-bold text-3xl'>Notícias</h1>
      <div className='flex flex-col gap-4 mx-2'>
      <ul>
        {noticias.map((noticia: Noticia, index: number) => (
          <li key={index} className='bg-gray-200 p-4 rounded-md'>
            <h2 className='font-bold'>{noticia.titulo}</h2>
            <p>{noticia.conteudo}</p>
            <img src={noticia.imagem} alt={noticia.titulo} />
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Home;
