import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[#2c039e]">Bem-vindo à nossa Landing Page!</h1>
        <p className="mt-4 text-xl text-gray-700">
          Conecte-se com nossos produtos e soluções incríveis.
        </p>
      </header>

      <div className="flex flex-col items-center space-y-4">
      <button className="px-6 py-3 bg-[#7208b4] text-white text-lg rounded-md shadow-md hover:bg-[#2c039e] transition">
          Saiba Mais
        </button>
          <button className="px-6 py-3 bg-transparent border-2 border-[#f502f6] text-[#f502f6] text-lg rounded-md shadow-md hover:bg-[#f502f6] hover:text-white transition">
          Entre em Contato
        </button>
      </div>
    </div>
  )
}

export default Home
