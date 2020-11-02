import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, ErrorMessage } from 'formik'
import { registerForm } from '../../../rules/schemas/schemasValidation'
import { sweetAlert } from '../../../utils/sweetAlert'
import api from '../../../services/api'

import Input from '../../components/Input'

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardFooter,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText,
} from 'reactstrap'

import './styles.css'

interface RegisterProps {
  name: string
  email: string
  password: string
  social_name: string
  alias_name: string
  document_company: string
  document_company_secondary: string
}

const SignUp: React.FC = () => {
  const history = useHistory()
  const initialValues: RegisterProps = {
    name: '',
    email: '',
    password: '',
    social_name: '',
    alias_name: '',
    document_company: '',
    document_company_secondary: '',
  }
  const handleSubmit = useCallback(
    async (
      data: RegisterProps,
      // { setSubmitting }: FormikHelpers<RegisterProps>,
    ) => {
      try {
        await api.post('/auth/register', data)
        sweetAlert('Cadastrado com sucesso')
        history.push('/')
      } catch {
        sweetAlert('Erro ao cadastrar', 'error')
      }
    },
    [history],
  )
  return (
    <div className="register-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6" md="6">
            <Formik
              initialValues={initialValues}
              validationSchema={registerForm}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form className="form">
                  <Card className="card-login mt-3">
                    <CardHeader>
                      <CardHeader>
                        <h3 className="header text-center">Register</h3>
                      </CardHeader>
                    </CardHeader>
                    <CardBody>
                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="name" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="name"
                          placeholder="Nome Completo"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </InputGroup>

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
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          placeholder="E-mail"
                          type="email"
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
                          value={values.password}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </CardBody>

                    <CardBody>
                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="social_name" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-bank" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="social_name"
                          placeholder="Empresa LTDA"
                          type="text"
                          value={values.social_name}
                          onChange={handleChange}
                        />
                      </InputGroup>

                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="alias_name" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-badge" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="alias_name"
                          placeholder="Nome Fantasia"
                          type="text"
                          value={values.alias_name}
                          onChange={handleChange}
                        />
                      </InputGroup>

                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="document_company" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-touch-id" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="document_company"
                          placeholder="CNPJ"
                          type="text"
                          value={values.document_company}
                          onChange={handleChange}
                        />
                      </InputGroup>

                      <FormText
                        color="default"
                        tag="span"
                        className="field-errors"
                      >
                        <ErrorMessage name="document_company_secondary" />
                      </FormText>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-touch-id" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="document_company_secondary"
                          placeholder="Inscrição Estadual"
                          type="text"
                          autoComplete="off"
                          value={values.document_company_secondary}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        type="submit"
                        className="btn-round mb-3"
                        color="success"
                      >
                        Registrar
                      </Button>
                    </CardFooter>
                    <Link to="/" className="register-login">
                      <i className="nc-icon nc-lock-circle-open" />
                      Login
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

export default SignUp
