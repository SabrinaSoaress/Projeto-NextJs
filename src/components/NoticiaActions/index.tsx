'use client';

import { useRouter } from 'next/navigation';

// Função assíncrona para deletar uma notícia
async function deletarNoticia(id: number, router: any) {
  try {
    const response = await fetch(`/api/noticias/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Pega a mensagem de erro do corpo da resposta
      console.error(`Erro ao remover notícia: ${errorData.message}`);
    } else {
      alert('Notícia removida com sucesso');

      router.push('/noticias');
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição', error);
  }
}

// renderiza os botões de "Editar" e "Remover"
export default function NoticiaActions({ id }: { id: number }) {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-4">
      <a
        href={`/editar-noticia/${id}`}
        className="bg-(--azul) text-white px-4 py-2 rounded-md"
      >
        Editar
      </a>
      <button
        onClick={() => deletarNoticia(id, router)}
        className="bg-(--rosa) text-white px-4 py-2 rounded-md"
      >
        Remover
      </button>
    </div>
  );
}
