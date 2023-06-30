import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoryReducer, taskReducer} from "./slices";

import {userReducer} from "./slices/userSlice";

const rootReducer = combineReducers({
    categories: categoryReducer,
    tasks: taskReducer,
    users: userReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export {
    setupStore
}