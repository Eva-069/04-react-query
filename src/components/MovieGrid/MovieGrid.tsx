import { type Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className={css.empty}>
        <p>Фільми не знайдено. Спробуйте інший запит.</p>
      </div>
    );
  }

  return (
    <div className={css.grid}>
      {movies.map((movie) => (
        <MovieModal key={movie.id} movie={movie} />
      ))}
    </div>
  );
}