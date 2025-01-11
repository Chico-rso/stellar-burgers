import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feeds/reducer';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.feeds.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleRefresh = () => {
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
