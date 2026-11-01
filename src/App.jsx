import { useState, useEffect } from 'react';
import TarjetaPokemon from './TarjetaPokemon';

export default function App() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const CLAVE_CACHE = 'pokemones_cache';
    const datosEnCache = localStorage.getItem(CLAVE_CACHE);

    if (datosEnCache) {
      setPokemones(JSON.parse(datosEnCache));
      setCargando(false);
      return;
    }

    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then((res) => res.json())
      .then(async (data) => {
        const detalles = await Promise.all(
          data.results.map((p) => fetch(p.url).then((res) => res.json()))
        );

        localStorage.setItem(CLAVE_CACHE, JSON.stringify(detalles));
        setPokemones(detalles);
        setCargando(false);
      })
      .catch((error) => console.error('Error al consultar PokéAPI:', error));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Listado de Pokémon
        </h1>
      </header>

      {cargando ? (
        <p className="text-center text-gray-500 font-medium">Cargando recursos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pokemones.map((pokemon) => (
            <TarjetaPokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}