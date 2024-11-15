import { mapAssetObject } from "../../helpers/mapAssetObject";
import { IAllAssetResponse } from "../../interfaces/asset";

const BASE_URL = 'https://data-api.ccdata.io';

export async function getAllAssets(pageSize: number): Promise<IAllAssetResponse | Error> {
  try {
    const response = await fetch(`${BASE_URL}/asset/v1/top/list?page=1&page_size=${pageSize}&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.Err.message);
    }

    const responseJson = await response.json();
    
    return {
      total: responseJson.Data.STATS.TOTAL_ASSETS,
      list: mapAssetObject(responseJson.Data.LIST),
      loading: false
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error);
      return error;
    }
    return new Error("Unknown error occurred");
  }
}