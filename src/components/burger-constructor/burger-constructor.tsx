import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  emptyIngredient,
  selectBurgerConstructor
} from '../../services/slices/burger-constructor/reducer';
import {
  clearOrderData,
  postOrderBurger,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/order/reducer';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearOrderData());
  }, [dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      navigate('/login'), { replace: true };
      return;
    }
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(postOrderBurger(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(emptyIngredient());
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
