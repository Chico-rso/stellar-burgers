import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { ProfileUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getUserData, updateUser } from '../../services/slices/auth/reducer';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const [formValue, setFormValue] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData?.name || '',
      email: userData?.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== userData?.name ||
    formValue.email !== userData?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData?.name || '',
      email: userData?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
