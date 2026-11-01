export default function TarjetaPokemon({ pokemon }) {
  const imagenHD =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  return (
    <article className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden p-4 hover:shadow-lg transition-shadow">
      <figure className="w-full flex justify-center bg-gray-50 rounded-xl p-2">
        <img
          src={imagenHD}
          alt={pokemon.name}
          loading="lazy"
          className="w-32 h-32 object-contain"
        />
      </figure>

      <div className="mt-3 flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
          N.º {pokemon.id}
        </span>
        <h3 className="text-lg font-bold text-gray-800 capitalize mt-2">
          {pokemon.name}
        </h3>
      </div>
    </article>
  );
}