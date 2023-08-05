import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from "../reducers/userDetailsReducer";
import snackbarReducer from "../reducers/snackbarReducer";

export const store = configureStore({
    reducer: {
        userDetails: userDetailsReducer,
        snackbar: snackbarReducer,
    },
})