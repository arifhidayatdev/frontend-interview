import { useEffect, useState } from 'react';
import { IAsset } from '../interfaces/asset';
import api from '../api';
import { List, Skeleton, Button, Empty } from 'antd';
import { putFavorites } from '../utils/local-data';
import dummyAssetsData from '../helpers/dummyAssetsData';
import ListCrypto from '../components/ListCrypto';
import onToggleFavorite from '../helpers/onToggleFavorite';

function HomePage() {
  const initialAsset = {
    list: [...dummyAssetsData(10)],
    loading: true,
    total: 10
  }

  const [pageSize, setPageSize] = useState<number>(10);
  const [asset, setAsset] = useState<IAsset>({ list: [], loading: true, total: 0 });
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
    const newAsset = onToggleFavorite({ selectedId, asset })
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
      <ListCrypto asset={asset} loadMore={loadMore} handleFavoriteToggle={handleFavoriteToggle}/>
    </div>
  );
}

export default HomePage;
