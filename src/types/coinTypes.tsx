export interface Coin {
    id:string,
    image: string,
    symbol: string,
    name:string,
    sparkline_in_7d:{price:[]} | null,
    price_change_percentage_24h:number | null,
    current_price:number,
  };

export interface SearchCoin extends Coin {
    thumb:string,
    market_cap_rank:number | null,
};