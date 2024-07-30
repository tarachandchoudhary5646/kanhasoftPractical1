'use client'
import { combineReducers } from "@reduxjs/toolkit";
import AddProductReducer from "./AddProduct";

const rootReducer = combineReducers({
    AddProductReducer
})

export default rootReducer