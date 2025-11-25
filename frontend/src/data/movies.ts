// src/data/movies.ts

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  cast: string[];
  runtimeMins: number;
  rating: number;
  status: "current" | "upcoming";
  posterUrl: string;
  theaters: string[];
  showtimes: string[];
};

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar Re-Release",
    synopsis:
      "A team travels through a wormhole in space to ensure humanity’s survival.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    runtimeMins: 169,
    rating: 4.7,
    status: "current",
    posterUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop",
    theaters: [
      "Lubbock, TX",
      "Amarillo, TX",
      "Levelland, TX",
      "Plainview, TX",
      "Snyder, TX",
      "Abilene, TX",
    ],
    showtimes: ["12:30 PM", "3:45 PM", "7:10 PM", "9:50 PM"],
  },
  {
    id: "2",
    title: "The Last Voyage",
    synopsis: "A suspense thriller on the high seas with unexpected twists.",
    cast: ["Zendaya", "Daniel Kaluuya"],
    runtimeMins: 121,
    rating: 4.2,
    status: "current",
    posterUrl:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=800&auto=format&fit=crop",
    theaters: ["Lubbock, TX", "Amarillo, TX", "Abilene, TX"],
    showtimes: ["1:00 PM", "4:00 PM", "6:30 PM", "8:45 PM"],
  },
  {
    id: "3",
    title: "Starlight Academy",
    synopsis: "Coming soon: a heartfelt drama about ambition and friendship.",
    cast: ["Florence Pugh", "Timothée Chalamet"],
    runtimeMins: 134,
    rating: 0,
    status: "upcoming",
    posterUrl:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
    theaters: ["Lubbock, TX", "Plainview, TX", "Snyder, TX"],
    showtimes: [], // upcoming -> no booking
  },
];
