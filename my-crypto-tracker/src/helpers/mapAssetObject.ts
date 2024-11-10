import { IAsset } from "../interfaces/asset"

export function mapAssetObject(assets: any[]): IAsset[] {
  return assets.map((asset) => {
    return {
      id: asset.ID,
      asset_type: asset.ASSET_TYPE,
      symbol: asset.SYMBOL,
      name: asset.NAME,
      logo_url: asset.LOGO_URL,
      price_usd: asset.PRICE_USD,
      total_mkt_cap_usd: asset.TOTAL_MKT_CAP_USD,
      is_favorite: false,
      loading: false,
    }
  });
}