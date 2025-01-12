import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({
  orderByDate,
  background
}) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} background={background} />
    ))}
  </div>
);
