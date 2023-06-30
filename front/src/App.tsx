import React, {useEffect} from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';
import Categories from "./components/categories/Categories";
import Login from "./components/login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/registration/Registration";
import Tasks from "./components/tasks/Tasks";
import {ResponseInterceptor} from "./components/response-interceptor";
import {useAppDispatch, useAppSelector} from "./hooks/redux.hook";
import {userActions} from "./redux/slices/userSlice";
import LogoutLayout from "./components/logoutLayout/LogoutLayout";

function App() {
    const {refreshUser} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch();

    const token = localStorage.getItem('access_token') as string;

    useEffect(() => {
        if (token && refreshUser) {
            const payload = jwt_decode(token);
            dispatch(userActions.setUser(payload));
            dispatch(userActions.setRefresh(false))
        }
    }, [refreshUser]);

    return (
        <BrowserRouter>
            <div className={'App'}>
                <ResponseInterceptor/>
                <Routes>
                    <Route path={'/'} element={<LogoutLayout/>}>
                        <Route path={'/'} element={<Categories/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/task-list" element={<Tasks/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
