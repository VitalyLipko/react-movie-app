import { API_KEY, API_PATH } from '../environments';

export async function getPopular(page, signal) {
  const url = new URL(`${API_PATH}/popular`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('page', page);
  const res = await fetch(url.toString(), {
    signal,
  });
  return res.json();
}

export async function getMovie(id, signal) {
  const url = new URL(`${API_PATH}/${id}`);
  url.searchParams.append('api_key', API_KEY);
  const res = await fetch(url.toString(), {
    signal,
  });

  return res.json();
}

export async function getRecommendations(id, signal) {
  const url = new URL(`${API_PATH}/${id}/recommendations`);
  url.searchParams.append('api_key', API_KEY);
  const res = await fetch(url.toString(), { signal });

  return res.json();
}
