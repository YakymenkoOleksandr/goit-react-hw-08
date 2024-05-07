import css from './SearchBox.module.css';
import { useId } from "react";
import { Formik, Form, Field } from 'formik';
export default function SearchBox({filter, setFilter}) {
    
    const searchFieldId = useId();
    return (
        <div>
            <Formik>
                <Form className={css.form}>
                    <label htmlFor={searchFieldId}>Name</label>
                    <Field
                    type="text"
                    name="search"
                    className={css.field}
                        id={searchFieldId}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </Form>
            </Formik>
        </div>
    );
}