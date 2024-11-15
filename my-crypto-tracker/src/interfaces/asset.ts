export interface IAsset {
  id: number;
  asset_type: string;
  symbol: string;
  name: string;
  logo_url: string;
  price_usd: number;
  total_mkt_cap_usd: number;
  is_favorite: boolean;
  loading: boolean;
}

export interface IAllAssetResponse {
  total: number;
  list: IAsset[];
  loading: boolean;
}
