import React, {FC, useEffect, useState} from 'react';
import styles from './TaskList.module.css';

import {taskService} from '../../services';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';
import {taskActions} from '../../redux';
import TaskItem from '../taskItem/TaskItem';

interface IProp {
    categoryId: number;
}

const TaskList: FC<IProp> = ({categoryId}) => {
    const {fetchingAdd, fetchingDelete, tasks} = useAppSelector(state => state.tasks);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const fetchTasksByCategory = async () => {
        try {
            const {data} = await taskService.getAllByCategory(categoryId);
            dispatch(taskActions.setTasks([...data]));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasksByCategory()
            .finally(() => setIsLoading(true));
    }, [categoryId]);

    useEffect(() => {
        if (fetchingAdd) {
            fetchTasksByCategory().finally(() => dispatch(taskActions.setFetchingAdd(false)));
        } else if (fetchingDelete) {
            fetchTasksByCategory().finally(() => dispatch(taskActions.setFetchingDelete(null)));
        }
    }, [fetchingAdd, fetchingDelete, categoryId, dispatch]);

    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );

    return (
        <div className={styles.TaskListBox}>
            {isLoading && tasks.length ? (
                sortedTasks.map(value => <TaskItem key={value.task_id} item={value}/>)
            ) : (
                <div>No tasks</div>
            )}
        </div>
    );
};

export default TaskList;
