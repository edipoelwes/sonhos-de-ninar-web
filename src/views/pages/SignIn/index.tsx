import React, { FormEvent, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../../hooks/AuthContext'
import { sweetAlert } from '../../../utils/sweetAlert'

import { refreshPage } from '../../../utils/utils'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from 'reactstrap'

import './styles.css'

const SignIn:React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      try {
        await signIn({
          email,
          password
        })
        refreshPage()
      } catch (error) {
        sweetAlert('E-mail/Password inválido', 'error')
      }
    }, [signIn, email, password]

  )

  return (
    <div className="login-page" >
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={handleSubmit}>
              <Card className="card-login">
                <CardHeader>
                  <CardHeader>
                    <h3 className="header text-center">Login</h3>
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
                      name="email"
                      placeholder="E-mail"
                      type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
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

export default SignIn
