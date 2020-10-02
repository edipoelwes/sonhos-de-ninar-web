import React from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  CardFooter,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'

import './styles.css'

const SignUp = () => {
  return (
    <div className="register-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6" md="6">
            <Form className="form" >
              <Card className="card-login mt-3">
                <CardHeader>
                  <CardHeader>
                    <h3 className="header text-center">Register</h3>
                  </CardHeader>
                </CardHeader>
                <CardBody>
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
                      autoComplete="off"
                    />
                  </InputGroup>
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
                      autoComplete="off"
                    />
                  </InputGroup>
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
                    />
                  </InputGroup>
                </CardBody>
                <CardBody>
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
                      autoComplete="off"
                    />
                  </InputGroup>

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
                      autoComplete="off"
                    />
                  </InputGroup>

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
                      autoComplete="off"
                    />
                  </InputGroup>

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

          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('../../../assets/img/bg/fabio-mangione.jpg')})`
        }}
      />
    </div>
  )
}

export default SignUp
