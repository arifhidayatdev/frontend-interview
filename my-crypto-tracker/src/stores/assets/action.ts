// assets/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAllAssetResponse } from '../../interfaces/asset';
import api from '../../utils/api';

// This async function will fetch assets data, replace the API call with your logic
export const asyncGetAllAssets = createAsyncThunk<IAllAssetResponse | Error, number>(
  'assets/asyncGetAllAssets',
  async (pageSize, { rejectWithValue }) => {
    try {
      const response = await api.getAllAssets(pageSize);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);