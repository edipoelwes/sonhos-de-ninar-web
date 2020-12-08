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
  Row
} from 'reactstrap'
import api from '../../../services/api';
import { moneyMask } from '../../../utils/masks';
import { stringForNumber, numberForString, companyStorage } from '../../../utils/utils';

import Input from '../../components/Input';
const Shopping = () => {
  const [total, setTotal] = useState('0,00')
  const [date, setDate] = useState('')
  const [purchases, setPurchases] = useState<Array<{
    id: number
    category: string
    name: string
    price: number}>>()
  const [items, setItems] = useState([
    {id: 0, product: '', total: '', amount: 1},
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
      {id: items.length, product: '', total: '', amount: 1},
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

  const handleCreateBuy = (e: FormEvent) => {
    e.preventDefault()

    console.log(date, items)

  }

  const handleRemove = (index: number) => {
    items.map(item => {
      if(item.id === index) {
        let value = parseFloat(stringForNumber(total)) - parseFloat(stringForNumber(item.total))
        setTotal(value.toFixed(2))
      }

      return null
    })
    setItems(items.filter(item => item.id !== index))
  }

  const handleUpdateTotal = () => {
    let values = items.map(item => item.total)
    let prices = values.map(value => parseFloat(stringForNumber(value)))

    setTotal(numberForString(prices.reduce((a, b) => a = a + b, 0).toFixed(2).toString()))


  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4" className="text-center">Entrada de Produtos</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleCreateBuy}>
                <fieldset>
                  <legend>
                    <Row>
                      <Col md="10">
                        <b>PRODUTOS</b>
                      </Col>
                      <Col md="2">
                        <Button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={addNewItem}
                        >
                         <span className="nc-icon nc-simple-add"></span> item
                        </Button>
                      </Col>
                    </Row>
                  </legend>
                  {items.map((item, index) => {
                    return (
                      <div key={index} className="mb-3">
                        <Row>
                          <Col md="6">
                            <Label>produto</Label>
                            <select className="custom-select" value={item.product} onChange={e => {
                              setItemValue(index, 'product', e.target.value)
                            }}>
                            <option value="">Selecione um item</option>
                            {
                              purchases?.map((purchase, index) => (
                              <option
                                value={purchase.id}
                                key={purchase.id}
                              >
                                {purchase.id} - {purchase.category.toUpperCase()} {purchase.name}
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
                              id="total"
                              label="Total"
                              name="Total"
                              placeholder="R$ ..."
                              value={item.total}
                              onChange={e => {
                                setItemValue(index, "total", moneyMask(e.target.value))
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
                </fieldset>
                <hr/>

                <Row form>
                  <Col md="6">
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
                  <Col md="6">
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
                <Button type="submit" className="btn btn-success">Salvar</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Shopping
