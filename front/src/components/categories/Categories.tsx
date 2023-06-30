import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Categories.module.css';

import CategoryList from "../categoryList/CategoryList";
import CategoryDeletePopup from "../categoryDeletePopup/CategoryDeletePopup";
import CategoryActions from "../categoryActions/CategoryActions";
import CategoryEditPopup from "../categoryEditPopup/CategoryEditPopup";
import {categoryService} from "../../services/";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {categoriesActions} from "../../redux";
import {userActions} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

const Categories: FC = () => {
    const {showOverlayDelete, showOverlayActions, showOverlayCategory, showOverlayEdit} = useAppSelector((state: {
        categories: any;
    }) => state.categories);

    const {user} = useAppSelector(state => state.users);
    const navigate = useNavigate()

    const dispatch = useAppDispatch();

    const [name, setName] = useState('');

    const overlayRefActions = useRef<HTMLDivElement | null>(null);
    const overlayRefDelete = useRef<HTMLDivElement | null>(null);
    const overlayRefEdit = useRef<HTMLDivElement | null>(null);
    const overlayRefCategory = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRefActions.current && !overlayRefActions.current.contains(event.target as Node)) {
            dispatch(categoriesActions.setShowOverlayActions(false))
        }
        if (overlayRefDelete.current && !overlayRefDelete.current.contains(event.target as Node)) {
            dispatch(categoriesActions.setShowOverlayDelete(false))
        }
        if (overlayRefEdit.current && !overlayRefEdit.current.contains(event.target as Node)) {
            dispatch(categoriesActions.setShowOverlayEdit(false))
        }
        if (overlayRefCategory.current && !overlayRefCategory.current.contains(event.target as Node)) {
            dispatch(categoriesActions.setShowOverlayCategory(false))
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(userActions.setRefresh(true))
        } else {
            navigate('/login')
        }
    }, []);

    const addCategory = async () => {
        if (user && user.user_id) {
            const {data} = await categoryService.postOne({name: name, user_id: user.user_id}).catch(e => e.response);
            if (data.message) {
                alert(data.message)
            } else {
                dispatch(categoriesActions.setFetching(true));
                dispatch(categoriesActions.setShowOverlayCategory(false));
            }
        }
    };

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div>
            <div className={styles.AddCategoryTitle}
                 onClick={() => dispatch(categoriesActions.setShowOverlayCategory(true))}>Add category
            </div>

            {
                showOverlayCategory &&
                <div className={styles.AddCategoryBox} ref={overlayRefCategory}>
                    <div>
                        <p>Add category</p>
                    </div>

                    <input placeholder={'name'} value={name} type="text" onChange={(e) => onChangeName(e)}/>
                    <div>
                        <button onClick={() => dispatch(categoriesActions.setShowOverlayCategory(false))}>cancel
                        </button>
                        <button onClick={() => addCategory()}>add</button>
                    </div>
                </div>
            }
            <CategoryList/>
            {
                showOverlayDelete && <div className={styles.OverlayBox} ref={overlayRefDelete}>
                    <CategoryDeletePopup/>
                </div>
            }

            {
                showOverlayEdit && <div className={styles.OverlayBox} ref={overlayRefEdit}>
                    <CategoryEditPopup/>
                </div>
            }

            {
                showOverlayActions && <div className={styles.OverlayBox} ref={overlayRefActions}>
                    <CategoryActions/>
                </div>
            }

        </div>
    );
};

export default Categories;