const createDummyAsset = (id: number) => ({
  id,
  asset_type: '',
  symbol: '',
  name: '',
  logo_url: '',
  price_usd: 0,
  total_mkt_cap_usd: 0,
  is_favorite: false,
  loading: true,
});

const dummyAssetsData = (length: number) => Array.from({ length }, (_, i) => createDummyAsset(i + 1));

export default dummyAssetsData;
