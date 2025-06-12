import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { searchMovies } from '../../services/movieService';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => searchMovies(searchQuery, page),
    enabled: !!searchQuery,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setSearchQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;
  const showPagination = totalPages > 1;

  return (
    <div className={css.app}>
      <div className={css.container}>
        <h1 className={css.title}>Пошук фільмів</h1>
        
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        {error && <ErrorMessage />}

        {(isLoading || isFetching) && <Loader />}

        {!isLoading && !error && searchQuery && (
          <>
            <MovieGrid movies={movies} />
            
            {showPagination && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}

        {!searchQuery && !isLoading && (
          <div className={css.placeholder}>
            Введіть запит для пошуку фільмів
          </div>
        )}
      </div>
    </div>
  );
}