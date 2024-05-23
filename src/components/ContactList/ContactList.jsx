import Contact from '../Contact/Contact.jsx'
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import {selectNameFilter} from '../../redux/filtersSlice.js'
export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const searchFilter = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter(({name}) => name.includes(searchFilter))

  return (
    <div>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
}