import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    id: 0,
    roles: [],
    token: "",
    username: ""
}

export const userDetailsReducer = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.roles = action.payload.roles;
            state.token = action.payload.token;
            state.username = action.payload.username;
        },

        logout: (state) => {
            state.email = "";
            state.id = 0;
            state.roles = [];
            state.token = "";
            state.username = "";
        },
    },
})

export const { login, logout } = userDetailsReducer.actions

export default userDetailsReducer.reducer