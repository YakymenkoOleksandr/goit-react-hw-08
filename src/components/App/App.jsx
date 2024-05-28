import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const TasksPage = lazy(() => import('../pages/TasksPage/TasksPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectTo="/login" component={<TasksPage />} />
          }
        />
      </Routes>
    </Layout>
  );
};

/*
import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import css from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from '../../redux/contactsSlice';
import { selectNameFilter, setNameFilter } from '../../redux/filtersSlice.js';
import { useEffect } from 'react';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from '../../redux/contactsOps.js';

export default function App() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const visibleContacts = contacts.filter(contact => {
    if (!contact || typeof contact.name !== 'string') {
      console.error('Invalid contact structure:', contact);
      return false;
    }
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h1 className={css.nameOfApp}>Phonebook </h1>
      <ContactForm
        addContact={(name, phoneNumber) =>
          dispatch(addContact({ name, phoneNumber }))
        }
      />
      <SearchBox
        filter={filter}
        setFilter={value => dispatch(setNameFilter(value))}
      />
      {isLoading && !error && <p className={css.loading}>Loading...</p>}
      <ContactList
        contacts={visibleContacts}
        deleteContact={contactId => dispatch(deleteContact(contactId))}
      />
    </>
  );
}
*/
