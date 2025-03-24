'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNoticia() {
    const [titulo, setTitulo] = useState('');
    const [noticia, setNoticia] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [autor, setAutor] = useState('');
    const [imagem, setImagem] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novaNoticia = {
            titulo,
            noticia,
            conteudo,
            autor,
            imagem,
            data_publicacao: new Date().toISOString(),
        };

        try {
            const res = await fetch('http://localhost:3000/api/noticias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaNoticia),
            });

            if (res.ok) {
                router.push('/noticias'); // Redireciona para a lista de notícias após o envio
            } else {
                alert('Erro ao adicionar notícia');
            }
        } catch (error) {
            alert('Erro ao adicionar notícia');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800">
                Adicionar Nova Notícia
            </h1>

            <Link href="/noticias" className="text-(--rosa) hover:text-(--azul) mb-4 inline-block">
                Voltar para a lista de eventos
            </Link>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Notícia</label>
                    <textarea
                        value={noticia}
                        onChange={(e) => setNoticia(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Conteúdo</label>
                    <textarea
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Autor</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Imagem URL</label>
                    <input
                        type="text"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        className="bg-(--roxo) text-white p-2 rounded hover:bg-(--azul)">
                        Adicionar Notícia
                    </button>
                </div>
            </form>
        </div>
    );
}
