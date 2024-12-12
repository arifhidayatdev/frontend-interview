import { IAssetList } from "../interfaces/asset"
import { getFavorites } from "../utils/local-data";
import { IAssetAPI } from "../interfaces/asset";

export function mapAssetObject(assets: IAssetAPI[]): IAssetList[] {
  const favorite = getFavorites();

  return assets.map((asset) => {
    return {
      id: asset.ID,
      asset_type: asset.ASSET_TYPE,
      symbol: asset.SYMBOL,
      name: asset.NAME,
      logo_url: asset.LOGO_URL,
      price_usd: asset.PRICE_USD,
      total_mkt_cap_usd: asset.TOTAL_MKT_CAP_USD,
      is_favorite: favorite.list.some((fav) => fav.id === asset.ID && fav.is_favorite) || false,
      loading: false,
    }
  });
}