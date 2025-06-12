import { type Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
}

export default function MovieModal({ movie }: MovieModalProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : '/placeholder-image.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Невідомо';

  return (
    <div className={css.card}>
      <img
        src={posterUrl}
        alt={movie.title}
        className={css.poster}
      />
      <div className={css.content}>
        <h3 className={css.title}>{movie.title}</h3>
        <p className={css.year}>Рік: {releaseYear}</p>
        <p className={css.rating}>Рейтинг: {movie.vote_average.toFixed(1)}/10</p>
        <p className={css.overview}>
          {movie.overview || 'Опис недоступний'}
        </p>
      </div>
    </div>
  );
}