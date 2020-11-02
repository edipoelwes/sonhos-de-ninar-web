import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { sweetAlert } from '../../../utils/sweetAlert'
import { money_br } from '../../../utils/utils'

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
import ModalDiaper from '../../modals/ModalDiaper'
import './styles.css'

interface DiapersProps {
  id: number
  name: string
  price: number
  amount: number
  min_amount: number
}

interface OptionsProps {
  id: number
  name: string
}

const Diapers = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [diapers, setDiapers] = useState<DiapersProps[]>([])
  const [options, setOptions] = useState<OptionsProps[]>([])

  const token = localStorage.getItem('@SonhosDeNinar:token')

  useEffect(() => {
    loadDiapers()
    dataOptions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataOptions = async (): Promise<OptionsProps[] | void> => {
    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setOptions(response.data)
  }

  const loadDiapers = async (): Promise<DiapersProps[] | void> => {
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setDiapers(response.data)
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
          await api.delete(`/products/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          loadDiapers()
          sweetAlert('Removido com sucesso.')
        }
      })
    } catch {
      sweetAlert('Não foi possivel remover.', 'warning')
    }
  }

  const handleUpdateDiapers = (id: number) => {
    console.log(`update ${id}`)
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
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <i className="nc-icon nc-simple-add" />
                    <span className="ml-2">Nova Fralda</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
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
                    {diapers.map((diaper) => (
                      <tr key={diaper.id}>
                        <td className="text-center text-danger">
                          <strong>{diaper.id}</strong>
                        </td>
                        <td className="text-primary">
                          <strong>{diaper.name}</strong>
                        </td>
                        <td className="text-center">
                          <Badge
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
                          R$ {money_br(diaper.price.toString())}
                        </td>
                        <td className="text-center">
                          <Badge color="primary">{diaper.min_amount}</Badge>
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
                            onClick={() => handleUpdateDiapers(diaper.id)}
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
                    ))}
                  </tbody>
                </Table>
                <ModalDiaper
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  diapers={diapers}
                  setDiapers={setDiapers}
                  options={options}
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
