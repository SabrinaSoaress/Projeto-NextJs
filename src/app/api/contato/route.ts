import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contatoFilePath = path.join(process.cwd(), 'public', 'contato.json');

// Função para ler o arquivo de forma assíncrona
const readContato = (): any[] => {
  const data = fs.readFileSync(contatoFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever no arquivo de forma assíncrona
const writeContato = (contato: any[]): void => {
  fs.writeFileSync(contatoFilePath, JSON.stringify(contato, null, 2));
};

// Handle POST request
export async function POST(req: Request) {
  try {
    const novoContato = await req.json(); // aqui usa 'novoContato', para ficar consistente

    const contato = readContato();

    // Gerar ID único 
    const novoId = contato.length > 0 ? Math.max(...contato.map((n: any) => n.id)) + 1 : 1;

    const contatoComId = { ...novoContato, id: novoId };

    contato.push(contatoComId);

    writeContato(contato);

    return NextResponse.json(contatoComId, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao adicionar contato' }, { status: 500 });
  }
}
