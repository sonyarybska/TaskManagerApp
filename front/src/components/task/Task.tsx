import React, {FC, useEffect, useState} from 'react';
import {Form, Formik, Field, ErrorMessage} from 'formik'

import {taskService} from "../../services/";
import styles from './Task.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {categoriesActions, taskActions} from "../../redux";
import {IUpdateTask} from "../../interfaces/";

interface IProp {
    categoryId: number
}

const Task: FC<IProp> = ({categoryId}) => {
    const {isEdit, taskId} = useAppSelector(state => state.tasks);
    const [initial, setInitial] = useState<IUpdateTask>({name: '', description: '', dateStart: '', dateEnd: ''})
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEdit) {
            taskService.getOne(taskId).then(({data}) => setInitial({
                name: data.name,
                dateEnd: data.dateEnd,
                dateStart: data.dateStart,
                description: data.description
            }))
                .finally(() => setIsLoading(true))
        } else {
            setInitial({name: '', dateEnd: '', dateStart: '', description: ''})
            setIsLoading(true);
        }
    }, [isEdit])

    return (
        <div className={styles.EnterForm}>
            {
                isLoading && <Formik
                    initialValues={initial}
                    validate={values => {
                        const errors: { name?: string } = {};
                        if (!values.name) {
                            errors.name = 'Name should be required';
                        } else if (!values.description) {
                            errors.name = 'Description should be required';
                        } else if (!values.dateEnd) {
                            errors.name = 'Start date should be required';
                        } else if (!values.dateStart) {
                            errors.name = 'End date should be required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, {setSubmitting}) => {
                        if (isEdit) {
                            await taskService.putOne({...values, category_id: categoryId}, taskId)
                                .finally(() => dispatch(taskActions.setFetchingAdd(true)))
                                .finally(() => dispatch(taskActions.setShowOverlayTask(false)))
                        } else {
                            await taskService.postOne({...values, category_id: categoryId})
                                .finally(() => dispatch(taskActions.setFetchingAdd(true)))
                                .finally(() => dispatch(taskActions.setShowOverlayTask(false)))
                                .finally(() => dispatch(categoriesActions.setRefreshCategory(true)))
                        }
                        setSubmitting(false);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div>
                                <label htmlFor="">Name</label>
                                <div id={styles.Name} className={styles.TextInput}>
                                    <Field type="text" name="name"/>
                                </div>
                                <label htmlFor="">Description</label>
                                <div id={styles.Description} className={styles.TextInput}>
                                    <Field component="textarea" rows="4" name="description"/>
                                </div>
                                <div className={styles.DateBox}>
                                    <p>start date</p>
                                    <Field type="date" name="dateStart"/>
                                </div>
                                <div className={styles.DateBox}>
                                    <p>end date</p>
                                    <Field type="date" name="dateEnd"/>
                                </div>
                                <ErrorMessage name="name" component="div"/>
                                <ErrorMessage name="description" component="div"/>
                                <ErrorMessage name="dateStart" component="div"/>
                                <ErrorMessage name="dateEnd" component="div"/>
                            </div>
                            <div className={styles.ButtonBox}>
                                <button onClick={() => dispatch(taskActions.setShowOverlayTask(false))} type="reset">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>}

        </div>
    );
};

export default Task;