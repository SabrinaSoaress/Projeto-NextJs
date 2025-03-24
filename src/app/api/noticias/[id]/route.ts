import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const noticiasFilePath = path.join(process.cwd(), 'public', 'noticias.json');

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
  try {
    const novaNoticia = await req.json();

    const noticias = readNoticias();

    // Gerar ID único para a nova notícia
    const novoId = noticias.length > 0 ? Math.max(...noticias.map((n: any) => n.id)) + 1 : 1;

    const noticiaComId = { ...novaNoticia, id: novoId };

    noticias.push(noticiaComId);

    writeNoticias(noticias);

    return NextResponse.json(noticiaComId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao adicionar notícia' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split('/').pop() || '');
    
    console.log('ID recebido:', id);  // Adiciona o log para verificar o ID recebido

    if (isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    const noticias = readNoticias();
    const noticiaIndex = noticias.findIndex((noticia: any) => noticia.id === id);

    if (noticiaIndex === -1) {
      return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
    }

    noticias.splice(noticiaIndex, 1);

    // Salva as notícias atualizadas de volta no arquivo
    writeNoticias(noticias);

    console.log('Notícia removida com sucesso'); // Adiciona o log de sucesso

    return NextResponse.json({ message: 'Notícia removida com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao remover notícia:', error);  // Log do erro
    return NextResponse.json({ message: 'Erro ao remover notícia' }, { status: 500 });
  }
}

// Função para lidar com o GET (busca a notícia pelo ID)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const noticias = readNoticias();
  const noticia = noticias.find((n: any) => n.id === id);

  if (!noticia) {
    return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
  }

  return NextResponse.json(noticia);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const dadosAtualizados = await req.json(); // Obtém os dados da notícia a ser atualizada
  const noticias = readNoticias();

  const noticiaIndex = noticias.findIndex((noticia: any) => noticia.id === id);

  if (noticiaIndex === -1) {
    return NextResponse.json({ message: 'Notícia não encontrada' }, { status: 404 });
  }

  // Atualiza os dados da notícia
  noticias[noticiaIndex] = { ...noticias[noticiaIndex], ...dadosAtualizados };

  // Salva as notícias no arquivo
  writeNoticias(noticias);

  return NextResponse.json(noticias[noticiaIndex], { status: 200 });
}
