import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact.jsx';
import { selectContacts, selectNameFilter } from '../../redux/filters/selectors.js';

export default function ContactList() {
  const nameFilter = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);
  console.log(contacts, nameFilter);
  const filterContacts = contacts.filter(({ name, number }) => {
    return name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        number.includes(nameFilter)
  })
  return (
    <div>
      {filterContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
}