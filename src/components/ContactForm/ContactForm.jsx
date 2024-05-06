import css from './ContactForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';

export default function ContactForm({ addContact }) {
  const initialValues = {
    name: '',
    phoneNumber: '',
  };

  const nameFieldId = useId();
  const phoneNumberFieldId = useId();

 const handleSubmit = (values, actions) => {
  addContact({ id: Date.now(), name: values.name, number: values.phoneNumber });
  actions.resetForm();
};

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            className={css.field}
            id={nameFieldId}
          />
          <label htmlFor={phoneNumberFieldId}>Number</label>
          <Field
            type="text"
            name="phoneNumber"
            className={css.field}
            id={phoneNumberFieldId}
          />
          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}
