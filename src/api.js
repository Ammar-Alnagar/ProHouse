export async function apiGet(path, options = {}) {
  const res = await fetch(`/api/v1${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function apiPost(path, body, options = {}) {
  return apiGet(path, { method: 'POST', body: JSON.stringify(body), ...options });
}

export async function apiPut(path, body, options = {}) {
  return apiGet(path, { method: 'PUT', body: JSON.stringify(body), ...options });
}
