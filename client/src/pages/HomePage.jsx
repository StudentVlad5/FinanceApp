import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { Home } from 'components/Home/Home';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Home" description="" />
      <Home />
    </>
  );
};

export default HomePage;