//queries constants

////////////getMarketCoins
export const topQuery = page => {
  return `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=33&page=${page}&sparkline=true&price_change_percentage=24&locale=en`;
};
export const firstTestQuery = page => {
  return `/coins/markets?vs_currency=usd&order=volume_asc&per_page=33&page=${page}&sparkline=true&price_change_percentage=24&locale=en`;
};
export const secondTestQuery = page => {
  return `/coins/markets?vs_currency=usd&order=volume_desc&per_page=33&page=${page}&sparkline=true&price_change_percentage=7d&locale=en`;
};

/////////////getAssetsCoins
export const assetsCoinsQuery = name => {
  `/coins/markets?vs_currency=usd&ids=${name}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=7d&locale=en`;
};

/////////getCoinsChart
export const coinsChartQuery = (coin, filter) => {
  return `/coins/${coin}/market_chart?vs_currency=usd&days=${filter}`;
};

export const searchCoinQuery = coin => {
  return `/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=7d&locale=en`;
};

/////////getSearchData
export const searchDataQuery = value => {
  return `/search?query=${value}`;
};

/////////getWishlistCoins
export const wishlistCoinsQuery = names => {
  return `/coins/markets?vs_currency=usd&ids=${names}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=7d&locale=en`;
};
