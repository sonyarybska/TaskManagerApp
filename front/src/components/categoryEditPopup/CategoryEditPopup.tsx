import React, {FC} from 'react';
import styles from './CategoryEditPopup.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";

import {categoryService} from "../../services/";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {categoriesActions} from "../../redux";

const CategoryEditPopup: FC = () => {
    const {categoryId} = useAppSelector((state: { categories: any; }) => state.categories);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.PopupBox}>
            <p>Edit developers category</p>
            <Formik
                initialValues={{name: ''}}

                validate={values => {
                    const errors: { name?: string } = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    return errors;
                }}

                onSubmit={(values, {setSubmitting}) => {
                    categoryService.putOne(values, categoryId)
                        .finally(() => dispatch(categoriesActions.setFetchingEdit(true)))
                        .finally(() => dispatch(categoriesActions.setShowOverlayEdit(false)))
                        .finally(() => setSubmitting(false))
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <Field type="text" name="name"/>
                            <ErrorMessage name="name" component="div"/>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>

            <div>
                <button onClick={() => dispatch(categoriesActions.setShowOverlayEdit(false))}>cancel</button>
            </div>
        </div>
    );
};

export default CategoryEditPopup;