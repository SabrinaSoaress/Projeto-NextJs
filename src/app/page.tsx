import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-(--azul)">Bem-vindo à Connect !</h1>
        <p className=" text-base text-gray-500 m-9">
        Aqui, você encontra notícias atualizadas sobre os mais diversos assuntos, além de informações sobre eventos de seu interesse e muito mais. Seja para se manter informado, acompanhar eventos locais ou descobrir novas tendências, nosso site oferece conteúdo relevante e de qualidade, sempre em tempo real. Não deixe de explorar tudo o que preparamos para você!.
        </p>
      </header>

      <div className="flex flex-col items-center space-y-4">
          <button className="px-6 py-3 bg-transparent border-2 border-(--rosa) text-(--rosa) text-lg rounded-md shadow-md hover:bg-(--rosa) hover:text-white transition">
          <Link href={'/contato'}>
          Entre em Contato
          </Link>
        </button>
      </div>

    </div>
  )
}

export default Home
