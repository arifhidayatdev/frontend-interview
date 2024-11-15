import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllAssetResponse } from '../interfaces/asset';
import { List, Avatar, Skeleton, Button, Empty } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { formatToDollar } from '../helpers/formatToDollar';
import { AppDispatch } from '../stores';
import { asyncGetAllAssets } from '../stores/assets/action';
import { toggleFavoriteAsset } from '../stores/assets/reducer';

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const assets: IAllAssetResponse = useSelector((states: any) => states.assets);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(asyncGetAllAssets(pageSize));
  }, [pageSize]);

  const onLoadMore = () => {
    setPageSize(prevState => prevState + 5);
    window.dispatchEvent(new Event('resize'));
  };

  const handleFavoriteToggle = (assetId: number) => {
    dispatch(toggleFavoriteAsset(assetId));
  };

  const loadMore =
    pageSize < assets.total ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  // const onToggleFavorites = (id: number) => {
  //   setAsset((prevState) => ({
  //     ...prevState,
  //     list: prevState.list.map((item) => 
  //       item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
  //     )
  //   }));
  //   putFavorites(asset);
  // };

  if (assets.total < 1) {
    return (<Empty />)
  }

  return (
    <div className="homepage">
      <h2>All Crypto</h2>
      <List
        itemLayout="horizontal"
        dataSource={assets.list}
        loadMore={loadMore}
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

export default HomePage;
