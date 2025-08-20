/**
 * createSlice 创建切片，参数是object,内部包含：name，initialState，reducers, extraReducers
 * PayloadAction aciton特定的类型约束，泛型内部传递Payload的数据具体参数
 * createAsyncThunk 创建异步请求，参数一为action类型前缀，参数二为函数，参数二函数中存在两个参数：
 * 参一：传递接口调用时所需的参数
 * 参二：处第一个对象，对象内部存在一个rejectWithValue函数，内部参数传递异常message
 */
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const { localStorage }  = window
interface IUserCallbackMes {
    username: string,
    token: string,
    role: string,
    homeRouteList: object[],
};

type fetchStatus = 'init' | 'loading' | 'fulfilled' | 'rejected';
interface UseStatusType { 
  datas: IUserCallbackMes | undefined;
  status: fetchStatus;
  error: string | null
}
const localInitUseDatasState = localStorage.getItem('user') || ""
const localInitUseStatusState = localStorage.getItem('status') as fetchStatus;
const initialState: UseStatusType = {
  datas: localInitUseDatasState ? JSON.parse(localInitUseDatasState) : null,
  status: localInitUseStatusState || 'init',
  error:  localInitUseDatasState ? localStorage.getItem('error') : null
};
// 创建异步action
export const fetchUser = createAsyncThunk(
  'userAuth/fetchUser',  // action类型前缀
  async(datas: {
    username?: string;
    password?: string;
  }, { rejectWithValue }) => {
    try {
      const result = await axios.post('https://www.demo.com/api/login', datas);
      return result.data.data
    } catch (error: any) {
      rejectWithValue(error.message  || '获取用户失败')
    }
  }
) 
const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    clearUser: (state, action: PayloadAction<null>) => {
      state.datas = undefined;
      state.status = 'init';
      state.error = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUserCallbackMes>) => {
        console.log('action.payload', action.payload);
        state.status = 'fulfilled';
        state.datas = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(state.datas))
        localStorage.setItem('status', state.status)
        localStorage.setItem('error', JSON.stringify(state.error))
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'rejected';
        state.datas = undefined;
        state.error = '获取用户失败'
      })
  }
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer
