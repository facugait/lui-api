type FetchOptions = {
  url: string;
  body?: any;
  method: string;
};

class Api {
  private defaultOptions: RequestInit = {
    credentials: "same-origin",
  };

  async fetchApi<T>({ method, url, body }: FetchOptions): Promise<T> {
    const options: RequestInit = {
      ...this.defaultOptions,
      method,
      headers: {
        "Content-Type": "application/json", // Siempre agregamos este header, pero se puede personalizar
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body && method !== "GET" ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // Manejo de errores, puedes mejorarlo dependiendo de tu lógica
      throw new Error(`Fetch error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

export default new Api();
