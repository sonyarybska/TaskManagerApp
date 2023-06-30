import {createSlice} from "@reduxjs/toolkit";

interface IState {
    user: any,
    refreshUser: boolean
}

let initialState: IState = {
    user: null,
    refreshUser: true
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setRefresh: (state, action) => {
            state.refreshUser = action.payload
        },
    },
});

const {reducer: userReducer} = userSlice;
const {
    setUser,
    setRefresh
} = userSlice.actions;

const userActions = {
    setUser,
    setRefresh
}
export {userReducer, userActions}