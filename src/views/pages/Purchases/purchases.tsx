import React, { FormEvent, useMemo, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Input as Input2
} from 'reactstrap'
import api from '../../../services/api'
import { moneyMask } from '../../../utils/masks'
import { sweetAlert } from '../../../utils/sweetAlert'
import {
  stringForNumber,
  numberForString,
  companyStorage,
  userIdStorage
} from '../../../utils/utils'

import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'

const Purchases = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [status, setStatus] = useState('')
  const [provider, setProvider] = useState('')
  const [obs, setObs] = useState('')
  const [total, setTotal] = useState('0,00')
  const [date, setDate] = useState('')

  const history = useHistory()

  const [purchases, setPurchases] = useState<Array<{
    id: number
    category: string
    name: string
    price: number}>>()

  const [items, setItems] = useState([
    {id: 0, product_id: '', sub_total: '', amount: 1},
  ])

  useMemo(async () => {
    const company = companyStorage()
    const response = await api.get(
      `/products/purchases/${company}`,
    )

    setPurchases(response.data)

  }, [])

  const addNewItem = () => {
    setItems([
      ...items,
      {id: items.length, product_id: '', sub_total: '', amount: 1},
    ])
  }

  const setItemValue = (position: Number, field: string, value: string) => {
    const updateItems = items.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value}
      }

      return item
    })

    setItems(updateItems)
  }

  const handleCreateBuy = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      company_id: companyStorage(),
      user_id: userIdStorage(),
      payment_method: paymentMethod,
      provider,
      status,
      due_date: date,
      total,
      obs,
      items
    }

    try {
      const response = await api.post('/purchases', data)

      console.log(response.data)

      setPurchases([response.data])
      history.push('/admin/purchases')
      sweetAlert('Cadastrado com sucesso')
    } catch (err) {
      sweetAlert('Errar ao cadastrar', 'error')
    }
  }

  const handleRemove = (index: number) => {
    items.map(item => {
      if(item.id === index) {
        let value = parseFloat(stringForNumber(total)) - parseFloat(stringForNumber(item.sub_total))
        setTotal(value.toFixed(2))
      }

      return null
    })
    setItems(items.filter(item => item.id !== index))
  }

  const handleUpdateTotal = () => {
    let values = items.map(item => item.sub_total)
    let prices = values.map(value => parseFloat(stringForNumber(value)))

    setTotal(numberForString(prices.reduce((a, b) => a = a + b, 0).toFixed(2).toString()))


  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Form onSubmit={handleCreateBuy}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-center">Entrada de Produtos</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="5">
                    <FormGroup>
                      <Label>Forma de pagamento</Label>
                      <select
                        className="custom-select"
                        value={paymentMethod}
                          onChange={e => setPaymentMethod(e.target.value)}
                      >
                        <option value="">Escolha um item</option>
                        <option value="boleto">Boleto</option>
                        <option value="cartao-de-credito">Cartão de credito</option>
                        <option value="transferencia">Transferência</option>
                        <option value="dinheiro">Dinheiro</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Status</Label>
                      <select
                        className="custom-select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <option value="">Escolha um item</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="pendente">Pendente</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Input
                        type="text"
                        id="total"
                        label="Total"
                        name="Total"
                        placeholder="R$ 0,00"
                        disabled
                        value={`R$ ${total}`}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="5">
                    <FormGroup>
                      <Input
                        type="text"
                        id="provider"
                        label="Fornecedor"
                        name="provider"
                        value={provider}
                        onChange={e => setProvider(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="date"
                        id="date"
                        label="Data"
                        name="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value)
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="7">
                    <FormGroup>
                      <Label>Observações</Label>
                      <Input2
                        type="textarea"
                        name="obs"
                        value={obs}
                        onChange={e => setObs(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col md="12">
                    <Button
                      type="button"
                      className="btn btn-primary btn-md pull-right"
                      onClick={addNewItem}
                    >
                    <i className="nc-icon nc-simple-add"></i> Adicionar
                    </Button>
                  </Col>
                </Row>
                {items.map((item, index) => {
                  return (
                    <div key={index} className="mb-3">
                      <Row>
                        <Col md="6">
                          <Label>produto</Label>
                          <select
                            className="custom-select"
                            value={item.product_id}
                            onChange={e => {
                              setItemValue(index, 'product_id', e.target.value)
                            }}
                          >
                            <option value="">Selecione um item</option>
                            {
                              purchases?.map((purchase) => (
                                <option
                                  value={purchase.id}
                                  key={purchase.id}
                                >
                                  {purchase.id} - {purchase.category} {purchase.name}
                                </option>
                              ))
                            }
                          </select>
                        </Col>
                        <Col md="2">
                          <Input
                            type="number"
                            id="amount"
                            label="Quantidade"
                            name="amount"
                            min="1"
                            value={item.amount}
                            onChange={e => {
                              setItemValue(index, "amount", e.target.value)
                            }}
                          />
                        </Col>
                        <Col md="3">
                          <Input
                            type="text"
                            id="sub_total"
                            label="Total"
                            name="Total"
                            placeholder="R$ ..."
                            value={item.sub_total}
                            onChange={e => {
                              setItemValue(index, "sub_total", moneyMask(e.target.value))
                            }}
                            onKeyUp={handleUpdateTotal}
                          />
                        </Col>
                        <Col md="1">
                          <Button type="button" className="btn btn-danger btn-sm mt-4" onClick={() => handleRemove(index)}>
                            <span className="nc-icon nc-simple-remove"/>
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
                <hr/>
                <Button type="submit" className="btn btn-success">Salvar</Button>
              </CardBody>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Purchases
