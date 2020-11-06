import React, { FormEvent } from 'react'
import api from '../../services/api'
import Select from '../components/Select'
import Input from '../components/Input'
import { sweetAlert } from '../../utils/sweetAlert'
import { moneyMask } from '../../utils/masks'
import {companyStorage} from '../../utils/utils'
import categories from '../../variables/categories'
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
import { DiapersProps } from '../pages/Diapers'


interface ModalProps {
  id: number | null
  modalOpen: boolean
  diapers: DiapersProps[]
  category: string
  name: string
  price: string
  minAmount: string
  setId(param: number | null): void
  setModalOpen(param: boolean): void
  setDiapers(param: DiapersProps[]): void
  setCategory(param: string): void
  setName(param: string): void
  setPrice(param: string): void
  setMinAmount(param: string): void
}

const ModalDiaper: React.FC<ModalProps> = ({
  id,
  modalOpen,
  diapers,
  category,
  name,
  price,
  minAmount,
  setId,
  setDiapers,
  setModalOpen,
  setCategory,
  setName,
  setPrice,
  setMinAmount,
}) => {

  const handleCreateDiaper = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      company_id: companyStorage(),
      category,
      name,
      price,
      amount: 0,
      min_amount: minAmount,
    }

    try {
      const response = await api.post('/products', data)
      setDiapers([...diapers, response.data])
      setModalOpen(!modalOpen)
      sweetAlert('Cadastrado com sucesso')
    } catch (err) {
      setModalOpen(!modalOpen)
      sweetAlert('Erro ao cadastrar', 'error')
    }
  }

  const handleUpdateDiaper = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      company_id:  companyStorage(),
      category,
      name,
      price,
      min_amount: minAmount,
    }

    try {
      const response = await api.put(`/products/${id}`, data)
      setDiapers(
        diapers.map((diaper) => (diaper.id === id ? response.data : diaper)),
      )
      handleClose()
      sweetAlert('Atualizado com sucesso')
    } catch (err) {
      handleClose()
      sweetAlert('Erro ao atualizar', 'error')
    }
  }

  const handleClose = () => {
    setId(null)
    setCategory('')
    setName('')
    setPrice('')
    setMinAmount('')
    setModalOpen(!modalOpen)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Modal toggle={handleClose} isOpen={modalOpen}>
            <div className=" modal-header">
              <h5 className=" modal-title" id="exampleModalLabel">
                {id ? 'Formulário de atualização' : 'Formulário de cadastro'}
              </h5>
            </div>
            <Form onSubmit={id === null ? handleCreateDiaper : handleUpdateDiaper}>
              <ModalBody>
                <FormGroup>
                  <Select
                    label="Categoria"
                    name="category_id"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                    categories={categories}
                  />
                </FormGroup>
                <FormGroup>
                <Input
                    type="text"
                    id="name"
                    label="Produto"
                    name="name"
                    placeholder="Produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                <Input
                    type="text"
                    id="price"
                    label="Preço"
                    name="price"
                    placeholder="R$ 0,00"
                    value={price}
                    onChange={(e) => {
                      setPrice(moneyMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                <Input
                    type="number"
                    id="min_amount"
                    label="Qtd. minima"
                    name="min_amount"
                    placeholder="Quantidade minima"
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

export default ModalDiaper
