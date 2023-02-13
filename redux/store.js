import { configureStore } from "@reduxjs/toolkit";
import tabReducers from "./reducers/tabReducers";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const middleware = [thunk]
 export const store = configureStore(
    {
        reducer:{
            tabReducers: tabReducers
        }
    },applyMiddleware(...middleware),
)
