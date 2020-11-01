import React, { FormEvent, useState } from 'react'
import api from '../../services/api'
import Select from '../../components/Select'
import { sweetAlert } from '../../utils/sweetAlert'
import { moneyMask } from '../../utils/masks'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap'

interface DiapersProps {
  id: number
  name: string
  price: number
  amount: number
  min_amount: number
}

interface ModalProps {
  modalOpen: boolean
  setModalOpen(param: boolean): void
  diapers: DiapersProps[]
  setDiapers(param: DiapersProps[]): void
  options: Array<{
    id: number
    name: string
  }>
}
const ModalDiaper: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  diapers,
  setDiapers,
  options,
}) => {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [minAmount, setMinAmount] = useState('')

  const token = localStorage.getItem('@SonhosDeNinar:token')
  const user = localStorage.getItem('@SonhosDeNinar:user')

  const handleCreateDiaper = async (e: FormEvent) => {
    e.preventDefault()

    if (token && user) {
      const userData = { user: JSON.parse(user) }
      const data = {
        company_id: userData.user.company_id,
        category_id: category,
        name,
        price,
        amount: 0,
        min_amount: minAmount,
      }

      try {
        const response = await api.post('/products', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDiapers([...diapers, response.data])
        setModalOpen(!modalOpen)
        sweetAlert('Cadastrado com sucesso')
      } catch (err) {
        setModalOpen(!modalOpen)
        sweetAlert('Erro ao cadastrar', 'error')
      }
    }
  }
  return (
    <Container>
      <Row>
        <Col>
          <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
            <div className=" modal-header">
              <h5 className=" modal-title" id="exampleModalLabel">
                Formulário de cadastro
              </h5>
            </div>
            <Form onSubmit={handleCreateDiaper}>
              <ModalBody>
                <FormGroup>
                  <Select
                    label="Categoria"
                    name="category_id"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                    options={options}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Produto</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Produto"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Preço</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="R$ 0,00"
                    name="price"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => {
                      setPrice(moneyMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Quantidade minima</Label>
                  <Input
                    type="number"
                    id="name"
                    placeholder="Quantidade minima"
                    name="min-amount"
                    value={minAmount}
                    onChange={(e) => {
                      setMinAmount(e.target.value)
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
                  onClick={() => setModalOpen(!modalOpen)}
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

export default ModalDiaper