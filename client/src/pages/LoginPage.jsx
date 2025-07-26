import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Login" description="" />
      <LoginForm />
    </>
  );
};

export default LoginPage;