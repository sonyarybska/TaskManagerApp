import React, {FC} from 'react';

import styles from './CategoryDeletePopup.module.css'
import {categoryService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {categoriesActions} from "../../redux";

const CategoryDeletePopup: FC = () => {
    const {categoryId} = useAppSelector((state: { categories: any; }) => state.categories);
    const dispatch = useAppDispatch();

    const deleteItem = async () => {
        await categoryService.deleteOne(categoryId).finally(() => dispatch(categoriesActions.setShowOverlayDelete(false)))
            .finally(() => dispatch(categoriesActions.setFetchingDelete(true)))
    }

    return (
        <div className={styles.PopupBox}>
            <div>
                <p>Do you want delete this category?</p>
            </div>

            <div>
                <button onClick={() => dispatch(categoriesActions.setShowOverlayDelete(false))}>No</button>
                <button onClick={() => deleteItem()}>Yes</button>
            </div>
        </div>
    );
};

export default CategoryDeletePopup;