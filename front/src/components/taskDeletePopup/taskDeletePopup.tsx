import React, {FC} from 'react';
import styles from './taskDeletePopup.module.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {categoriesActions, taskActions} from "../../redux";
import {taskService} from "../../services/";

const TaskDeletePopup: FC = () => {
    const dispatch = useAppDispatch();

    const {taskId} = useAppSelector(state => state.tasks);

    const deleteItem= async ()=>{
        await taskService.deleteOne(taskId)
            .finally(()=>dispatch(taskActions.setFetchingDelete(true)))
            .finally(()=>dispatch((taskActions.setShowOverlayDelete(false))))
            .finally(()=>dispatch(categoriesActions.setRefreshCategory(true)))
    }

    return (
        <div className={styles.DeletePopup}>
            <p>delete</p>
            <div>
                <button onClick={()=>deleteItem()}>OK</button>
                <button onClick={()=>dispatch(taskActions.setShowOverlayDelete(false))}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskDeletePopup;