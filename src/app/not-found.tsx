export default function NotFound() {
    return(
        <div className="flex items-center justify-center min-h-screen bg-(--roxo) text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">Página não encontrada</p>
        <p className="text-lg">Desculpe, a página que você está procurando não existe.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-white text-(--roxo) rounded-lg text-lg font-semibold hover:bg-[#f0e8f9] transition-all duration-300"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
    )
}