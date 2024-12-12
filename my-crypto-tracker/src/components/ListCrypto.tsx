import { List, Avatar, Skeleton, Button } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { formatToDollar } from '../utils/formatToDollar';
import { IAsset } from '../interfaces/asset';

interface IListCryptoProps {
  asset: IAsset;
  loadMore?: JSX.Element | null;
  handleFavoriteToggle: (id: number) => void;
}

const ListCrypto: React.FC<IListCryptoProps> = ({ asset, loadMore, handleFavoriteToggle }) => {

  return (
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
  )
}

export default ListCrypto;