import css from './SearchBox.module.css';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {selectNameFilter} from "../../redux/filters/selectors.js"
import {setNameFilter} from '../../redux/filters/slise.js';

export default function SearchBox() {
  const searchFieldId = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div>
      <Formik>
        <Form className={css.form}>
          <label htmlFor={searchFieldId}>Search</label>
          <Field
            type="text"
            name="search"
            className={css.field}
            id={searchFieldId}
            value={filter}
            onChange={e => dispatch(setNameFilter(e.target.value))}
          />
        </Form>
      </Formik>
    </div>
  );
}
