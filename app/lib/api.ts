const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI(
  endpoint: string,
  options?: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: object;
    token?: string;
  },
) {
  const url = API_URL + endpoint;

  const headers: HeadersInit = {
    "client-id": "openmarket",
    "Content-Type": "application/json",
  };

  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export default fetchAPI;
