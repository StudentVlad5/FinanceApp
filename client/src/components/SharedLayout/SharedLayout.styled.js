import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const Main = styled.main`
  min-height: calc(100vh - 100px);
  padding-top: 70px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding-top: 100px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    min-height: calc(100vh - 200px);
    padding-top: 100px;
  }
`;