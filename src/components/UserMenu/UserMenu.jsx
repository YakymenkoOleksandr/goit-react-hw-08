import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
    // Перевіряємо, чи існує об'єкт user перед спробою читати його властивість name
  const userName = user ? user.name : '';


  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {userName}!</p>
      <button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};
