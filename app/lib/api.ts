const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI(endpoint: string) {
  const url = API_URL + endpoint;
  const response = await fetch(url, {
    headers: {
      "client-id": "openmarket",
    },
  });

  return response.json();
}

export default fetchAPI;
