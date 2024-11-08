"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header({ genres = [], countries = []}: { genres: string[]; countries: string[]; }) {
  const [linkGenre, setLinkGenre] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const [linkCountry, setLinkCountry] = useState<string[]>([]);


  useEffect(() => {
    if (pathname.includes("/genres/")) {
      const allGenresFromUrl = pathname.replace("/genres/", "").split("/");
      setLinkGenre(allGenresFromUrl);
    }
  }, [pathname]);

  const onClick = (genre: string) => {
    if (linkGenre.includes(genre)) {
      const filteredGenres = linkGenre.filter((link) => link !== genre);
      setLinkGenre(filteredGenres);
      if (filteredGenres.length === 0) {
        router.push(`/`);
      } else {
        router.push(`/genres/${filteredGenres.join("/")}`);
      }
    } else {
      const newLinkGenre = [...linkGenre, genre];
      setLinkGenre(newLinkGenre);
      router.push(`/genres/${newLinkGenre.join("/")}`);
    }
  };

  useEffect(() => {
    if (pathname.includes("/countries/")) {
      const allCountryFromUrl = pathname.replace("/countries/", "").split("/");
      setLinkCountry(allCountryFromUrl);
    }
  }, [pathname]);

  const onClickCountry = (country: string) => {
    // Ganti spasi dengan tanda hubung untuk format URL yang sesuai
    const countrySlug = country.trim().replace(/ /g, "-");
  
    if (linkCountry.includes(countrySlug)) {
      const filteredCountries = linkCountry.filter((link) => link !== countrySlug);
      setLinkCountry(filteredCountries);
      if (filteredCountries.length === 0) {
        router.push(`/`);
      } else {
        router.push(`/countries/${filteredCountries.join("/")}`);
      }
    } else {
      const newLinkCountry = [...linkCountry, countrySlug];
      setLinkCountry(newLinkCountry);
      router.push(`/countries/${newLinkCountry.join("/")}`);
    }
  };

  return (
    <header className="bg-black text-white flex justify-center py-5 gap-5">
      <Link href={"/"}>Home</Link>
      <div className="group">
        Genre
        <div className="hidden group-hover:grid grid-cols-4 gap-2 absolute text-black bg-white p-5 border z-10">
          {genres.map((genre, i) => (
            <div key={i} className="space-x-2">
              <label htmlFor={`genre-${i}`}>{genre}</label>
              <input
                id={`genre-${i}`}
                type="checkbox"
                checked={linkGenre.includes(genre)} // Set checkbox checked if genre is in linkGenre
                onChange={() => onClick(genre)} // Update on genre click
              />
            </div>
          ))}
        </div>
      </div>
      <div className="group">
        Country

        <div className="hidden group-hover:grid grid-cols-4 gap-2 absolute text-black bg-white p-5 border z-10">
          {countries.map((country, i) => (
            <div key={i} className="space-x-2">
              <label htmlFor={`country-${i}`}>{country}</label>
              <input
                id={`country-${i}`}
                type="checkbox"
                checked={linkCountry.includes(country)}
                onChange={() => onClickCountry(country)}
              />
            </div>
          ))}
        </div>

        

      </div>
    </header>
  );
}
