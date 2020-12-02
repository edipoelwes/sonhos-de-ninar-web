import React, { useEffect, useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FiEdit, FiUserPlus, FiTrash2 } from 'react-icons/fi'
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
import Swal from 'sweetalert2'
import Paginate from '../../components/Paginate'
import api from '../../../services/api'
import { sweetAlert } from '../../../utils/sweetAlert'
import { companyStorage, cpf, cellphone } from '../../../utils/utils'
import ModalClient from '../../modals/ModalClient'

export interface ClientProps {
  id: number
  name: string
  phone: string
  document: string
}

const Customers = () => {
  const [clients, setClients] = useState<ClientProps[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [id, setId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneSecondary, setPhoneSecondary] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    loadClients()
    //eslint-disable-next-line
  }, [currentPage, limit])

  const loadClients = async (): Promise<ClientProps[] | void> => {
    setLoading(true)
    const company = companyStorage()
    const response = await api.get(
      `/clients/${company}?page=${currentPage}&limit=${limit}`,
    )
    setCurrentPage(response.data.current_page)
    setTotalPages(response.data.last_page)
    setClients(response.data.data)
    setLoading(false)
  }

  const handleUpdateForm = async (id: number) => {
    const response = await api.get(`/client/${id}`)

    console.log(response.data.zipcode)

    setId(id)
    setName(response.data.name)
    setDocument(response.data.document)
    setPhone(response.data.phone)
    setPhoneSecondary(response.data.phone_secondary)
    setZipcode(response.data.zipcode)
    setStreet(response.data.street)
    setNumber(response.data.number)
    setComplement(response.data.complement)
    setNeighborhood(response.data.neighborhood)
    setState(response.data.state)
    setCity(response.data.city)

    setModalOpen(!modalOpen)
  }

  const handleRemoveClient = (id: number) => {
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
          await api.delete(`/clients/${id}`)

          loadClients()
          sweetAlert('Cliente removido com sucesso.')
        }
      })
    } catch {
      sweetAlert('Não foi possivel remover.', 'warning')
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
                  <CardTitle tag="h4">Clientes</CardTitle>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <FiUserPlus size={18} className="mr-2" />
                    Cliente
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <label className="font-weight-bold mr-2">Total por Página</label>
                  <select
                    className="btn btn-primary font-weight-bold mb-2"
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                  >
                    <option className="font-weight-bold" value="5">5</option>
                    <option className="font-weight-bold" value="10">10</option>
                    <option className="font-weight-bold" value="15">15</option>
                    <option className="font-weight-bold" value="20">20</option>
                    <option className="font-weight-bold" value="30">30</option>
                    <option className="font-weight-bold" value="40">40</option>
                    <option className="font-weight-bold" value="50">50</option>
                  </select>
                </div>
                <Table responsive striped>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-left">Nome</th>
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
                    ) : clients.length > 0 ? (
                      clients.map((client) => (
                        <tr key={client.id}>
                          <td className="text-center">{client.id}</td>
                          <td className="">{client.name}</td>
                          <td className="text-center">
                            {cpf(client.document)}
                          </td>
                          <td className="text-center">
                            {cellphone(client.phone)}
                          </td>
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
                              onClick={() => handleUpdateForm(client.id)}
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
                              onClick={() => handleRemoveClient(client.id)}
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
                <Paginate
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <ModalClient
                  id={id}
                  modalOpen={modalOpen}
                  clients={clients}
                  name={name}
                  document={document}
                  phone={phone}
                  phoneSecondary={phoneSecondary}
                  zipcode={zipcode}
                  street={street}
                  number={number}
                  complement={complement}
                  neighborhood={neighborhood}
                  state={state}
                  city={city}
                  setId={setId}
                  setName={setName}
                  setDocument={setDocument}
                  setPhone={setPhone}
                  setModalOpen={setModalOpen}
                  setClients={setClients}
                  setPhoneSecondary={setPhoneSecondary}
                  setZipcode={setZipcode}
                  setStreet={setStreet}
                  setNumber={setNumber}
                  setComplement={setComplement}
                  setNeighborhood={setNeighborhood}
                  setState={setState}
                  setCity={setCity}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Customers
