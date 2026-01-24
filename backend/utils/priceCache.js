const priceCache = new Map();
// Cache stock prices for 30 seconds to reduce Yahoo API calls
const TTL = 30 * 1000; // 30 seconds

export const getCachedPrice = (symbol) => {
  const cached = priceCache.get(symbol);

  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > TTL;
  if (isExpired) {
    priceCache.delete(symbol);
    return null;
  }

  return cached.price;
};

export const setCachedPrice = (symbol, price) => {
  priceCache.set(symbol, {
    price,
    timestamp: Date.now(),
  });
};
