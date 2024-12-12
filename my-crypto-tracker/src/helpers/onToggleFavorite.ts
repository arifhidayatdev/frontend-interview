import { IAsset } from "../interfaces/asset";

interface IOnToggleFavoriteProps {
  selectedId: number;
  asset: IAsset;
}

const onToggleFavorite = ({ selectedId, asset }: IOnToggleFavoriteProps) => {
  return {
    total: asset.total,
    loading: false,
    list: asset.list.map((item) => {
      if (item.id === selectedId) {
        item.is_favorite = !item.is_favorite;
      }
      return item;
    })
  }
}

export default onToggleFavorite;
