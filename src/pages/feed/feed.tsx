import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { changeOrders, getFeeds } from '../../services/slices/feeds/reducer';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector((state) => state.feeds.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds()), [dispatch];
  });

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
