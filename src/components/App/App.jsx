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
  /*useSelector — це хук, який надає доступ до стану
  Redux з функціонального компонента. Він приймає селекторну функцію як аргумент і повертає вибране значення зі стану Redux.
  useSelector викликає функцію selectContacts з поточним станом Redux як аргументом. selectContacts повертає список контактів
  (state.contacts.items). contacts містить масив контактів з Redux стану.*/
  const contacts = useSelector(selectContacts);
  /*useSelector викликає функцію selectNameFilter.
  selectNameFilter повертає значення фільтра (state.filters.name).
  filter містить поточне значення фільтра з Redux стану.*/
  const filter = useSelector(selectNameFilter);
  /*useDispatch — це хук, який повертає посилання на функцію dispatch з Redux.
  Використовується для відправки дій до Redux стора.
  useDispatch повертає функцію dispatch, яка дозволяє відправляти дії до Redux стора.
  dispatch використовується для запуску асинхронних операцій або зміни стану Redux.
  */
  const dispatch = useDispatch();
  /*useSelector викликає функцію selectIsLoading.
  selectIsLoading повертає стан завантаження (state.contacts.isLoading).
  isLoading містить логічне значення, яке вказує на стан завантаження даних.*/
  const isLoading = useSelector(selectIsLoading);
  /*useSelector викликає функцію selectError.
  selectError повертає повідомлення про помилку (state.contacts.error).
  error містить повідомлення про помилку з Redux стану.*/
  const error = useSelector(selectError);
  /*useEffect виконує передану функцію при кожному рендері компонента, але тільки якщо змінюється значення залежностей (другий аргумент).
  Тут useEffect має масив залежностей [dispatch], тому він виконається лише один раз при першому
  рендері компонента (оскільки dispatch не змінюється). Функція всередині useEffect викликає dispatch(fetchContacts());.
  Це відправляє асинхронну дію fetchContacts до Redux стора, яка запускає процес завантаження контактів з сервера.*/
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  /*Створюється новий масив visibleContacts, який буде містити лише ті контакти, які задовольняють умови всередині filter функції.
Метод filter: Метод filter викликає передану функцію для кожного елемента масиву contacts і повертає новий масив,
що містить лише ті елементи, для яких функція повернула true.*/
  const visibleContacts = contacts.filter(contact => {
    // Перевірка структури об'єкта
    /*Що відбувається: Перевіряється структура об'єкта contact.
Умова: !contact перевіряє, чи є об'єкт contact значенням, що можна перевірити (тобто чи не є він null або undefined).
Типова перевірка: typeof contact.name !== 'string' перевіряє, чи є властивість name в об'єкті contact рядком.
Логіка перевірки: Якщо contact не є дійсним об'єктом або contact.name не є рядком, виконується код всередині блоку if.*/
    if (!contact || typeof contact.name !== 'string') {
    /*Що відбувається: Якщо контакт не відповідає очікуваній структурі (або contact не є дійсним об'єктом, або contact.name не є рядком),
    в консоль виводиться повідомлення про помилку з інформацією про неправильну структуру контакту.*/
      console.error('Invalid contact structure:', contact);
      /*Якщо контакт не відповідає очікуваній структурі, він не включається в новий масив visibleContacts.
      Метод filter пропускає цей контакт, оскільки функція повертає false.*/
      return false;
    }
    /*Що відбувається: Якщо контакт відповідає очікуваній структурі, перевіряється, чи включає його ім'я (зведене до нижнього регістру) підрядок, який міститься в filter (також зведений до нижнього регістру).
    Метод toLowerCase: Зводить рядки до нижнього регістру для порівняння незалежно від регістру.
    Метод includes: Перевіряє, чи є значення filter підрядком імені контакту.
    Повернення значення: Якщо ім'я контакту включає значення filter, функція повертає true,
    і контакт включається в новий масив visibleContacts.*/
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
