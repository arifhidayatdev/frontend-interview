function removeFavorites() {
  localStorage.removeItem('favorites');
}

function getFavorites() {
  return localStorage.getItem('favorites');
}

function putFavorites(favorites: string) {
  return localStorage.setItem('favorites', favorites);
}

export {
  removeFavorites,
  getFavorites,
  putFavorites
};
