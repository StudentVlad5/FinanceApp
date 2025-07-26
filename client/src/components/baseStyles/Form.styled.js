import styled from 'styled-components';
import { Field, Form } from 'formik';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BtnLight } from 'components/baseStyles/Button.styled';
import { theme } from 'components/baseStyles/Variables.styled';
import { Headline } from './CommonStyle.styled';

export const FormTitle = styled(Headline)`
  font-size: 18px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 32px;
  }
`;

export const StyledForm = styled(Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`;

export const FormList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: stretch;
  gap: 15px;

  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`;

export const FormField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

export const FormLabel = styled.label`
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 80% */
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${theme.colors.grey1};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 18px;
  }
`;

export const FormLabelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  width: 100%;

  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.04em;
`;

export const FormRatio = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  width: 70%;

  font-family: ${theme.fonts[0]};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.04em;
`;

export const FormInputBox = styled.div`
  display: flex;
  gap: 8px;
  width: 70%;
`;

export const FormInputBoxColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 70%;

  & input {
    width: calc(100% - 42px);
  }
`;

export const FormInput = styled(Field)`
  width: 100%;
  padding: 12px;

  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  letter-spacing: 1.6px;
  /* text-transform: capitalize; */
  color: ${theme.colors.grey2};

  background: ${theme.colors.white};
  border: none;
  border-radius: 14px;
  transition: ${theme.transition};

  &:focus,
  &:hover {
    outline: none;
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
    font-size: 14px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 365px;
    padding: 16px 25px;
    font-size: 16px;
  }

  &::placeholder {
    color: ${theme.colors.grey2};
  }

  &:hover,
  &:focus,
  &:focus-within {
    &::placeholder {
      opacity: 0;
    }
  }
`;

export const ShowPassword = styled.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;

  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`;

export const Span = styled.span`
  position: absolute;
  left: 20px;
  top: 13px;

  font-family: ${theme.fonts[0]};
  font-size: ${theme.fontSizes.small};
  text-transform: uppercase;
  pointer-events: none;

  transition: ${theme.transition};
`;

export const IconValid = styled(FaCheck)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`;

export const IconInValid = styled(FaTimes)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`;

export const Btn = styled(BtnLight)`
  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: -15px;
  right: 0px;
  z-index: 99;

  font-family: ${theme.fonts[0]};
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  text-align: right;
  color: ${theme.colors.red};
`;