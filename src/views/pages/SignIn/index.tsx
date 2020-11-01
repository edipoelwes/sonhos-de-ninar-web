import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik'
import { useAuth } from '../../../hooks/AuthContext'
import { sweetAlert } from '../../../utils/sweetAlert'
import { loginForm } from '../../../rules/schemas/schemasValidation'
// import { refreshPage } from '../../../utils/utils'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  FormText,
} from 'reactstrap'

import './styles.css'

interface LoginProps {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const initialValues: LoginProps = {
    email: '',
    password: '',
  }

  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (data: LoginProps, { setSubmitting }: FormikHelpers<LoginProps>) => {
      try {
        await signIn(data)
        // refreshPage()
      } catch (error) {
        sweetAlert('E-mail/Password inválido', 'error')
      }
    },
    [signIn],
  )

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Formik
              initialValues={initialValues}
              validationSchema={loginForm}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form className="form">
                  <Card className="card-login">
                    <CardHeader>
                      <CardHeader>
                        <h3 className="header text-center">Login</h3>
                      </CardHeader>
                    </CardHeader>
                    <CardBody>
                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="email" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          placeholder="E-mail"
                          type="text"
                          autoComplete="off"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="password" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-key-25" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="submit"
                        block
                        className="btn-round mb-3"
                        color="success"
                      >
                        Entrar
                      </Button>
                    </CardFooter>
                    <Link to="/signup" className="register-login-form">
                      <i className="nc-icon nc-key-25" />
                      Criar Conta
                    </Link>
                  </Card>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('../../../assets/img/bg/fabio-mangione.jpg')})`,
        }}
      />
    </div>
  )
}

export default SignIn
