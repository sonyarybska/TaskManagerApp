import React, {FC} from 'react';
import styles from './CategoryItem.module.css';
import {Link} from "react-router-dom";
import moment from "moment";

import {ICategory} from "../../interfaces";

import {useAppDispatch} from "../../hooks/redux.hook";
import {categoriesActions} from "../../redux";

interface IProp {
    item: ICategory,
}

const CategoryItem: FC<IProp> = ({item}) => {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.ItemBox}>
            <div className={styles.SubBox}>
                <p className={styles.ItemName}>{item.name}</p>
                <p>{`${item.tasks.length} tasks`}</p>
                <p>{moment(item.createdAt).format('DD-MM-YYYY')}</p>
            </div>

            <div className={styles.SubBox}>
                <p onClick={() => {
                    dispatch(categoriesActions.setShowOverlayActions(true))
                    dispatch(categoriesActions.setCategoryId(item.category_id))
                }}>
                    actions
                </p>

                <Link to={'/task-list'} state={item}><p>more</p></Link>
            </div>
        </div>
    );
};
export default CategoryItem;