import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { sweetAlert } from '../../../utils/sweetAlert'
import { money_br, numberForString, companyStorage } from '../../../utils/utils'
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Table,
  Button,
  UncontrolledTooltip,
  Badge,
} from 'reactstrap'
import Paginate from '../../components/Paginate'
import ModalDiaper from '../../modals/ModalDiaper'
import './styles.css'

export interface ItensProps {
  id: string
  category: string
  name: string
  price: string
  amount: string
  min_amount: string
}
export interface DiapersProps {
  id: number
  category: string
  name: string
  price: number
  amount: number
  min_amount: number
}

const Diapers = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [diapers, setDiapers] = useState<DiapersProps[]>([])

  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [id, setId] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [minAmount, setMinAmount] = useState('')

  useEffect(() => {
    loadDiapers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit])


  const loadDiapers = async (): Promise<DiapersProps[] | void> => {
    setLoading(true)
    const company = companyStorage()
    const response = await api.get(
      `/products/${company}/fraldas?page=${currentPage}&limit=${limit}`,
    )
    setCurrentPage(response.data.current_page)
    setTotalPages(response.data.last_page)
    setDiapers(response.data.data)
    setLoading(false)
  }

  const handleRemoveDiapers = (id: number) => {
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
          await api.delete(`/products/${id}`)

          loadDiapers()
          sweetAlert('Removido com sucesso.')
        }
      })
    } catch {
      sweetAlert('Não foi possivel remover.', 'warning')
    }
  }

  const handleUpdateForm = async (id: number) => {
    const response = await api.get(`/products/${id}`)

    setId(id)
    setCategory(response.data.category)
    setName(response.data.name)
    setPrice(numberForString(response.data.price))
    setMinAmount(response.data.min_amount)
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="diapers-header">
                  <CardTitle tag="h4">Fraldas</CardTitle>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="9">
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
                        <option className="font-weight-bold" value="25">25</option>
                        <option className="font-weight-bold" value="30">30</option>
                        <option className="font-weight-bold" value="40">40</option>
                        <option className="font-weight-bold" value="50">50</option>
                      </select>
                    </div>
                  </Col>
                  <Col md="3">
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <i className="nc-icon nc-simple-add" />
                      <span className="ml-2">Nova Fralda</span>
                    </Button>
                  </Col>
                </Row>
                <Table responsive striped>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-left">Produto</th>
                      <th className="text-center">Quant.</th>
                      <th className="text-center">Preço</th>
                      <th className="text-center">Quant. Min</th>
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
                    ) : diapers.length > 0 ? (
                      diapers.map((diaper) => (
                        <tr key={diaper.id}>
                          <td className="text-center">{diaper.id}</td>
                          <td className="">{diaper.name}</td>
                          <td className="text-center">
                            <Badge
                              pill
                              color={
                                diaper.amount > diaper.min_amount + 2
                                  ? 'success'
                                  : diaper.amount < diaper.min_amount
                                  ? 'danger'
                                  : 'warning'
                              }
                            >
                              {diaper.amount}
                            </Badge>
                          </td>
                          <td className="text-center">
                              R${' '}
                              {money_br(diaper.price.toString()).indexOf(',') !==
                              -1
                                ? money_br(diaper.price.toString())
                                : `${money_br(diaper.price.toString())},00`}
                            </td>
                          <td className="text-center">
                            <Badge pill color="primary">{diaper.min_amount}</Badge>
                          </td>
                          <td className="text-center">
                            <Button
                              className="btn-icon"
                              color="info"
                              id="tooltip264453216"
                              size="sm"
                              type="button"
                            >
                              <i className="fa fa-user" />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip264453216"
                            >
                              Like
                            </UncontrolledTooltip>
                            <Button
                              className="btn-icon"
                              color="success"
                              id="tooltip366246651"
                              size="sm"
                              type="button"
                              onClick={() => handleUpdateForm(diaper.id)}
                            >
                              <i className="fa fa-edit" />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip366246651"
                            >
                              Edit
                            </UncontrolledTooltip>
                            <Button
                              className="btn-icon"
                              color="danger"
                              id="tooltip476609793"
                              size="sm"
                              type="button"
                              onClick={() => handleRemoveDiapers(diaper.id)}
                            >
                              <i className="fa fa-times" />
                            </Button>{' '}
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip476609793"
                            >
                              Delete
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

                <ModalDiaper
                  id={id}
                  modalOpen={modalOpen}
                  diapers={diapers}
                  category={category}
                  name={name}
                  price={price}
                  minAmount={minAmount}
                  setId={setId}
                  setCategory={setCategory}
                  setName={setName}
                  setPrice={setPrice}
                  setMinAmount={setMinAmount}
                  setModalOpen={setModalOpen}
                  setDiapers={setDiapers}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Diapers
