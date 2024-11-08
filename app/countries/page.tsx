import { getMovies } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type CountrySlugPageProps = {
  params: {
    slug: string[]; // This will now represent countries
  };
};

export default async function CountrySlugPage({
  params,
}: CountrySlugPageProps) {
  const { slug } = params; // Tidak perlu await, karena params sudah langsung tersedia

  const movies = await getMovies();

  // Filter movies based on the slug array of countries
  const selectMovies = movies.filter((movie) => {
    // Split dan trim negara dari data film
    const countries = movie.Country.split(',').map((country) => country.trim());

    // Ganti tanda hubung kembali menjadi spasi untuk pencocokan yang benar
    const formattedSlug = slug.map((s) => s.replace(/-/g, ' '));

    // Cek apakah semua negara dalam slug ada di negara film
    return formattedSlug.every((s) =>
      countries.some((country) => country === s)
    );
  });

  return (
    <div className="h-full space-y-10 my-20">
      <h1 className="text-center text-3xl font-semibold">Movie List</h1>
      <div className="grid grid-cols-4 max-w-screen-xl gap-5 mx-auto">
        {selectMovies.map((movie, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg group flex items-center justify-center"
          >
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover"
            />
            <Link
              href={`/movies/${movie.imdbID}`} // Perbaiki href di sini
              className="absolute bg-green-500 px-5 py-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
      {selectMovies.length === 0 && (
        <p className="w-full text-center">No movies from selected countries</p>
      )}
    </div>
  );
}
