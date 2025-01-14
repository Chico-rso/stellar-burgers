import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feeds/reducer';
import { clearOrderData } from '../../services/slices/order/reducer';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.feeds.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());

    return () => {
      dispatch(clearOrderData());
    };
  }, [dispatch]);

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
