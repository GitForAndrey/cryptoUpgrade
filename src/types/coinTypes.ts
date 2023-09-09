export interface Coin {
    id:string,
    image: string,
    symbol: string,
    name:string,
    sparkline_in_7d:{price:[]},
    price_change_percentage_24h:number | null,
    current_price:number,
  }

export interface SearchCoin extends Coin {
    thumb:string,
    market_cap_rank:number | null,
    api_symbol: string,
    large: string,
}

export interface WithWishlistCoin extends Coin {
  isWishlist: boolean,
}

export interface AssetsCoin extends Coin {
  coinBuyPrice:number,
  quantity:number,
  fillColor:string,
}
