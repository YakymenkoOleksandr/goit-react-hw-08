import { createAsyncThunk } from '@reduxjs/toolkit'; // Бібліотека з якої ми беремо createAsyncThunk для створення асинхронних функцій
import axios from 'axios'; // Бібліотека для асинхронних запитів на бекенд

axios.defaults.baseURL = `https://6651b9f220f4f4c44278882e.mockapi.io`;
/* - це властивість об'єкта defaults, яка налаштовує
базовий URL для всіх HTTP запитів, які ви виконуєте за допомогою бібліотеки Axios
Наприклад, якщо ви встановите axios.defaults.baseURL на https://example.com/api, і потім зробите запит до
/users, то фактичний URL запиту буде https:/ / example.com / api / users.*/

export const fetchContacts = createAsyncThunk(
  /*createAsyncThunk - це функція з бібліотеки Redux Toolkit, яка дозволяє створювати асинхронні thunks для виконання
асинхронних операцій, таких як HTTP запити, і обробляти їх у вашому Redux store.*/
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    //thunkAPI - це об'єкт, який надається Redux Toolkit для кожного thunk під час його виконання.
    try {
      //Ця строка коду виконує HTTP GET запит за адресою /contacts за допомогою бібліотеки Axios.
      const response = await axios.get('/contacts');
      //response.data - це частина об'єкта відповіді, яка містить реальні дані, які були отримані від сервера.
      return response.data;
      /*Якщо якась помилка виникне у блоці try, управління перейде до блоку catch.
e (або будь-яке інше ім'я) є параметром, що містить інформацію про помилку.*/
    } catch (e) {
      /*Ця функція повертає відхилений проміс з повідомленням про помилку.
e.message містить текстове повідомлення, яке пояснює причину помилки.*/
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
/*Функція з Redux Toolkit, що допомагає створювати асинхронні операції (thunks),
 які можуть працювати з промісами. Вона приймає два аргументи: тип дії та асинхронну функцію.*/
export const addContact = createAsyncThunk(
  /*'contacts/addContact'. Це використовується для ідентифікації цієї конкретної асинхронної операції у Redux.*/
  'contacts/addContact',
  /*  async ({ name, phoneNumber }, thunkAPI) Асинхронна функція, яка є другим аргументом для createAsyncThunk.
{ name, phoneNumber }: Деструктурування об'єкта, який містить новий контакт. name та phoneNumber є 
полями об'єкта, що передається в функцію.
thunkAPI: Об'єкт, який містить корисні методи та властивості для роботи з thunk'ами,
зокрема для відхилення дії та доступу до стану Redux.*/
  async ({ name, phoneNumber }, thunkAPI) => {
    try {
      /*await axios.post('/contacts', { name, phoneNumber }): Виконує POST-запит до /contacts на бекенді,
передаючи об'єкт з новим контактом, що містить name та phoneNumber.
axios.post: Використовується для створення нового ресурсу на сервері.
response: Змінна, яка зберігає відповідь від сервера.
Ця відповідь містить новостворений контакт разом з його унікальним ідентифікатором, згенерованим сервером.*/
      const response = await axios.post('/contacts', { name, phoneNumber });
      /*Повертає дані з відповіді сервера. Це означає,
що результат виконання addContact буде доступний у стані Redux, коли thunk завершує своє виконання.*/
      return response.data;
      /*Починає блок catch, який виконується, якщо у блоці try виникає помилка.*/
    } catch (e) {
      /*thunkAPI.rejectWithValue(e.message): Викликає метод rejectWithValue з об'єкта thunkAPI,
передаючи повідомлення про помилку e.message.
e.message: Містить текстове повідомлення про помилку.
Цей текст буде доступний у відповідній дії відхилення, яку обробляє Redux.*/
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/*createAsyncThunk: Функція з Redux Toolkit, що допомагає створювати асинхронні
операції (thunks), які можуть працювати з промісами. Вона приймає два аргументи: тип дії та асинхронну функцію. */
export const deleteContact = createAsyncThunk(
  /*Перший аргумент createAsyncThunk визначає тип дії Redux. У цьому випадку це 'contacts/deleteContact'.
Це використовується для ідентифікації цієї конкретної асинхронної операції у Redux.*/
  'contacts/deleteContact',
  /*async (contactId, thunkAPI): Асинхронна функція, яка є другим аргументом для createAsyncThunk.
contactId: Ідентифікатор контакту, який потрібно видалити. Це аргумент, що передається у функцію.
thunkAPI: Об'єкт, який містить корисні методи та властивості для роботи з thunk'ами,
зокрема для відхилення дії та доступу до стану Redux.*/
  async (contactId, thunkAPI) => {
    /*Починає блок try, в якому буде виконаний код, що може викликати помилку.*/
    try {
      /* await axios.delete(/contacts/${contactId})**: Виконує DELETE-запит до /contacts/${contactId}на бекенді,
видаляючи контакт з вказанимcontactId`.
axios.delete: Використовується для видалення ресурсу на сервері.
response: Змінна, яка зберігає відповідь від сервера. Ця відповідь містить інформацію про видалений контакт .*/
      const response = await axios.delete(`/contacts/${contactId}`);
      /*Повертає дані з відповіді сервера. Це означає,
що результат виконання deleteContact буде доступний у стані Redux, коли thunk завершує своє виконання.*/
      return response.data;
      /*Починає блок catch, який виконується, якщо у блоці try виникає помилка.*/
    } catch (e) {
      /*thunkAPI.rejectWithValue(e.message): Викликає метод rejectWithValue з об'єкта thunkAPI,
передаючи повідомлення про помилку e.message.
e.message: Містить текстове повідомлення про помилку. Цей текст буде доступний у відповідній дії відхилення,
яку обробляє Redux.*/
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
