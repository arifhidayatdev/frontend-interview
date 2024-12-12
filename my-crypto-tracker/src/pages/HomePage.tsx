import { useEffect, useState } from 'react';
import { IAllAssetResponse } from '../interfaces/asset';
import { List, Avatar, Skeleton, Button, Empty } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { formatToDollar } from '../helpers/formatToDollar';
import { putFavorites } from '../utils/local-data';
import dummyAssetsData from '../helpers/dummyAssetsData';
import api from '../utils/api';

function HomePage() {
  const initialAsset = {
    list: [...dummyAssetsData(10)],
    loading: true,
    total: 10
  }

  const [pageSize, setPageSize] = useState<number>(10);
  const [asset, setAsset] = useState<IAllAssetResponse>({ list: [], loading: true, total: 0 });
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    asyncGetAllAssets();
  }, [pageSize]);

  const asyncGetAllAssets = async () => {
    setAsset((prevState) => ({
      ...prevState,
      list: [...prevState.list, ...dummyAssetsData(5)]
    }));

    const response = await api.getAllAssets(pageSize);
    if (response) {
      setAsset(response);
      setInitialLoading(false);
    } else {
      setAsset((prevState) => ({
        ...prevState,
        list: prevState.list.slice(0, prevState.list.length - 5),
      }));
    }
  }

  const onLoadMore = () => {
    setPageSize(prevState => prevState + 5);
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    asset.total > pageSize  ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => onLoadMore()}>loading more</Button>
      </div>
    ) : null;

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

  if (initialLoading) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={initialAsset.list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }

  if (asset.total < 1) {
    return (<Empty />)
  }

  return (
    <div className="homepage">
      <h2>All Crypto</h2>
      <List
        itemLayout="horizontal"
        dataSource={asset.list}
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
