import { mapAssetObject } from "../helpers/mapAssetObject";
import { IAllAssetResponse } from "../interfaces/asset";

const baseUrl = 'https://data-api.ccdata.io';

async function getAllAssets(pageSize: number): Promise<IAllAssetResponse> {
  try {
    const response = await fetch(`${baseUrl}/asset/v1/top/list?page=1&page_size=${pageSize}&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`);
    const data = await response.json();
    return {
      total: data.Data.STATS.TOTAL_ASSETS,
      list: mapAssetObject(data.Data.LIST)
    };
  } catch (error) {
    return {
      total: 0,
      list: []
    }
  }
}

export {
  getAllAssets
}