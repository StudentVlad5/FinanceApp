import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import { Header } from 'components/Header/Header';
// import { Footer } from 'components/Footer/Footer';
import { Main } from './SharedLayout.styled';
import { ScrollTop } from 'helpers/Scroll/ScrollToTop';
import { SEO } from 'utils/SEO';

export const SharedLayout = () => {
  return (
    <>
        <Suspense fallback={'Loading...'}>
          <SEO title="finance" description="finance app"/>
          {/* <Header /> */}
          <Main>
            <Outlet />
          </Main>
          {/* <Footer /> */}
          <ScrollTop />
        </Suspense>
    </>
  );
};