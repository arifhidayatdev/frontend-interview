import { IAsset } from "../interfaces/asset";

function removeFavorites() {
  localStorage.removeItem('favorites');
}

function getFavorites(): IAsset {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : { list: [], loading: false, total: 0 };
}

function putFavorites(favorites: IAsset) {
  return localStorage.setItem('favorites', JSON.stringify(favorites));
}

export {
  removeFavorites,
  getFavorites,
  putFavorites
};
