export interface IAssetList {
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

export interface IAsset {
  total: number;
  list: IAssetList[];
  loading: boolean;
}

export interface IAssetAPI {
  ID: number;
  ASSET_TYPE: string;
  SYMBOL: string;
  NAME: string;
  LOGO_URL: string;
  PRICE_USD: number;
  TOTAL_MKT_CAP_USD: number;
}