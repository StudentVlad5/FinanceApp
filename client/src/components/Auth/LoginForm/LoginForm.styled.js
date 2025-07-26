import { FormTitle, FormInput, StyledForm } from 'components/baseStyles/Form.styled';
import { theme } from 'components/baseStyles/Variables.styled';
import styled from 'styled-components';
import { BtnLight } from 'components/baseStyles/Button.styled';
import { Link } from 'react-router-dom';
import { Container } from 'components/baseStyles/CommonStyle.styled';

export const TitleLogin = styled(FormTitle)`
  width: 100%;
  text-align: start;
`;
export const ErrorBox = styled.div`
  position: absolute;
  white-space: nowrap;
  bottom: -5px;
  left: 15px;
  margin-bottom: -16px;
  color: #e53e3e;
  font-family: ${theme.fonts[1]};
  font-size: ${theme.fontSizes.small};
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.03em;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    left: 32px;
  }
`;
export const FormContainer = styled(Container)`
  max-width: 250px;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    max-width: 540px;
  }
`;
export const FormInputLogin = styled(FormInput)`
  min-width: 250px;
  border: 1px solid ${(props) => props.bordercolor || 'transparent'};
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    min-width: 450px;
    margin-bottom: 35px;
  }
`;
export const ShowPassword = styled.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 80%;
  transform: translateY(-80%);
  color: ${theme.colors.grey2};
  cursor: pointer;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    top: 62%;
    height: 50px;
  }
  & svg {
    width: inherit;
    height: inherit;
  }
`;
export const Btn = styled(BtnLight)`
  font-size: 14px;
  width: 180px;
  height: 50px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 217px;
    height: 70px;
    font-size: 16px;
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;
export const StyledLink = styled(Link)`
  color: ${theme.colors.grey2};
  transition: ${theme.transition[0]};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }
`;
export const BoxText = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;

  & span {
    color: ${theme.colors.grey1};
    font-weight: 400;
    font-size: 14px;
    font-family: ${theme.fonts[0]};
    font-style: normal;
    letter-spacing: 0.04em;

    @media screen and (min-width: ${theme.breakpoints.tablet}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      font-size: 18px;
    }
  }
`;

export const FormStyled = styled(StyledForm)`
  gap: 15px;
  &:last-child {
    margin-bottom: 20px;
  }
`;
