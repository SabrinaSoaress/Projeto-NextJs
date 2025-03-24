'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { use } from 'react';

interface Evento {
  id: number;
  nome: string;
  data_hora: string;
  imagem: string;
  criadores: string[];
  tema: string;
  local: string;
  valor_ingresso: number;
}

async function fetchEventoById(id: number): Promise<Evento | null> {
  const res = await fetch(`http://localhost:3000/eventos.json`);
  const data = await res.json();
  return data.eventos.find((evento: Evento) => evento.id === id) || null;
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

function calcularContagemRegressiva(dataEvento: string): string {
  const dataAtual = new Date();
  const dataEventoDate = new Date(dataEvento);
  const tempoRestante = dataEventoDate.getTime() - dataAtual.getTime();

  if (tempoRestante <= 0) {
    return "O evento já aconteceu!";
  }

  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

  return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

export default function EventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Usando o hook `use` para desestruturar `params`

  const [evento, setEvento] = useState<Evento | null>(null);
  const [contagemRegressiva, setContagemRegressiva] = useState<string>('');

  useEffect(() => {
    async function carregarEvento() {
      const evento = await fetchEventoById(parseInt(id, 10));
      if (!evento) {
        notFound();
      } else {
        setEvento(evento);
      }
    }

    carregarEvento();
  }, [id]);

  useEffect(() => {
    if (evento) {
      const intervalId = setInterval(() => {
        setContagemRegressiva(calcularContagemRegressiva(evento.data_hora));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [evento]);

  if (!evento) {
    return null; // Ou um loading spinner, se preferir
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">{evento.nome}</h1>

      <Link href="/eventos" className="text-(--rosa) hover:text-(--azul) mb-4 inline-block">
        Voltar para a lista de eventos
      </Link>

      <img src={evento.imagem} alt={evento.nome}
        className="w-full h-48 object-cover rounded-lg mb-4" />

      <div className="mb-6">
        <p className="text-xl text-gray-800 mb-4">{evento.tema}</p>
        <p className="text-lg text-gray-700 mb-4">{evento.local}</p>
        <p className="text-lg text-gray-700 mb-4">{formatarDataHora(evento.data_hora)}</p>
        <p className="text-lg text-gray-500 mb-4">{evento.criadores.join(', ')}</p>
        <p className="text-lg font-semibold text-gray-900">Preço do ingresso: R$ {evento.valor_ingresso.toFixed(2)}</p>

        <div className="bg-white m-2 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <p className="text-2xl font-bold mt-6 text-center text-(--rosa)">{contagemRegressiva}</p>
        </div>
      </div>
    </div>
  );
}
