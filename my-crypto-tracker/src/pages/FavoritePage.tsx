import { useEffect, useState } from 'react';
import { IAllAssetResponse } from '../interfaces/asset';
import { List, Avatar, Skeleton, Button, Empty } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { formatToDollar } from '../helpers/formatToDollar';
import { getFavorites, putFavorites } from '../utils/local-data';

function FavoritePage() {
  const [asset, setAsset] = useState<IAllAssetResponse>({ list: [], loading: false, total: 0 });

  useEffect(() => {
    asyncGetFavoriteAssets();
  }, []);

  const asyncGetFavoriteAssets = () => {
    const localData = getFavorites();
    if (localData) {
      setAsset(localData);
    }
  }

  const handleFavoriteToggle = (selectedId: number) => {
    const newAsset = {
      total: asset.total,
      loading: false,
      list: asset.list.map((item) => {
        if (item.id === selectedId) {
          item.is_favorite = !item.is_favorite;
        }
        return item;
      })
    }
    setAsset(newAsset);
    putFavorites(newAsset);
  };

  // const onToggleFavorites = (id: number) => {
  //   setAsset((prevState) => ({
  //     ...prevState,
  //     list: prevState.list.map((item) => 
  //       item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
  //     )
  //   }));
  //   putFavorites(asset);
  // };

  if (asset.total < 1) {
    return (<Empty />)
  }

  return (
    <div className="FavoritePage">
      <h2>All Crypto</h2>
      <List
        itemLayout="horizontal"
        dataSource={asset.list.filter((asset) => asset.is_favorite)}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <Button
                type="link"
                icon={item.is_favorite ? <StarFilled /> : <StarOutlined />}
                style={{ color: 'rgb(246, 184, 126)' }}
                onClick={() => handleFavoriteToggle(item.id)}
              />
              <List.Item.Meta
                avatar={<Avatar src={item.logo_url} />}
                title={<p>{item.symbol}</p>}
                description={<p>{item.name}</p>}
              />
              <div className="ant-list-item-meta-content">
                <h4 className="ant-list-item-meta-title">{formatToDollar(item.price_usd)}</h4>
                <p className="ant-list-item-meta-description">{formatToDollar(item.total_mkt_cap_usd)}</p>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default FavoritePage;
