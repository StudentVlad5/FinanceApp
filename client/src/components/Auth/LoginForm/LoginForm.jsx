import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { useFormik, Formik } from 'formik';
// import { useTranslation } from 'react-i18next';

import schemas from 'utils/schemas';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section, Container } from 'components/baseStyles/CommonStyle.styled';
import { Error, FormField, FormLabel } from 'components/baseStyles/Form.styled';
import { BtnLight } from 'components/baseStyles/Button.styled';
import {
  TitleLogin,
  ErrorBox,
  FormInputLogin,
  ShowPassword,
  // Btn,
  StyledLink,
  BoxText,
  FormContainer,
  FormStyled,
} from './LoginForm.styled';
import { logIn } from '../../../redux/auth/operations';

export const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    setIsLoading(true);
    const { email, password } = values;
    dispatch(
      logIn({
        email,
        password,
      }),
    );
    setIsLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemas.schemasLogin,
    onSubmit,
  });

  const isValid =
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.password && formik.touched.password) ||
    formik.values.email === ''
      ? true
      : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? `${theme.colors.red}` : `${theme.colors.darkGreen}`;
  };
  return (
    <Section>
      <Container>
        <Formik validationSchema={schemas.schemasLogin}>
          <FormStyled onSubmit={formik.handleSubmit} autoComplete='off'>
            <TitleLogin hidden>Log In</TitleLogin>
            <FormField>
              <FormLabel htmlFor='email'>
                <span>Email</span>
                {formik.errors.name && formik.touched.name ? (
                  <Error>{formik.errors.name}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                style={{
                  borderColor: showAccentValidateInput(formik.values.email, formik.errors.email),
                }}
                name='email'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
            </FormField>
            <FormField>
              <FormLabel htmlFor='password'>
                <span>Пароль</span>
                {formik.errors.name && formik.touched.name ? (
                  <Error>{formik.errors.name}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.password,
                    formik.errors.password,
                  ),
                }}
                name='password'
                type={showPass ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <ShowPassword onClick={showPassword}>
                {!showPass ? <ImEyeBlocked /> : <ImEye />}
              </ShowPassword>
              {formik.errors.password && formik.touched.password ? (
                <ErrorBox>{formik.errors.password}</ErrorBox>
              ) : null}
            </FormField>
            <FormContainer>
              <BoxText>
                <StyledLink to='/signup'>Якщо відсутній аккаунт, заходь сюди?</StyledLink>
              </BoxText>
              <BoxText>
                <StyledLink to='/forgot_password'>Забув пароль?</StyledLink>
              </BoxText>
              <BtnLight type='submit' disabled={isValid} aria-label='submit log in'>
                {isLoading ? 'В процесі' : 'Log In'}
              </BtnLight>
            </FormContainer>
          </FormStyled>
        </Formik>
      </Container>
    </Section>
  );
};

export default LoginForm;
