import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
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
  UncontrolledTooltip
} from 'reactstrap'

interface ProductsProps {
  id: number
  name: string
  price: number
  amount: number
  min_amount: number

}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductsProps[]>([])

  useEffect(() => {
    const token = localStorage.getItem('@SonhosDeNinar:token')
    const loadProducts = async (): Promise<ProductsProps[] | void> => {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadProducts()
  }, [])

  const handleRemoveProduct = async (id: number) => {
    console.log(`remove ${id}`)
  }

  const handleUpdateProduct = (id: number) => {
    console.log(`update ${id}`)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Fraldas</CardTitle>
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
                    {products.map(product => (
                      <tr key={product.id}>
                        <td className="text-center">{product.id}</td>
                        <td>{product.name}</td>
                        <td className="text-center">{product.amount}</td>
                        <td className="text-center">R$ {money_br(product.price.toString())}</td>
                        <td className="text-center">{product.min_amount}</td>
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
                            onClick={() => handleUpdateProduct(product.id)}
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
                            onClick={() => handleRemoveProduct(product.id)}
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
                    )
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Products
