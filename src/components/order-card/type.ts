import { TOrder } from '@utils-types';
import { Location } from 'react-router-dom';

export type OrderCardProps = {
  order: TOrder;
  background?: Location;
};
