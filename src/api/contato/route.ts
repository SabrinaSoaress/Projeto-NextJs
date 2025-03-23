import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';  // Usando Prisma para acessar o banco de dados, mas você pode usar qualquer banco de dados ou serviço

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nome, telefone, email, mensagem } = await request.json();

    // Validação simples
    if (!nome || !telefone || !email || !mensagem) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    // Salvar dados no banco de dados (ou outro serviço)
    const contato = await prisma.contato.create({
      data: {
        nome,
        telefone,
        email,
        mensagem,
      },
    });

    return NextResponse.json({ message: "Mensagem enviada com sucesso!", contato });
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    return NextResponse.json({ message: "Erro ao enviar a mensagem." }, { status: 500 });
  }
}
