const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
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
    "Client-Id": `${CLIENT_ID}`,
    "Content-Type": "application/json",
  };

  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  try {
    return await res.json();
  } catch {
    return { ok: 0, message: `API Error: ${res.status}` };
  }
}

export default fetchAPI;
