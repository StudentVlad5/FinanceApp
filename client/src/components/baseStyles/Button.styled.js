import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const BtnLight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 125px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${theme.colors.grey1};
  text-transform: uppercase;

  background-color: ${theme.colors.fon};
  border: 1px solid ${theme.colors.grey1};
  border-radius: 7px;

  cursor: pointer;
  transition: ${theme.transition};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 14px;
    padding: 18px 33px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    color: ${theme.colors.white};
    background-color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.accent};
  }
  &:disabled {
    color: ${theme.colors.brown2};
    background-color: ${theme.colors.grey1};
    opacity: 0.4;
    border: 1px solid ${theme.colors.accent};
  }
`;

export const BtnAccent = styled.button`
  min-width: 220px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${theme.colors.white};

  border-radius: 7px;
  background: ${theme.colors.accent};
  border: 1px solid ${theme.colors.accent};

  cursor: pointer;
  transition: ${theme.transition};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }

  &:hover,
  &:focus {
    color: ${theme.colors.grey2};
    background-color: transparent;
    border: 1px solid ${theme.colors.grey2};
  }
  &:disabled,
  &[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
`;

export const BtnLink = styled(NavLink)`
  position: relative;
  padding: 2px;

  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  transition: ${theme.transition};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  &::before,
  &::after,
  & span::after,
  & span::before {
    content: '';
    position: absolute;
    top: 100%;
    bottom: 0;
    left: -16px;
    width: 1px;
    background: ${theme.colors.accent};
    transition: ${theme.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${theme.colors.accent};
    border-left: 1px solid ${theme.colors.accent};
  }

  &::after {
    right: 0;
    left: 0;
    height: 1px;
    width: auto;
  }

  & span {
    position: relative;
    display: inline-block;

    &::before,
    &::after {
      top: -2px;
      left: auto;
      right: auto;
      width: 0;
      height: 1px;
      transition: ${theme.transition};
    }

    &::before {
      left: -18px;
    }

    &::after {
      right: -18px;
    }
  }

  &:hover,
  &:focus {
    &::before {
      top: 0;
    }
    &::after {
      right: -16px;
      left: -16px;
    }

    & span::before,
    & span::after {
      width: 60%;
    }
  }
`;