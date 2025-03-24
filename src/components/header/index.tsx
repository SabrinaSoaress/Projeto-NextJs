import Link from "next/link";

export function Header() {
    return (
        <header className="flex px-9 py-4 text-(--roxo)">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <img src="iconConnect.jpg" alt="Logo" className="h-10" />
            </div>
            <nav className="flex text-center">
                <ul className="flex gap-6">
                    <li className="flex items-center justify-center gap-6"> <Link href='/'> HOME </Link></li>
                    <li className="flex items-center justify-center gap-6"> <Link href='/noticias'> Notícias </Link></li>
                    <li className="flex items-center justify-center gap-6"> <Link href='/eventos'> Eventos </Link></li>
                    <li className="flex items-center justify-center gap-6"> <Link href='/todoList'> Lista </Link></li>
                    <li className="flex items-center justify-center gap-6"> <Link href='/contato'> Contato </Link></li>
                </ul>
            </nav>
        </header>
    );
}
