import Contact from '../Contact/Contact.jsx'
export default function ContactList({ contacts, deleteContact }) {
  return (
    <div>
      {contacts.map(contact => (
        <Contact key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </div>
  );
}
