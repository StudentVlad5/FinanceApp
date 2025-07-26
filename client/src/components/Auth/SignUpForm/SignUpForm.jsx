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
  FormInputLogin,
  ShowPassword,
  FormContainer,
  FormStyled,
  StyledLink,
  BoxText,
} from './SignUpForm.styled.js';
import { register } from '../../../redux/auth/operations.js';

export const SignUnForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    setIsLoading(true);
    const { email, name, phone, password } = values;
    dispatch(
      register({
        email,
        name,
        phone: phone.toString(),
        password,
      }),
    );
    setIsLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
    },
    validationSchema: schemas.registerSchema,
    onSubmit,
  });

  const isValid =
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.password && formik.touched.password) ||
    (formik.errors.name && formik.touched.name) ||
    (formik.errors.phone && formik.touched.phone)
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
        <Formik validationSchema={schemas.registerSchema}>
          <FormStyled onSubmit={formik.handleSubmit} autoComplete='off'>
            <TitleLogin hidden>Реєстрація</TitleLogin>
            <FormField>
              <FormLabel htmlFor='name'>
                <span>Ім'я</span>
                {formik.errors.name && formik.touched.name ? (
                  <Error>{formik.errors.name}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                bordercolor={showAccentValidateInput(formik.values.name, formik.errors.name)}
                name='name'
                type='text'
                validate={schemas.schemasLogin.name}
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
            </FormField>
            <FormField>
              <FormLabel htmlFor='email'>
                <span>Email</span>
                {formik.errors.email && formik.touched.email ? (
                  <Error>{formik.errors.email}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                bordercolor={showAccentValidateInput(formik.values.email, formik.errors.email)}
                name='email'
                type='email'
                validate={schemas.schemasLogin.email}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
            </FormField>
            <FormField>
              <FormLabel htmlFor='phone'>
                <span>Номер телефону</span>
                {formik.errors.phone && formik.touched.phone ? (
                  <Error>{formik.errors.phone}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                bordercolor={showAccentValidateInput(formik.values.phone, formik.errors.phone)}
                name='phone'
                type='number'
                validate={schemas.schemasLogin.phone}
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
            </FormField>
            <FormField>
              <FormLabel htmlFor='password'>
                <span>Пароль</span>
                {formik.errors.password && formik.touched.password ? (
                  <Error>{formik.errors.password}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                bordercolor={showAccentValidateInput(
                  formik.values.password,
                  formik.errors.password,
                )}
                name='password'
                type={showPass ? 'text' : 'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <ShowPassword onClick={showPassword}>
                {!showPass ? <ImEyeBlocked /> : <ImEye />}
              </ShowPassword>
            </FormField>
            <FormContainer>
              <BoxText>
                <StyledLink to='/login'>Already have account?</StyledLink>
              </BoxText>
              <BtnLight type='submit' disabled={isValid} aria-label='submit sign in'>
                {isLoading ? 'Loading' : 'Sign In'}
              </BtnLight>
            </FormContainer>
          </FormStyled>
        </Formik>
      </Container>
    </Section>
  );
};

export default SignUnForm;
