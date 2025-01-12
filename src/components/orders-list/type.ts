import { TOrder } from '@utils-types';
import { Location } from 'react-router-dom';

export type OrdersListProps = {
  orders: TOrder[];
  background?: Location;
};
