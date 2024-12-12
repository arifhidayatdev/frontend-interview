import { useEffect, useState } from 'react';
import { IAsset } from '../interfaces/asset';
import { Empty } from 'antd';
import { getFavorites, putFavorites } from '../utils/local-data';
import ListCrypto from '../components/ListCrypto';
import onToggleFavorite from '../helpers/onToggleFavorite';

function FavoritePage() {
  const [asset, setAsset] = useState<IAsset>({ list: [], loading: false, total: 0 });

  useEffect(() => {
    asyncGetFavoriteAssets();
  }, []);

  const asyncGetFavoriteAssets = () => {
    const localData = getFavorites();
    if (localData) {
      setAsset(({
        ...localData,
        list: localData.list.filter((item) => item.is_favorite)
      }));
    }
  }

  const handleFavoriteToggle = (selectedId: number) => {
    const newAsset = onToggleFavorite({ selectedId, asset })
    setAsset(({
      ...newAsset,
        list: newAsset.list.filter((item) => item.is_favorite)
    }));
    putFavorites(newAsset);
  };

  if (asset.total < 1) {
    return (<Empty />)
  }

  return (
    <div className="FavoritePage">
      <h2>Favorite Crypto</h2>
      <ListCrypto asset={asset} handleFavoriteToggle={handleFavoriteToggle}/>
    </div>
  );
}

export default FavoritePage;
