import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import api from '../../../services/api';
import { companyStorage, money_br } from '../../../utils/utils';
import Paginate from '../../components/Paginate'

interface PurchasesProps {
  id: number
  status: string
  payment_method: string
  due_date: string
  total: number
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<PurchasesProps[]>([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    LoadPurchases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit])

  const LoadPurchases = async () => {
    setLoading(true)
    const company = companyStorage()
    const response = await api.get(
      `/purchases/${company}?page=${currentPage}&limit=${limit}`,
    )

    setCurrentPage(response.data.current_page)
    setTotalPages(response.data.last_page)
    setPurchases(response.data.data)
    setLoading(false)
  }

  const handleRemovePurchase = (id: number) => {
    console.log(id)
  }

  const handleUpdatePurchase = (id: number) => {
    console.log(id)
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="diapers-header">
                  <CardTitle tag="h4">Compras</CardTitle>
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
                    <option className="font-weight-bold" value="25">25</option>
                    <option className="font-weight-bold" value="30">30</option>
                    <option className="font-weight-bold" value="40">40</option>
                    <option className="font-weight-bold" value="50">50</option>
                  </select>
                </div>
                <Table responsive striped>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Data</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Metodo de pagamento</th>
                      <th className="text-center">Total</th>
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
                    ) : purchases.length > 0 ? (
                      purchases.map((purchase) => (
                        <tr key={purchase.id}>
                          <td className="text-center">{purchase.id}</td>
                          <td className="text-center">{purchase.due_date}</td>
                          <td className="text-center">
                            <Badge
                              pill
                              color={
                                purchase.status === 'confirmado'
                                  ? 'success'
                                  : purchase.status === 'cancelado'
                                    ? 'danger'
                                    : 'warning'
                              }
                            >
                              {purchase.status === 'confirmado'
                                ? <i className="nc-icon nc-check-2 lg" />
                                : purchase.status === 'cancelado'
                                  ? <i className="nc-icon nc-simple-remove lg" />
                                  : <i className="nc-icon nc-watch-time lg" />
                              }
                            </Badge>
                          </td>
                          <td className="text-center">{purchase.payment_method}</td>

                          <td className="text-center">
                            R${' '}
                            {money_br(purchase.total.toString()).indexOf(',') !==
                              -1
                              ? money_br(purchase.total.toString())
                              : `${money_br(purchase.total.toString())},00`}
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
                              onClick={() => handleUpdatePurchase(purchase.id)}
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
                              onClick={() => handleRemovePurchase(purchase.id)}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Purchases
