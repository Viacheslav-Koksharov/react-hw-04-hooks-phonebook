import {useState} from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import useLocalStorage from '../hooks/useLocalStorage'

const defaultContacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]


export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts',defaultContacts)
  const [filter, setFilter] = useState('');

  const handleSubmitForm = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    const addNewContact = contacts
      .map(({ name }) => name)
      .includes(name);

    if (addNewContact) {
      alert(`${newContact.name} is already in your contacts`);
      return;
    }
    setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
   };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (filter.length) {
      return contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter),
      )
    } else {return contacts}
  };

    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmitForm} />
          <h2>Contacts</h2>
          <Filter value={filter} onFilterContact={changeFilter} />
          <ContactsList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        </div>
      </>
    );
}
