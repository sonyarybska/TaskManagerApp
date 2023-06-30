import React, {FC} from 'react';
import LogoutIcon from "@mui/icons-material/Logout";

import {userActions} from "../../redux/slices/userSlice";
import {useNavigate, Outlet} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux.hook";

const LogoutLayout: FC = () => {
    const token = localStorage.getItem('access_token') as string;
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('access_token');
        dispatch(userActions.setUser(null));
        navigate('/login')
    }

    return (
        <div>
            {token && (
                <div onClick={() => logout()}>
                    <LogoutIcon/>
                </div>
            )}
            <Outlet/>
        </div>
    );
};

export default LogoutLayout;