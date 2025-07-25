import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import type { Movie, TrendingMovie } from "./commonTypes";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState<boolean>(false);
  const [errorTrending, setErrorTrending] = useState<string>("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setErrorMessage("");
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Respnse === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results as Movie[]);
      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      setIsLoadingTrending(true);
      const movies = await getTrendingMovies();
      setTrendingMovies(movies as unknown as TrendingMovie[]);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      setErrorTrending(
        "Error fetching trending movies. Please try again later."
      );
    } finally {
      setIsLoadingTrending(false);
    }
  };
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {isLoadingTrending ? (
          <div className="flex justify-center items-center ">
            <Spinner />
          </div>
        ) : errorTrending ? (
          <p className="text-red-500">{errorTrending}</p>
        ) : (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
