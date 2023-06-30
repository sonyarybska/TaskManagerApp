import React, {FC, useEffect} from 'react';
import styles from './CaregoryList.module.css';

import {categoryService} from '../../services';
import CategoryItem from '../categoryItem/CategoryItem';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';
import {categoriesActions} from '../../redux';

const CategoryList: FC = () => {
    const {
        fetchingDelete,
        fetching,
        fetchingEdit,
        categories,
    } = useAppSelector(state => state.categories);

    const {user} = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    const fetchCategoriesByUser = async () => {
        try {
            if (user && user.user_id) {
                const {data} = await categoryService.getAllByUser(user.user_id);
                dispatch(categoriesActions.setCategories([...data]));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchCategoriesByUser()
        }, 100)
    }, [user])

    useEffect(() => {
        if (fetching) {
            fetchCategoriesByUser().finally(() =>
                dispatch(categoriesActions.setFetching(false))
            );
        } else if (fetchingDelete) {
            fetchCategoriesByUser().finally(() =>
                dispatch(categoriesActions.setFetchingDelete(null))
            );
        } else if (fetchingEdit) {
            fetchCategoriesByUser().finally(() =>
                dispatch(categoriesActions.setFetchingEdit(null))
            );
        }
    }, [fetching, fetchingDelete, fetchingEdit]);

    const sortedCategories = [...categories].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return (
        <div className={styles.CategoryListBox}>

            {user && categories.length ? (
                sortedCategories.map(value => (
                    <CategoryItem key={value.category_id} item={value}/>
                ))
            ) : (
                <div>No categories</div>
            )}
        </div>
    );
};
export default CategoryList;
