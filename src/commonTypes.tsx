// commonTypes.tsx
// Shared type declarations for movie app

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_language: string;
}

export interface TrendingMovie {
  $id: string;
  title: string;
  poster_url: string;
}

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
