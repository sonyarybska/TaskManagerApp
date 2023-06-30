import React, {FC} from 'react';

import styles from './CategoryActions.module.css'
import {useAppDispatch} from "../../hooks/redux.hook";
import {categoriesActions} from "../../redux";

const CategoryActions: FC = () => {
    const dispatch = useAppDispatch();

    const deleteItem = async () => {
        dispatch(categoriesActions.setFetchingDelete(true))
        dispatch(categoriesActions.setShowOverlayActions(false))
        dispatch(categoriesActions.setShowOverlayDelete(true))
    }

    return (
        <div className={styles.CategoryActionBox}>
            <p>Select action</p>
            <div>
                <button onClick={() => {
                    dispatch(categoriesActions.setShowOverlayEdit(true))
                    dispatch(categoriesActions.setShowOverlayActions(false))
                }}>Edit</button>
                <button onClick={(e) => deleteItem()}>Delete</button>
            </div>
        </div>
    );
};

export default CategoryActions;