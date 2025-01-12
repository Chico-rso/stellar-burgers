import { TOrder } from '@utils-types';
import { Location } from 'react-router-dom';

export type OrdersListUIProps = {
  orderByDate: TOrder[];
  background?: Location;
};
