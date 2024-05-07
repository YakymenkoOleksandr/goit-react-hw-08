import css from './ContactForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export default function ContactForm({ addContact, validationSchema }) {
  const initialValues = {
    name: '',
    phoneNumber: '',
  };

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const nameFieldId = useId();
  const phoneNumberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const id = nanoid();
    addContact({ id, name: values.name, number: values.phoneNumber });
    actions.resetForm();
  };

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
              name="phoneNumber"
              className={css.field}
              id={phoneNumberFieldId}
              onBlur={() => setSubmitAttempted(true)}
            />
            {(submitAttempted || touched.phoneNumber) && errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
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
