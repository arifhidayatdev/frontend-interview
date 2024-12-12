import { IAllAssetResponse } from "../interfaces/asset";

function removeFavorites() {
  localStorage.removeItem('favorites');
}

function getFavorites(): IAllAssetResponse {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : { list: [], loading: false, total: 0 };
}

function putFavorites(favorites: IAllAssetResponse) {
  return localStorage.setItem('favorites', JSON.stringify(favorites));
}

export {
  removeFavorites,
  getFavorites,
  putFavorites
};
