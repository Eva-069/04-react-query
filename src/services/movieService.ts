import axios from 'axios';
import { type TMDBResponse } from '../types/movie';

const API_KEY = 'VITE_TMDB_TOKEN'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
  if (!query.trim()) {
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    };
  }

  const response = await api.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return response.data;
};