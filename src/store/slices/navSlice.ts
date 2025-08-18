import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Path, NavStateType } from "../../types";
const initialState:NavStateType = {
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
        }
    }
})
export const { updateCurrentActivePathname } = navSlice.actions;
export default navSlice.reducer;