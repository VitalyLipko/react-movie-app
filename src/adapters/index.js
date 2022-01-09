import { API_KEY, API_PATH } from '../environments';

export async function getPopular(page, signal) {
  const url = new URL(`${API_PATH}/movie/popular`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('page', page);
  const res = await fetch(url.toString(), {
    signal,
  });
  return res.json();
}

export async function getMovie(id, signal) {
  const url = new URL(`${API_PATH}/movie/${id}`);
  url.searchParams.append('api_key', API_KEY);
  const res = await fetch(url.toString(), {
    signal,
  });

  return res.json();
}

export async function getRecommendations(id, signal) {
  const url = new URL(`${API_PATH}/movie/${id}/recommendations`);
  url.searchParams.append('api_key', API_KEY);
  const res = await fetch(url.toString(), { signal });

  return res.json();
}

export async function getSearchResults(query, signal) {
  const url = new URL(`${API_PATH}/search/movie`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('query', query);
  const res = await fetch(url.toString(), { signal });

  return res.json();
}
