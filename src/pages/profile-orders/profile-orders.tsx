import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getPlacedOrders,
  selectOrdersList
} from '../../services/slices/order/reducer';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
