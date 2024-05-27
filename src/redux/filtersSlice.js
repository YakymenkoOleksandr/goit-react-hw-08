/*Ми імпортуємо функцію createSlice з Redux Toolkit.
Ця функція дозволяє легко створювати slice, що включає початковий стан, ред'юсери та генератори екшенів.*/
import { createSlice } from '@reduxjs/toolkit';

/*Ми визначаємо початковий стан (initial state) для фільтрів.
У цьому випадку у нас є один фільтр name, який початково є пустим рядком.*/
const filtersInitialState = {
  name: '',
};

/*Функція createSlice створює slice з наступними параметрами:
name: Ім'я slice ('filters').
initialState: Початковий стан, який ми визначили раніше (filtersInitialState).
reducers: Об'єкт, який містить функції-ред'юсери. Тут у нас є один ред'юсер setNameFilter,
який оновлює значення фільтра name на значення, передане в action.payload.*/
const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setNameFilter(state, action) {
      state.name = action.payload;
    },
  },
});

/*setNameFilter: Генератор екшенів для зміни фільтра name.*/
export const { setNameFilter } = filtersSlice.actions;
/*filtersReducer: Ред'юсер, який буде використано в конфігурації Redux store.*/
export const filtersReducer = filtersSlice.reducer;

/*Ми визначаємо і експортуємо селектор selectNameFilter, який дозволяє отримати значення фільтра name з стану Redux.
Цей селектор можна використовувати в компонентах для доступу до значення фільтра.*/
export const selectNameFilter = state => state.filters.name;

/*Питання 1. Що таке action.payload
Відповідь.
action.payload — це властивість об'єкта дії (action) в Redux, яка містить дані, передані в дію при її виклику.
Дії (actions) в Redux — це прості об'єкти, які описують тип події, що відбулася, і, зазвичай, містять додаткові дані,
які необхідні для зміни стану (state) в Redux store.
Приклад об'єкта дії
Розглянемо простий приклад об'єкта дії:
const action = {
  type: 'SET_NAME_FILTER',
  payload: 'John Doe'
};
У цьому прикладі:
type — це тип дії ('SET_NAME_FILTER'), який зазвичай є рядком, що описує, яка подія відбулася.
payload — це дані, що передаються разом з дією. В даному випадку це рядок 'John Doe', який є новим значенням 
для фільтра name.
Як передається payload при виклику дії

Щоб змінити фільтр name, ви викликаєте генератор дії setNameFilter з новим значенням. Наприклад:
dispatch(setNameFilter('Jane Doe'));

Це створить і відправить дію (action) такого вигляду:
{
  type: 'filters/setNameFilter',
  payload: 'Jane Doe'
}
*/

/*Питання 2. Що таке початковий стан, ред'юсери та генератори екшенів
Початковий стан (initial state)
Початковий стан — це об'єкт, який визначає стан додатка на момент
його початкового завантаження. Він використовується для ініціалізації стану в Redux store.
const filtersInitialState = {
  name: '',
};

Ред'юсери (reducers)
Ред'юсери — це чисті функції, які визначають, як змінюється стан додатка у відповідь на дії (actions).
Вони приймають поточний стан і об'єкт дії як аргументи і повертають новий стан.
Ред'юсери ніколи не повинні змінювати поточний стан безпосередньо, вони повинні повертати новий об'єкт стану.
 reducers: {
    setNameFilter(state, action) {
      state.name = action.payload;
    },

Генератори екшенів (action creators)
Генератори екшенів — це функції, які створюють і повертають об'єкти дій (actions).
Ці об'єкти мають принаймні властивість type,
яка визначає тип дії, і зазвичай можуть містити додаткові дані у властивості payload.
export const { setNameFilter } = filtersSlice.actions;
Цей рядок експортує генератор екшенів setNameFilter, який створює дію для зміни фільтра name.
*/
