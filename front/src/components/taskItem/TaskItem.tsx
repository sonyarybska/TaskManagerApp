import React, {FC} from 'react';
import styles from './TaskItem.module.css';

import {ITask} from "../../interfaces/";
import {useAppDispatch} from "../../hooks/redux.hook";
import {taskActions} from "../../redux";

interface IProp {
    item: ITask
}

const TaskItem: FC<IProp> = ({item}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.ItemBox}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>{`start date ${item.dateStart}`}</p>
            <p>{`end date ${item.dateEnd}`}</p>
            <div>
                <button onClick={() => {
                    dispatch(taskActions.setTaskId(item.task_id))
                    dispatch(taskActions.setShowOverlayDelete(true))
                }}>Delete
                </button>

                <button onClick={() => {
                    dispatch(taskActions.setFlagEdit(true))
                    dispatch(taskActions.setTaskId(item.task_id))
                    dispatch(taskActions.setShowOverlayTask(true))
                }}>Edit
                </button>
            </div>
        </div>
    );
};

export default TaskItem;