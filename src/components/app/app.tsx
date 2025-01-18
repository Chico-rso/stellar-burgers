import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '@components';
import { getUser } from '../../services/slices/auth/reducer';
import { getIngredients } from '../../services/slices/ingredients/reducer';
import { clearOrderData } from '../../services/slices/order/reducer';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, []);

  const handleCloseModal = (path: string) => {
    dispatch(clearOrderData());
    navigate(path, { state: null });
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute ifNotAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute ifNotAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute ifNotAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute ifNotAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          {/* Маршруты для прямого перехода */}
          <Route
            path='/feed/:number'
            element={
              <div className={styles.page}>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <div className={styles.page}>
                <IngredientDetails />
              </div>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <div className={styles.page}>
                  <OrderInfo />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {/* Маршруты модальных окон */}
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Детали заказа'
                  onClose={() => handleCloseModal('/feed')}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => handleCloseModal('/')}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title='Детали заказа'
                    onClose={() => handleCloseModal('/profile/orders')}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
