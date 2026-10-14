const cache = new Map<string, Promise<boolean>>();

export function preloadImage(url: string): Promise<boolean> {
  const existing = cache.get(url);
  if (existing) return existing;

  const pending = new Promise<boolean>((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      const decode = image.decode?.() ?? Promise.resolve();
      decode.then(
        () => resolve(true),
        () => resolve(true),
      );
    };
    image.onerror = () => {
      cache.delete(url);
      resolve(false);
    };
    image.src = url;
  });

  cache.set(url, pending);
  return pending;
}

export function clearPreloadCache(): void {
  cache.clear();
}
