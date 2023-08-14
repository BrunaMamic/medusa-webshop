import { redirect } from 'next/navigation';

const Registration = async () => {
  redirect('/registration/sign-in');
};

export default Registration;
