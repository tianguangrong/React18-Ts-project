import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface NavStateType {
   activePathname: string 
}
const initialState:NavStateType = {
    activePathname: '/dashboard'
}
const navSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        updateCurrentActivePathname(state, action: PayloadAction<string>) {
            state.activePathname = action.payload;
        }
    }
})
export const { updateCurrentActivePathname } = navSlice.actions;
export default navSlice.reducer;