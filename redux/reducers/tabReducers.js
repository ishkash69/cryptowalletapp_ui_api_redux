import { createSlice } from "@reduxjs/toolkit";
import { create } from "react-test-renderer";

const initialState = {
    isModalVisible: false
}
export const tabReducer = createSlice({
    name: 'walletApp',
    initialState,
    reducers:{
        tradeModal: (state,action)=>{
            state.isModalVisible = action.payload
        },
    }
})
export const {tradeModal} = tabReducer.actions
export default tabReducer.reducer