type THTTPMethod = 'GET' | 'POST' ;

export async function fetchAPI<TResponse, TBody = unknown>(
  endpoint: string,
  method: THTTPMethod = 'GET',
  body?: TBody
): Promise<TResponse> {
  const init: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  };

  if (method !== 'GET' && body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`https://api.dubaiyachts.com/properties/api/v1${endpoint}`,  init);

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  console.log(`API req method ${method} [ ${endpoint} ] status ${res.status}`)

  return (await res?.json()) as TResponse;
}