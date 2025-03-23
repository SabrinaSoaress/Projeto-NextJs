import { notFound } from 'next/navigation';
import Link from 'next/link';

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

export default async function EventoPage({ params }: { params: { id: string } }) {
  const evento = await fetchEventoById(parseInt(params.id, 10));

  if (!evento) {
    notFound(); // Se o evento não for encontrado, chama a função `notFound` para renderizar a página 404
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/eventos" className="text-[#f502f6] mb-4 inline-block">
        Voltar para a lista de eventos
      </Link>

      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">{evento.nome}</h1>

      <img src={evento.imagem} alt={evento.nome}
        className="w-full h-48 object-cover rounded-lg mb-4"/>

      <div className="mb-6">
        <p className="text-xl text-gray-800 mb-4">{evento.tema}</p>
        <p className="text-lg text-gray-700 mb-4">{evento.local}</p>
        <p className="text-lg text-gray-700 mb-4">{formatarDataHora(evento.data_hora)}</p>
        <p className="text-lg text-gray-500 mb-4">{evento.criadores.join(', ')}</p>
        <p className="text-lg font-semibold text-gray-900">Preço do ingresso: R$ {evento.valor_ingresso.toFixed(2)}</p>
      </div>
    </div>
  );
}
