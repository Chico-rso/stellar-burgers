import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { selectAllIngredients } from '../../services/slices/ingredients/reducer';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order, background }) => {
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(selectAllIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      total,
      date: new Date(order.createdAt),
      remains
    };
  }, [ingredients, order]);

  if (!orderInfo) return null;

  const locationState = {
    background: location,
    orderInfo
  };

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={locationState}
      background={background}
    />
  );
});
