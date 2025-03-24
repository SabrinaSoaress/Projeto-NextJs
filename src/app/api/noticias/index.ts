import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const noticiasFilePath = path.join(process.cwd(), 'noticias.json');

// Função para ler o arquivo de notícias
const readNoticias = () => {
  const data = fs.readFileSync(noticiasFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever no arquivo de notícias
const writeNoticias = (noticias: any[]) => {
  fs.writeFileSync(noticiasFilePath, JSON.stringify(noticias, null, 2));
};

// Handle POST request
export async function POST(req: Request) {
  const novaNoticia = await req.json();

  const noticias = readNoticias();

  // Gerar ID único para a nova notícia
  const novoId = noticias.length > 0 ? Math.max(...noticias.map((n: any) => n.id)) + 1 : 1;

  const noticiaComId = { ...novaNoticia, id: novoId };

  noticias.push(noticiaComId);

  writeNoticias(noticias);

  return NextResponse.json(noticiaComId, { status: 201 });
}
