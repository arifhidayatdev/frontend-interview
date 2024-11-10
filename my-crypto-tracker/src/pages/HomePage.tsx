import { useEffect, useState } from 'react';
import { getAllAssets } from '../utils/network-data';
import { IAllAssetResponse } from '../interfaces/asset';
import { List, Avatar, Skeleton, Button, Empty } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { formatToDollar } from '../helpers/formatToDollar';

function HomePage() {
  const [asset, setAsset] = useState<IAllAssetResponse>({ total: 0, list: []});
  const [initLoading, setInitLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    initialFetchAssets();
  }, [pageSize]);

  const initialFetchAssets = async () => {
    setAsset((prevState) => ({
      ...prevState,
      list: prevState.list.concat(new Array(5).fill({ loading: true })),
    }));

    const result = await getAllAssets(pageSize);
    
    if (result) {
      setAsset(result);
      setInitLoading(false);
    }
  }

  const onLoadMore = () => {
    setPageSize(prevState => prevState + 5);
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    pageSize < asset.total ? (
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

  if (asset.total < 1 && !initLoading) {
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
