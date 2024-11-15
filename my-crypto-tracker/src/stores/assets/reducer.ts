// assets/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { IAllAssetResponse } from "../../interfaces/asset";
import { asyncGetAllAssets } from "./action";
import dummyAssetsData from "../../constanta/dummyAssetsData";

const initialAssets: IAllAssetResponse = {
  total: 0,
  list: [],
  loading: false,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState: initialAssets,
  reducers: {
    toggleFavoriteAsset: (state, action: { payload: number }) => {
      const asset = state.list.find((asset) => asset.id === action.payload);
      if (asset) {
        asset.is_favorite = !asset.is_favorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllAssets.pending, (state) => {
        state.loading = true;
        state.list = [...state.list, ...dummyAssetsData];
      })
      .addCase(asyncGetAllAssets.fulfilled, (state, action: any) => {
        state.loading = false;
        state.total = action.payload.total;
        state.list = action.payload.list;
      })
      .addCase(asyncGetAllAssets.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavoriteAsset } = assetsSlice.actions;

export default assetsSlice.reducer;
