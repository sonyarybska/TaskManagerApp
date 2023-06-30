import {createSlice} from "@reduxjs/toolkit";
import {ICategory} from "../../interfaces/";

interface IState {
    categories: ICategory[],
    categoryId: null | number,
    showOverlayCategory: boolean,
    showOverlayActions: boolean,
    showOverlayDelete: boolean,
    showOverlayEdit: boolean,
    fetching: boolean,
    fetchingEdit: boolean,
    fetchingDelete: boolean,
    refreshCategory: boolean
}

let initialState: IState = {
    categories: [],
    categoryId: null,
    showOverlayCategory: false,
    showOverlayActions: false,
    showOverlayDelete: false,
    showOverlayEdit: false,
    fetching: true,
    fetchingEdit: false,
    fetchingDelete: false,
    refreshCategory: false,
}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setShowOverlayCategory: (state, action) => {
            state.showOverlayCategory = action.payload
        },
        setShowOverlayActions: (state, action) => {
            state.showOverlayActions = action.payload
        },
        setShowOverlayDelete: (state, action) => {
            state.showOverlayDelete = action.payload
        },
        setShowOverlayEdit: (state, action) => {
            state.showOverlayEdit = action.payload
        },
        setFetching: (state, action) => {
            state.fetching = action.payload
        },
        setFetchingEdit: (state, action) => {
            state.fetchingEdit = action.payload
        },
        setFetchingDelete: (state, action) => {
            state.fetchingDelete = action.payload
        },
        setRefreshCategory: (state, action) => {
            state.refreshCategory = action.payload
        },
    },
});

const {reducer: categoryReducer} = categorySlice;

const {
    setCategories,
    setRefreshCategory,
    setCategoryId,
    setFetchingDelete,
    setFetchingEdit,
    setShowOverlayCategory,
    setShowOverlayDelete,
    setShowOverlayEdit,
    setShowOverlayActions,
    setFetching
} = categorySlice.actions;

const categoriesActions = {
    setCategories,
    setCategoryId,
    setFetching,
    setFetchingEdit,
    setFetchingDelete,
    setShowOverlayCategory,
    setShowOverlayActions,
    setShowOverlayDelete,
    setShowOverlayEdit,
    setRefreshCategory
}

export {categoryReducer, categoriesActions}