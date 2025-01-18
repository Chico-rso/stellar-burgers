import { Preloader } from '@ui';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

//Интерфейс для защищенного роута
type ProtectedRouteProps = {
  children: ReactNode;
  ifNotAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  ifNotAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { userData, authChecked } = useSelector((state) => state.auth);

  // проверка на аутентификацию
  if (!authChecked) {
    return <Preloader />;
  }

  if (ifNotAuth && userData) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  if (!ifNotAuth && !userData) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }
  return children;
};
