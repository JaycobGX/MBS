// src/data/movies.ts

export type MovieCategory = "Now Showing" | "Upcoming";

export type Movie = {
  id: string;
  title: string;
  category: MovieCategory;          // Now Showing / Upcoming
  status: "current" | "upcoming";   // for existing UI logic
  releaseDate: string;              // YYYY-MM-DD
  synopsis: string;                 // 2–3 sentence short description
  posterUrl: string;
  durationMins: number;
  genre: string;
  cast: string[];
  director: string;
  theaters: string[];               // halls
  showtimes: string[];              // empty for upcoming
};

const HALLS = ["Hall A", "Hall B", "Hall C"];

export const movies: Movie[] = [
  // ========= NOW SHOWING =========
  {
    id: "the-running-man-2025",
    title: "The Running Man",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-11-14",
    synopsis:
      "In a brutal near-future, a struggling father volunteers for a deadly reality show where contestants are hunted on live TV. As he becomes an unexpected crowd favorite, he must outsmart both the ‘hunters’ and the corrupt network behind the game. The deeper he runs, the more he exposes the truth the regime is desperate to hide.",
    posterUrl:
      "https://image.tmdb.org/t/p/original/yhWKTCYa0LK9kS6zcKGYc5Dx9xQ.jpg",
    durationMins: 133,
    genre: "Dystopian Action Thriller",
    cast: [
      "Glen Powell",
      "William H. Macy",
      "Lee Pace",
      "Emilia Jones",
      "Michael Cera",
    ],
    director: "Edgar Wright",
    theaters: HALLS,
    showtimes: ["12:30 PM", "3:30 PM", "6:45 PM", "9:30 PM"],
  },
  {
    id: "predator-badlands-2025",
    title: "Predator: Badlands",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-11-07",
    synopsis:
      "A young exiled Yautja warrior crash-lands on a savage frontier world where survival is a test of honor. Forced into an uneasy alliance with a damaged human-built android, he must face an apex creature that even his own kind fears. Each hunt blurs the line between prey and predator in the unforgiving badlands.",
    posterUrl:
      "https://media.outnow.ch/Movies/Bilder/2025/Predator-Badlands/014.png",
    durationMins: 107,
    genre: "Science Fiction Action",
    cast: ["Elle Fanning", "Dimitrius Schuster-Koloamatangi"],
    director: "Dan Trachtenberg",
    theaters: HALLS,
    showtimes: ["1:00 PM", "4:10 PM", "7:20 PM", "10:00 PM"],
  },
  {
    id: "wicked-for-good-2025",
    title: "Wicked: For Good",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-11-21",
    synopsis:
      "In the aftermath of Elphaba’s rebellion, Oz teeters between hope and fear. Glinda must decide whether to defend the glittering image of the Wizard’s world or confront the truth about power and sacrifice. The two women’s destinies collide in a final choice that will define what it means to be good.",
    posterUrl:
      "http://www.impawards.com/2025/posters/wicked_for_good_ver2.jpg",
    durationMins: 137,
    genre: "Musical Fantasy",
    cast: [
      "Ariana Grande",
      "Cynthia Erivo",
      "Jonathan Bailey",
      "Michelle Yeoh",
      "Jeff Goldblum",
    ],
    director: "Jon M. Chu",
    theaters: HALLS,
    showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "9:45 PM"],
  },
  {
    id: "zootopia-2-2025",
    title: "Zootopia 2",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-11-26",
    synopsis:
      "Officers Judy Hopps and Nick Wilde are partners on the ZPD, but their clashing styles make every case chaotic. When a mysterious reptilian newcomer threatens the city’s fragile peace, the pair must go undercover in Zootopia’s high-society circles. Their investigation uncovers a conspiracy that slithers through every district of the metropolis.",
    posterUrl:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=800&auto=format&fit=crop",
    durationMins: 108,
    genre: "Animated Buddy-Cop Comedy",
    cast: [
      "Ginnifer Goodwin",
      "Jason Bateman",
      "Ke Huy Quan",
      "Idris Elba",
      "Shakira",
    ],
    director: "Jared Bush & Byron Howard",
    theaters: HALLS,
    showtimes: ["10:45 AM", "1:40 PM", "4:30 PM", "7:15 PM"],
  },
  {
    id: "eternity-2025",
    title: "Eternity",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-08-15",
    synopsis:
      "A brilliant physicist discovers a way to slow time within a small field, offering humanity the chance to cheat death by stretching out its final moments. As the technology spreads, society fractures between those who embrace the endless pause and those who fear losing what makes life meaningful. One test subject must decide whether to live forever in a single instant or face an uncertain future.",
    posterUrl:
      "https://images.unsplash.com/photo-1516408274753-53e082c09b4d?q=80&w=800&auto=format&fit=crop",
    durationMins: 130,
    genre: "Science Fiction Drama",
    cast: ["John David Washington", "Florence Pugh", "Mahershala Ali"],
    director: "Denis Villeneuve",
    theaters: HALLS,
    showtimes: ["12:00 PM", "3:10 PM", "6:20 PM", "9:20 PM"],
  },
  {
    id: "hamnet-2025",
    title: "Hamnet",
    category: "Now Showing",
    status: "current",
    releaseDate: "2025-10-10",
    synopsis:
      "In plague-stricken Stratford-upon-Avon, Agnes Hathaway fights to protect her children while her husband’s plays draw him ever closer to London’s stages. When tragedy strikes their young son Hamnet, the family’s grief reshapes the stories that will echo through history. The film follows the intimate, unseen lives behind the creation of Hamlet.",
    posterUrl:
      "https://images.unsplash.com/photo-1524324463413-4f2108e94737?q=80&w=800&auto=format&fit=crop",
    durationMins: 125,
    genre: "Historical Drama",
    cast: ["Jessie Buckley", "Paul Mescal"],
    director: "Chloé Zhao",
    theaters: HALLS,
    showtimes: ["11:15 AM", "2:15 PM", "5:20 PM", "8:25 PM"],
  },

  // ========= UPCOMING =========
  {
    id: "anaconda-2025",
    title: "Anaconda",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2025-09-05",
    synopsis:
      "A research expedition deep in the Amazon is sent to locate a missing conservation team, only to discover evidence of a monstrous genetically altered anaconda. Cut off from communication and stalked along the river, the crew must use the jungle itself to survive. Every rustle in the canopy might be the serpent closing in.",
    posterUrl:
      "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?q=80&w=800&auto=format&fit=crop",
    durationMins: 115,
    genre: "Creature Horror Thriller",
    cast: ["Ana de Armas", "Pedro Pascal", "Brian Tyree Henry"],
    director: "Fede Álvarez",
    theaters: HALLS,
    showtimes: [],
  },
  {
    id: "spongebob-search-for-squarepants-2025",
    title: "The SpongeBob Movie: Search for SquarePants",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2025-12-19",
    synopsis:
      "When SpongeBob mysteriously vanishes from Bikini Bottom, his friends fear the worst and set off on a wild rescue mission. Patrick, Sandy, and Squidward journey through forgotten corners of the ocean, from haunted shipwrecks to neon-lit undersea cities. Along the way, they discover how much the square little fry cook means to their world.",
    posterUrl:
      "https://images.unsplash.com/photo-1558981033-4a08655f815e?q=80&w=800&auto=format&fit=crop",
    durationMins: 100,
    genre: "Animated Comedy Adventure",
    cast: [
      "Tom Kenny",
      "Bill Fagerbakke",
      "Clancy Brown",
      "Rodger Bumpass",
      "Carolyn Lawrence",
    ],
    director: "Tim Hill",
    theaters: HALLS,
    showtimes: [],
  },
  {
    id: "moana-live-action-2026",
    title: "Moana – Live Action",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2026-07-10",
    synopsis:
      "Chosen by the ocean as a child, Moana grows up restless on her island’s shores, torn between duty to her people and the pull of the open sea. When a spreading darkness threatens her home, she sails beyond the reef to seek out the demigod Maui and restore the heart of Te Fiti. The live-action reimagining brings the legendary voyage to crashing waves and towering reefs.",
    posterUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
    durationMins: 135,
    genre: "Fantasy Adventure",
    cast: ["Auliʻi Cravalho", "Dwayne Johnson"],
    director: "Thomas Kail",
    theaters: HALLS,
    showtimes: [],
  },
  {
    id: "five-nights-at-freddys-2-2025",
    title: "Five Nights at Freddy’s 2",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2025-10-31",
    synopsis:
      "After the events at Freddy Fazbear’s Pizza, a new night guard takes a seemingly easy job at a shuttered sister location. When the animatronics begin to move on their own and old security tapes reveal hidden experiments, the guard realizes the past is not buried. Each night becomes a desperate puzzle to survive until sunrise.",
    posterUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    durationMins: 110,
    genre: "Supernatural Horror",
    cast: ["Josh Hutcherson", "Piper Rubio", "Matthew Lillard"],
    director: "Emma Tammi",
    theaters: HALLS,
    showtimes: [],
  },
  {
    id: "frankenstein-2025",
    title: "Frankenstein",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2025-12-05",
    synopsis:
      "In a stark re-telling of Mary Shelley’s classic, Victor Frankenstein pushes the boundaries of science to reanimate dead tissue in a remote European manor. His creation awakens with the mind of a child and the strength of a monster, desperate to understand why it was brought into a world that fears it. Their tragic connection spirals toward an inevitable confrontation in the mountains.",
    posterUrl:
      "https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?q=80&w=800&auto=format&fit=crop",
    durationMins: 125,
    genre: "Gothic Horror",
    cast: ["Oscar Isaac", "Jacob Elordi", "Mia Goth"],
    director: "Guillermo del Toro",
    theaters: HALLS,
    showtimes: [],
  },
  {
    id: "avatar-4-2029",
    title: "Avatar 4",
    category: "Upcoming",
    status: "upcoming",
    releaseDate: "2029-12-21",
    synopsis:
      "Years after the war for Pandora, the Sully family must journey beyond the forests and reefs into regions of the planet no Na’vi clan has ever seen. New alliances and old enemies collide as the fate of both humans and Na’vi becomes tied to a mysterious ancient power beneath the planet’s surface. The next chapter in the saga raises the stakes for Pandora and the universe around it.",
    posterUrl:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=800&auto=format&fit=crop",
    durationMins: 190,
    genre: "Epic Science Fiction",
    cast: [
      "Sam Worthington",
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Kate Winslet",
    ],
    director: "James Cameron",
    theaters: HALLS,
    showtimes: [],
  },
];
