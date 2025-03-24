import Link from "next/link";

export function Header() {
    return (
        <header className="flex px-9 py-4 bg-trasparent text-(--roxo)">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <img src="iconConnect.jpg" alt="Logo" className="h-10" />
            </div>
            <nav>
                <ul className="flex items-center justify-center gap-2">
                    <li className="flex items-center justify-center gap-2"> <Link href='/'> HOME </Link></li>
                    <li className="flex items-center justify-center gap-2"> <Link href='/noticias'> Notícias </Link></li>
                    <li className="flex items-center justify-center gap-2"> <Link href='/eventos'> Eventos </Link></li>
                    <li className="flex items-center justify-center gap-2"> <Link href='/contato'> Contato </Link></li>
                </ul>
            </nav>
        </header>
    );
}
