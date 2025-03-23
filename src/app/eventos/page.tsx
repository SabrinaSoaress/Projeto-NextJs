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

// Função para buscar os Eventos
async function fetchEventos() {
  const res = await fetch('http://localhost:3000/eventos.json');
  const data = await res.json();
  return data.eventos;  // Acessa o array de eventos dentro da chave "eventos"
}

// Função para formatar a data e hora no formato desejado (DD-MM-YYYY HH:MM)
function formatarDataHora(dataHora: string): string {
  const data = new Date(dataHora);

  const dia = String(data.getDate()).padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
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

export default async function Home() {
  const eventos = await fetchEventos();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
        Eventos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento: Evento) => (
          <Link key={evento.id} href={`/eventos/${evento.id}`} passHref>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {/* Ajustar imagem caso exista no JSON */}
              <img
                src={evento.imagem}
                alt={evento.nome}
                className="w-full h-48 bg-gray-300 rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{evento.nome}</h2>
              <p className="text-gray-700 text-base">{formatarDataHora(evento.data_hora)}</p>
              <p className="text-gray-500 text-base">{evento.criadores.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
