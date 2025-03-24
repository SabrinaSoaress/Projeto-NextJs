import Link from "next/link";
import NoticiaActions from "../../../components/NoticiaActions";


type Noticia = {
  id: number;
  titulo: string;
  noticia: string;
  conteudo: string;
  data_publicacao: string;
  autor: string;
  imagem: string;
};

async function fetchNoticia(id: number) {
  const res = await fetch(`http://localhost:3000/noticias.json`);
  const noticias = await res.json();
  return noticias.find((noticia: Noticia) => noticia.id === id);
}

function formatarDataHora(dataHora: string): string {
  const data = new Date(dataHora);

  const dia = String(data.getDate()).padStart(2, '0');
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia} ${mes} ${ano}, ${horas}:${minutos}`;
}

export default async function NoticiaDetalhada({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const noticia = await fetchNoticia(id);

  if (!noticia) {
    return <p>Notícia não encontrada</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/noticias" className="text-(--rosa) hover:text-(--azul) mb-4 inline-block">
        Voltar para as Notícias
      </Link>
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        {noticia.titulo}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-400 text-center m-2"> Publicado em: {formatarDataHora(noticia.data_publicacao)}</p>
        <p className="text-gray-400 text-center m-2"> Por: {noticia.autor} </p>
        <p className="text-gray-600 text-base">{noticia.noticia}</p>
        <p className="text-gray-600 text-base mt-4">{noticia.conteudo}</p>

        {/* Usando o componente NoticiaActions para os botões de editar e remover */}
        <NoticiaActions id={noticia.id} />
      </div>
    </div>
  );
}
