import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, count = 3) => {
  const response = await axios.get(`${UNSPLASH_API_URL}/photos/random`, {
    params: {
      query,
      count,
      client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    },
  });
  return response.data;
};

