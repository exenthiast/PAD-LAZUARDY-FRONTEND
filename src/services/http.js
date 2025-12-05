export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Cache untuk request yang sudah berhasil
const requestCache = new Map();
const CACHE_DURATION = 5000; // 5 detik

export async function api(path, options = {}) {
  const token = localStorage.getItem("auth_token");

  // Debug: log token untuk setiap request
  console.log(`[API] ${options.method || "GET"} ${path}`, {
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : "none",
  });

  // Jika GET request dan ada di cache, return dari cache
  const cacheKey = `${path}-${token}`;
  if (!options.method || options.method === "GET") {
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Returning cached response for:", path);
      return cached.data;
    }
  }

  const isFormData =
    options.body instanceof FormData || options.body instanceof URLSearchParams;

  // Build headers - options.headers takes priority over defaults
  const headers = {
    Accept: "application/json",
    ...(!isFormData && !options.headers?.["Content-Type"]
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token && !options.headers?.Authorization
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...(options.headers || {}), // This will override defaults if provided
  };

  // Debug: log final headers (without showing full token)
  console.log(`[API] Final headers:`, {
    hasAuth: !!headers.Authorization,
    authPreview: headers.Authorization
      ? headers.Authorization.substring(0, 20) + "..."
      : "none",
    contentType: headers["Content-Type"] || "not set",
  });

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers,
      credentials: "include",
      ...options,
    });

    let data = null;
    const responseText = await res.text(); // Get raw response first

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error(
        `Failed to parse JSON response for ${path}:`,
        responseText.substring(0, 500)
      );
      data = null;
    }

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) || `HTTP ${res.status}`;
      const error = new Error(message);
      error.status = res.status;
      error.response = { data }; // Add response data to error
      console.error(`API Error [${res.status}]:`, path, message, data);
      throw error;
    }

    // Cache successful GET requests
    if (!options.method || options.method === "GET") {
      requestCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    }

    console.log(`API Success:`, path, data); // Debug log
    return data;
  } catch (error) {
    // Jangan throw error jika network error, log saja
    console.error("API request failed:", path, error);

    // Jika 401, log detail untuk debugging
    if (error.status === 401) {
      console.error("[AUTH ERROR] 401 Unauthenticated:", {
        path,
        token: token ? `${token.substring(0, 20)}...` : "none",
        error: error.response?.data,
      });

      // Don't auto-redirect here, let the component handle it
      // This prevents double redirects and allows better error messages
    }

    throw error;
  }
}
