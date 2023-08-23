//queries constants
export const topQuery = page => {
  return `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=24&locale=en`;
};
export const firstTestQuery = page => {
  return `/coins/markets?vs_currency=usd&order=volume_asc&per_page=20&page=${page}&sparkline=true&price_change_percentage=24&locale=en`;
};
export const secondTestQuery = page => {
  return `/coins/markets?vs_currency=usd&order=volume_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=7d&locale=en`;
};
