import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps.js';

// Початковий стан contacts
/*createSlice створює слайс Redux з ім'ям contacts.*/
const contactsSlice = createSlice({
  name: 'contacts',
  /*initialState задає початковий стан для цього слайсу: порожній масив items,
isLoading зі значенням false та error зі значенням null.*/
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  /*extraReducers використовується для обробки додаткових ред'юсерів,
що відповідають на асинхронні дії fetchContacts, addContact, deleteContact.*/
  extraReducers: builder => {
    builder
      /*builder - це об'єкт, який використовується для послідовного додавання ред'юсерів до обробника екшенів в extraReducers
при використанні createSlice. Кожний метод addCase викликається на об'єкті builder, 
додаючи новий ред'юсер для обробки конкретного типу дії.

Отже, методи addCase викликаються послідовно, один за одним, для кожного типу дії.
Перший аргумент - це тип дії (наприклад, fetchContacts.pending, fetchContacts.fulfilled,
або fetchContacts.rejected), а другий аргумент - це функція-ред'юсер, яка буде виконана, коли відбудеться відповідна дія.*/
      /*Метод addCase додає обробник для конкретної дії. Він приймає два аргументи:
      тип дії та ред'юсер-функцію, яка повинна виконуватися, коли ця дія диспатчиться.
      fetchContacts.pending:
      Це одна з автоматично створених дій для createAsyncThunk. Коли ви створюєте асинхронну дію за допомогою createAsyncThunk,
      Redux Toolkit автоматично створює три типи дій: pending, fulfilled і rejected.
      Дія pending диспатчиться, коли асинхронна операція починається (тобто, коли виконується проміс, але ще не завершений).*/
      .addCase(fetchContacts.pending, handlePending)
      /*Це функція, яка буде виконуватися, коли дія fetchContacts.fulfilled буде диспатчена.
      Вона приймає два аргументи: поточний стан (state) і дію (action).*/
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false; //Це оновлює прапор isLoading в стані на false, вказуючи на те, що асинхронна операція завершена.
        state.error = null; //Це очищує будь-які попередні помилки, встановлюючи state.error на null
        state.items = action.payload; //Це оновлює state.items новими даними, які прийшли у відповіді від сервера. action.payload містить ці дані.
      })
      /*Це функція-ред'юсер, яка виконується, коли дія fetchContacts.rejected диспатчена.
      Вона обробляє стан при виникненні помилки в асинхронній операції.*/
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// Селектори для отримання стану контактів
/*selectContacts, selectIsLoading, і selectError — це селектори для отримання відповідних частин стану.*/
/*Що це таке: Це функція-стрілка (arrow function), яка приймає аргумент state та повертає state.contacts.items.
state: Це об'єкт стану Redux. Він містить весь глобальний стан програми, включаючи всі редюсери та їх стан.
state.contacts: Це частина стану Redux, яка обробляється редюсером contacts. Вона містить інформацію про контакти, включаючи масив контактів, стан завантаження (isLoading) та помилки (error).
state.contacts.items: Це конкретна частина стану contacts, яка містить масив контактів.*/
export const selectContacts = state => state.contacts.items;
/*Створюється та експортується константа selectIsLoading. state => state.contacts.isLoading:

Що це таке: Це функція-стрілка (arrow function), яка приймає аргумент state та повертає state.contacts.isLoading.
state: Це об'єкт стану Redux. Він містить весь глобальний стан програми, включаючи всі редюсери та їх стан.
state.contacts: Це частина стану Redux, яка обробляється редюсером contacts. Вона містить інформацію про контакти, стан 
завантаження (isLoading) та помилки (error). state.contacts.isLoading: Це конкретна частина стану contacts, яка вказує,
чи відбувається зараз завантаження даних (true або false). */
export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;
/*contactsReducer експортує ред'юсер, створений слайсом, для використання в Redux store.*/
export const contactsReducer = contactsSlice.reducer;

/*handlePending встановлює isLoading в true, сигналізуючи про те, що запит в процесі.*/
const handlePending = state => {
  state.isLoading = true;
};

/*handleRejected встановлює isLoading в false і оновлює error повідомленням з action.payload у випадку помилки.*/
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// Створення селектора для отримання значення фільтра зі стейту
/*selectNameFilter отримує значення фільтра name з частини стану filters.*/
export const selectNameFilter = state => state.filters.name;

// Створення мемоізованого селектора для фільтрування контактів за іменем
/*selectFilteredContacts використовує createSelector для створення мемоізованого селектора, який фільтрує контакти за іменем.
Цей селектор бере два входи: selectContacts і selectNameFilter.
Він повертає масив контактів, імена яких містять значення фільтра, порівнюючи їх у нижньому регістрі.*/
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

/*Питання 1
Що таке createSelector і createSlice
createSlice — це функція з бібліотеки @reduxjs/toolkit, яка спрощує процес створення слайсу стану (slice) в Redux. 
Слайс включає початковий стан, ред'юсери для оновлення стану і автоматично генерує екшени (actions) на основі цих ред'юсерів.

Основні компоненти createSlice:
name: Ім'я слайсу, використовується як префікс для автоматично згенерованих типів дій (action types).
initialState: Початковий стан слайсу.
reducers: Об'єкт, що містить ред'юсери для оновлення стану. Кожен ред'юсер отримує стан і дію (action) як аргументи.
extraReducers: Дозволяє обробляти дії, створені поза межами поточного слайсу, зазвичай для обробки асинхронних дій.

createSelector — це функція з бібліотеки reselect, яка також експортується @reduxjs/toolkit.
Вона використовується для створення мемоізованих селекторів, які можуть обчислювати похідні дані з Redux стану.
Мемоїзація допомагає уникнути непотрібних обчислень, якщо вхідні дані не змінювалися, тим самим підвищуючи продуктивність.

Основні компоненти createSelector:
input selectors: Функції, які отримують частини стану з Redux store.
output selector: Функція, яка обчислює та повертає значення на основі вихідних селекторів.

*/
