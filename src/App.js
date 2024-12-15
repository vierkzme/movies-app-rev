import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";

export default function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const fetchMovies = async (keyword) => {
    const apiURL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${keyword}`;
    try {
      const response = await fetch(apiURL);
      const respJSON = await response.json();
      if (respJSON.Response === "False") throw new Error(respJSON.Error);

      const movies = respJSON.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        imageUrl: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg",
      }));

      dispatch({ type: "INSERT_MOVIES", movies });
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  return (
    <div className="min-h-screen bg-orange-50">
      <Header title="Movies App" />
      <div className="container mx-auto px-4 py-8">
        <Search onSearch={fetchMovies} />
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                title={movie.title}
                imageUrl={movie.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
}
