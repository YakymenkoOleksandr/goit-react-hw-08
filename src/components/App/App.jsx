import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import initialsContacts from './ContactList.json';
import { useState } from 'react';
export default function App() {
  const [contacts, setContacts] = useState(initialsContacts);

    const addContact = (newContact) => {
        setContacts((prevContacts) => {return [...prevContacts, newContact]})
    };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox />
      <ContactList contacts={contacts} />
    </>
  );
}
