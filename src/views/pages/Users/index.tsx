import React, { useEffect, useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FiEdit, FiTrash2, FiUserPlus } from 'react-icons/fi'
import Swal from 'sweetalert2'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap'
import api from '../../../services/api'
import { companyStorage } from '../../../utils/utils'
import ModalUser from '../../modals/ModalUser'
import { sweetAlert } from '../../../utils/sweetAlert'

export interface UserProps {
  id: number
  name: string
  email: string
  phone: string
  document: string
  password: string
}

const Users = () => {
  const [users, setUsers] = useState<UserProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [id, setId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async (): Promise<UserProps[] | void> => {
    setLoading(true)
    const company = companyStorage()
    const response = await api.get(`/users/${company}`)
    setUsers(response.data)
    setLoading(false)
  }

  const handleUpdateUser = async (id: number) => {
    const response = await api.get(`/user/${id}`)

    setId(id)
    setName(response.data.name)
    setEmail(response.data.email)
    setDocument(response.data.document)
    setPhone(response.data.phone)

    setModalOpen(!modalOpen)
  }

  const handleRemoveUser = async (id: number) => {
    try {
      Swal.fire({
        title: 'Tem certeza que quer Deletar esse registro?',
        text: 'Você não poderá reverter essa ação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`/users/${id}`)

          loadUsers()
          sweetAlert('Usuário removido com sucesso.')
        }
      })
    } catch {
      sweetAlert('Não foi possivel remover o usuário.', 'warning')
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="diapers-header">
                  <CardTitle tag="h4">Usuários</CardTitle>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <FiUserPlus size={18} className="mr-2" />
                    Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-left">Nome</th>
                      <th className="text-center">E-mail</th>
                      <th className="text-center">CPF</th>
                      <th className="text-center">Telefone</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center text-dark">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="text-center">{user.id}</td>
                          <td className="">{user.name}</td>
                          <td className="text-center">{user.email}</td>
                          <td className="text-center">{user.document}</td>
                          <td className="text-center">{user.phone}</td>
                          <td className="text-center">
                            <Button
                              className="btn-icon"
                              color="info"
                              id="tooltip264453216"
                              size="sm"
                              type="button"
                            >
                              <BiDetail size={16} />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip264453216"
                            >
                              Detalhes
                            </UncontrolledTooltip>
                            <Button
                              className="btn-icon"
                              color="success"
                              id="tooltip366246651"
                              size="sm"
                              type="button"
                              onClick={() => handleUpdateUser(user.id)}
                            >
                              <FiEdit size={16} />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip366246651"
                            >
                              Editar
                            </UncontrolledTooltip>
                            <Button
                              className="btn-icon"
                              color="danger"
                              id="tooltip476609793"
                              size="sm"
                              type="button"
                              onClick={() => handleRemoveUser(user.id)}
                            >
                              <FiTrash2 size={16} />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip476609793"
                            >
                              Deletar
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center text-danger h4">
                          <strong>Sem registros cadastrados</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <ModalUser
                  id={id}
                  modalOpen={modalOpen}
                  users={users}
                  name={name}
                  email={email}
                  password={password}
                  document={document}
                  phone={phone}
                  setId={setId}
                  setName={setName}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setDocument={setDocument}
                  setPhone={setPhone}
                  setModalOpen={setModalOpen}
                  setUsers={setUsers}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Users
