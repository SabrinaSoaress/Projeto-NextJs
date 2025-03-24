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

// Handle GET, PUT, DELETE requests
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const noticias = readNoticias();
  const noticia = noticias.find((n: { id: number }) => n.id === parseInt(params.id));
  if (!noticia) {
    return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
  }
  return NextResponse.json(noticia);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const noticias = readNoticias();
  const index = noticias.findIndex((n: { id: number }) => n.id === parseInt(params.id));
  if (index === -1) {
    return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
  }

  const updatedNoticia = await req.json();
  noticias[index] = updatedNoticia;
  writeNoticias(noticias);

  return NextResponse.json(updatedNoticia);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const noticias = readNoticias();
  const index = noticias.findIndex((n: { id: number }) => n.id === parseInt(params.id));
  if (index === -1) {
    return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
  }

  noticias.splice(index, 1);
  writeNoticias(noticias);

  return NextResponse.json({ message: 'Notícia removida com sucesso' });
}
