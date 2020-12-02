import React, { FormEvent } from 'react'
import api from '../../services/api'
import Input from '../components/Input'
import { sweetAlert } from '../../utils/sweetAlert'
import { cpfMask, phoneMask } from '../../utils/masks'
import { companyStorage } from '../../utils/utils'
import { UserProps } from '../pages/Users'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap'

interface ModalProps {
  id: number | null
  modalOpen: boolean
  users: UserProps[]
  name: string
  email: string
  password: string
  document: string
  phone: string
  setId(param: number | null): void
  setModalOpen(param: boolean): void
  setUsers(param: UserProps[]): void
  setName(param: string): void
  setEmail(param: string): void
  setPassword(param: string): void
  setDocument(param: string): void
  setPhone(param: string): void
}

const ModalUser: React.FC<ModalProps> = ({
  id,
  modalOpen,
  users,
  name,
  email,
  password,
  document,
  phone,
  setId,
  setModalOpen,
  setUsers,
  setName,
  setEmail,
  setPassword,
  setDocument,
  setPhone,
}) => {
  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      company_id: companyStorage(),
      name,
      email,
      document,
      phone,
      password,
    }

    try {
      const response = await api.post('/users', data)
      setUsers([...users, response.data])
      setModalOpen(!modalOpen)
      sweetAlert('Cadastrado com sucesso')
    } catch (err) {
      setModalOpen(!modalOpen)
      sweetAlert('Erro ao cadastrar', 'error')
    }
  }

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      name,
      email,
      document,
      phone,
      password,
    }

    try {
      const response = await api.put(`/users/${id}`, data)

      setUsers(users.map((user) => (user.id === id ? response.data : user)))
      handleClose()
      sweetAlert('Atualizado com sucesso')
    } catch (err) {
      handleClose()
      sweetAlert('Erro ao atualizar', 'error')
    }
  }

  const handleClose = () => {
    setId(null)
    setName('')
    setEmail('')
    setDocument('')
    setPhone('')
    setPassword('')
    setModalOpen(!modalOpen)
  }

  console.log(users)

  return (
    <Container>
      <Row>
        <Col>
          <Modal toggle={handleClose} isOpen={modalOpen}>
            <div className=" modal-header">
              <h5 className=" modal-title" id="exampleModalLabel">
                {id === null ? 'Formulário de cadastro' : 'Formulário de atualização'}
              </h5>
            </div>
            <Form onSubmit={id === null ? handleCreateUser : handleUpdateUser}>
              <ModalBody>
                <FormGroup>
                  <Input
                    type="text"
                    id="name"
                    label="Nome *"
                    name="name"
                    placeholder="Maria da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    id="email"
                    label="Email *"
                    name="email"
                    placeholder="xxx@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    id="password"
                    label="Password *"
                    name="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="document"
                    label="CPF *"
                    name="document"
                    placeholder="999.999.999.99"
                    value={document}
                    onChange={(e) => {
                      setDocument(cpfMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="phone"
                    label="Telefone *"
                    name="phone"
                    placeholder="(86) 99999-9999"
                    value={phone}
                    onChange={(e) => {
                      setPhone(phoneMask(e.target.value))
                    }}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" className="btn-success">
                  salvar
                </Button>
                <Button
                  type="button"
                  className="btn-danger mr-5"
                  onClick={handleClose}
                >
                  fechar
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  )
}

export default ModalUser
