'use client';

import { useState } from 'react';

async function deletarNoticia(id: number) {
  const res = await fetch(`http://localhost:3000/noticias/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    window.location.href = '/noticias';
  } else {
    alert('Erro ao deletar a notícia');
  }
}

export default function NoticiaActions({ id }: { id: number }) {
  return (
    <div className="flex justify-between mt-4">
      <a
        href={`/editar-noticia/${id}`}
        className="bg-[#2c039e] text-white px-4 py-2 rounded-md"
      >
        Editar
      </a>
      <button
        onClick={() => deletarNoticia(id)}
        className="bg-[#f502f6] text-white px-4 py-2 rounded-md"
      >
        Remover
      </button>
    </div>
  );
}
