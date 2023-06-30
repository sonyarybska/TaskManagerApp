import React, {FC, useEffect, useRef} from 'react';
import {useLocation} from "react-router-dom";

import {ICategory} from "../../interfaces/";
import TaskList from "../taskList/TaskList";
import styles from './Tasks.module.css'
import Task from "../task/Task";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {taskActions} from "../../redux";
import TaskDeletePopup from "../taskDeletePopup/taskDeletePopup";

const Tasks: FC = () => {
    const {showOverlayTask, showOverlayDelete} = useAppSelector(state => state.tasks);
    const location = useLocation();
    const category = location.state as ICategory;

    const dispatch = useAppDispatch();

    const overlayRefForm = useRef<HTMLDivElement | null>(null);
    const overlayRefDelete = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRefForm.current && !overlayRefForm.current.contains(event.target as Node)) {
            dispatch(taskActions.setShowOverlayTask(false))
        }
        if (overlayRefDelete.current && !overlayRefDelete.current.contains(event.target as Node)) {
            dispatch(taskActions.setShowOverlayDelete(false))
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className={styles.TaskHeader}>
                <h3>{category?.name}</h3>

                <p onClick={() => {
                    dispatch(taskActions.setShowOverlayTask(true))
                    dispatch(taskActions.setFlagEdit(false))
                }}>
                    Add task
                </p>
            </div>
            {
                showOverlayDelete &&
                <div ref={overlayRefDelete} className={styles.OverlayBox}>
                    <TaskDeletePopup/>
                </div>
            }

            {

                <TaskList categoryId={category?.category_id}/>

            }
            {showOverlayTask &&
                <div className={styles.OverlayBox} ref={overlayRefForm}>
                    <Task categoryId={category?.category_id}/>
                </div>
            }

        </div>
    );
};

export default Tasks;