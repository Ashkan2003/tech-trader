import Link from "next/link";

function Header() {
  return (
    <header className="bg-indigo-950">
      <nav className="mx-2 flex  items-center justify-between p-6 lg:px-5">
        <Link href="/signin">signin</Link>
      </nav>
    </header>
  );
}

export default Header;
