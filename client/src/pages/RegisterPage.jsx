import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import SignUnForm from 'components/Auth/SignUpForm/SignUpForm';

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title='Register' description='' />
      <SignUnForm />
    </>
  );
};

export default RegisterPage;
