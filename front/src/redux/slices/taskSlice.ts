import {createSlice} from "@reduxjs/toolkit";

import {ITask} from "../../interfaces/";

interface IState {
    tasks: ITask[],
    categoryId: number | null,
    taskId: number | null,
    showOverlayTask: boolean,
    fetchingAdd: boolean,
    showOverlayDelete: boolean,
    fetchingDelete: boolean,
    isEdit: boolean
}

let initialState: IState = {
    tasks: [],
    categoryId: null,
    taskId: null,
    showOverlayTask: false,
    fetchingAdd: true,
    showOverlayDelete: false,
    fetchingDelete: false,
    isEdit: false
}

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setTaskId: (state, action) => {
            state.taskId = action.payload
        },
        setFlagEdit: (state, action) => {
            state.isEdit = action.payload
        },
        setShowOverlayTask: (state, action) => {
            state.showOverlayTask = action.payload
        },
        setShowOverlayDelete: (state, action) => {
            state.showOverlayDelete = action.payload
        },
        setFetchingAdd: (state, action) => {
            state.fetchingAdd = action.payload
        },
        setFetchingDelete: (state, action) => {
            state.fetchingDelete = action.payload
        }
    },
});

const {reducer: taskReducer} = taskSlice;
const {
    setTasks,
    setShowOverlayTask,
    setShowOverlayDelete,
    setFetchingDelete,
    setCategoryId,
    setFetchingAdd,
    setTaskId,
    setFlagEdit
} = taskSlice.actions;

const taskActions = {
    setTasks,
    setShowOverlayTask,
    setShowOverlayDelete,
    setFetchingDelete,
    setFetchingAdd,
    setCategoryId,
    setTaskId,
    setFlagEdit
}

export {taskReducer, taskActions}