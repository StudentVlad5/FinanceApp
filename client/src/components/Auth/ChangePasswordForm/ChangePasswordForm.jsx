import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik, Formik } from 'formik';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
// import { useTranslation } from 'react-i18next';
import { changePasswordAuth } from '../../../redux/auth/operations';
import schemas from 'utils/schemas';
import { Section, Container } from 'components/baseStyles/CommonStyle.styled';
import { theme } from 'components/baseStyles/Variables.styled.js';
import {
  FormInputLogin,
  FormStyled,
  TitleLogin,
  ErrorBox,
  ShowPassword,
} from '../LoginForm/LoginForm.styled.js';
import { FormLabel, Error, FormField } from 'components/baseStyles/Form.styled.js';
import { BtnLight } from 'components/baseStyles/Button.styled.js';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useProject } from '../../../context/ProjectContext';

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { openChangePassword, setOpenChangePassword } = useProject();
  const dispatch = useDispatch();
  // const { t } = useTranslation();

  const onSubmit = async ({ values }) => {
    setIsLoading(true);
    try {
      const { email, password } = values;
      await dispatch(
        changePasswordAuth({
          email,
          password,
        }),
      );
      setOpenChangePassword(false);
    } catch (error) {
      console.error('Change password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemas.changePasswordSchema,
    onSubmit: (values, action) => {
      onSubmit({ values, action });
    },
  });

  const isValid =
    (formik.errors.email && formik.touched.email) || formik.values.email === '' ? true : false;

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? `${theme.colors.red}` : `${theme.colors.darkGreen}`;
  };

  return (
    <Dialog
      open={openChangePassword}
      onClose={() => setOpenChangePassword(false)}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle>проводимо зміну пароля на новий</DialogTitle>
      <DialogContent>
        <Section>
          <Container>
            <Formik validationSchema={schemas.changePasswordSchema}>
              <FormStyled onSubmit={formik.handleSubmit} autoComplete='off'>
                <TitleLogin>Змінити пароль</TitleLogin>
                <FormField>
                  <FormLabel htmlFor='email'>
                    <span>E-mail</span>
                    {formik.errors.email && formik.touched.email ? (
                      <Error>{formik.errors.email}</Error>
                    ) : null}
                  </FormLabel>
                  <FormInputLogin
                    bordercolor={showAccentValidateInput(formik.values.email, formik.errors.email)}
                    name='email'
                    type='email'
                    value={formik.values.email}
                    validate={schemas.changePasswordSchema.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <ErrorBox style={{ bottom: '22px' }}>{formik.errors.email}</ErrorBox>
                  ) : null}
                </FormField>
                <FormField>
                  <FormLabel htmlFor='password'>
                    <span>Новий Пароль</span>
                    {formik.errors.password && formik.touched.password ? (
                      <Error>{formik.errors.password}</Error>
                    ) : null}
                  </FormLabel>
                  <FormInputLogin
                    bordercolor={showAccentValidateInput(
                      formik.values.password,
                      formik.errors.emapasswordil,
                    )}
                    name='password'
                    type={showPass ? 'text' : 'password'}
                    value={formik.values.password}
                    validate={schemas.changePasswordSchema.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <ShowPassword onClick={showPassword}>
                    {!showPass ? <ImEyeBlocked /> : <ImEye />}
                  </ShowPassword>
                  {formik.errors.password && formik.touched.password ? (
                    <ErrorBox style={{ bottom: '22px' }}>{formik.errors.password}</ErrorBox>
                  ) : null}
                </FormField>

                <BtnLight
                  style={{ height: 'auto' }}
                  type='submit'
                  disabled={isValid}
                  aria-label='Змінити пароль'
                >
                  {isLoading ? 'В процесі' : 'Змінити'}
                </BtnLight>
              </FormStyled>
            </Formik>
          </Container>
        </Section>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordForm;
