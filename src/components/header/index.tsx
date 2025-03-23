import Link from "next/link";

export function Header() {
    return (
        <header className="flex px-2 py-4 bg-transparent text-[#f502f6]">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
                <img src="iconConnect.jpg" alt="Logo" className="h-10" />
            </div>
            <nav>
                <ul className="flex items-center justify-center gap-2">
                    <li className="flex items-center justify-center gap-2"> <Link href='/'> HOME </Link></li>
                    <li className="flex items-center justify-center gap-2"> <Link href='/noticias'> Notícias </Link></li>
                    <li className="flex items-center justify-center gap-2"> <Link href='/eventos'> Eventos </Link></li>
                </ul>
            </nav>
        </header>
    );
}
