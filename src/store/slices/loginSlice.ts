import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IUserCallbackMes {
    username?: string,
    token?: string,
    role?: string,
    homeRouteList?: object[],
};

type RStatus = 'init' | 'loading' | 'fulfilled' | 'rejected';
const initialState: { 
  datas: IUserCallbackMes | undefined;
  status: RStatus;
  error: string | null
 } = {
  datas: undefined,
  status: 'init',
  error: null
};
// 创建异步action
export const getUserbyloginApi = createAsyncThunk(
  'userAuth/getUserbyloginApi', 
  async(datas: any, { rejectWithValue }) => {
    console.log(datas);
    try {
      const result = await axios.post('https://www.demo.com/api/login', datas);
      console.log('Success:', result.data);
      return result.data
    } catch (error: any) {
      rejectWithValue(error.message  || '获取用户失败')
    }
  }
) 
const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.datas = undefined;
      state.status = 'init';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserbyloginApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserbyloginApi.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.status = 'fulfilled';
        state.datas = action.payload;
        
        state.error = null;
      })
      .addCase(getUserbyloginApi.rejected, (state, action) => {
        state.status = 'rejected';
        state.datas = undefined;
        state.error = '获取用户失败'
      })
  }
});
console.log('我创建的userSlice--->', userSlice);

export const { clearUser } = userSlice.actions;
export default userSlice.reducer
