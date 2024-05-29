import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact.jsx';
import { selectFilteredContacts } from '../../redux/contacts/selectors.js';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  console.log("Filtered contacts:", filteredContacts);

  return (
    <div>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
}