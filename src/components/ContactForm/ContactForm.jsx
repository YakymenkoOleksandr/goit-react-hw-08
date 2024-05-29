import css from './ContactForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addContact } from '../../redux/contacts/operations';

export default function ContactForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    number: '',
  };

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nameFieldId = useId();
  const phoneNumberFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    console.log('Submitting form with values:', values); // Логування значень форми
    dispatch(addContact(values));
    resetForm();
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must not exceed 50 characters'),
    number: yup
      .string()
      .required('Phone number is required')
      .min(3, 'Phone number must be at least 3 characters')
      .max(50, 'Phone number must not exceed 50 characters'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              type="text"
              name="name"
              className={css.field}
              id={nameFieldId}
              onBlur={() => setSubmitAttempted(true)}
            />
            {(submitAttempted || touched.name) && errors.name && (
              <div className="error">{errors.name}</div>
            )}
            <label htmlFor={phoneNumberFieldId}>Number</label>
            <Field
              type="text"
              name="number"
              className={css.field}
              id={phoneNumberFieldId}
              onBlur={() => setSubmitAttempted(true)}
            />
            {(submitAttempted || touched.number) && errors.number && (
              <div className="error">{errors.number}</div>
            )}
            <button type="submit" className={css.btn}>
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}