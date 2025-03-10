import { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className="w-full my-6">
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold">Crawler</h1>
        </a>
      </nav>
    </header>
  );
}
