import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Path, NavStateType } from "../../types";
const initialState:NavStateType = {
  navStacks: [],
  currentActivePath: {
    path: '/dashboard',
    label: '数据看板'
   } 
}
const navSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        updateCurrentActivePathname(state, action: PayloadAction<Path>) {
          console.log('action.payload ------', action.payload);
          const { path, label } = action.payload;
          state.currentActivePath.path = path;
          state.currentActivePath.label = label;
        },
        addToNavStack(state, action: PayloadAction<Path>) {
          if (!state.navStacks?.some(nav => nav.path === action.payload.path)) {
            state.navStacks = [...state.navStacks, action.payload]
          };
        },
        clearNavStacks(state, action: PayloadAction<Path | null>) {
          if (action.payload) {
            // 删除某个页签
            const needRemovePathObj = action.payload;
            if (state.navStacks.length <= 1) {
              return
            } else if (needRemovePathObj.path !== state.currentActivePath.path) {
              state.navStacks = state.navStacks.filter(item => item.path !== needRemovePathObj.path)
            } else if( needRemovePathObj.path === state.currentActivePath.path) {
              const targeIndex = state.navStacks.findIndex(nav => nav.path === needRemovePathObj.path);
              // console.log(targeIndex);
              state.currentActivePath = state.navStacks[targeIndex - 1];
              state.navStacks = state.navStacks.filter(item => item.path !== needRemovePathObj.path);
            }
          } else {
            // 清空页签栈
            state.navStacks = []
          }
        }
    }
})
export const { updateCurrentActivePathname, addToNavStack, clearNavStacks } = navSlice.actions;
export default navSlice.reducer;