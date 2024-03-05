import axios from "axios";

const apiBaseURL = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const popularMoviesEndpoint = `${apiBaseURL}/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const nowPlayingMoviesEndpoint = `${apiBaseURL}/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const searchMovieEndpoint = `${apiBaseURL}/search/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
export const fallbackposter =
  "https://static.displate.com/460x640/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.avif";
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const original = (path) =>
  path ? `https://image.tmdb.org/t/p/original/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const movieDetailsEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
export const movieCreditsEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}/credits?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
export const similarMoviesEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}/similar?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchPopularMovies = () => {
  return apiCall(popularMoviesEndpoint);
};
export const fetchNowPlayingMovies = () => {
  return apiCall(nowPlayingMoviesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchSearchedMovie = (params) => {
  return apiCall(searchMovieEndpoint, params);
};
