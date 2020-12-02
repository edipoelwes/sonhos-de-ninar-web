import React, { FormEvent } from 'react'
import api from '../../services/api'
import Input from '../components/Input'
import { sweetAlert } from '../../utils/sweetAlert'
import { cpfMask, phoneMask, cepMask } from '../../utils/masks'
import { companyStorage } from '../../utils/utils'
import { ClientProps } from '../pages/Customers'
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

interface ModalProps {
  id: number | null
  modalOpen: boolean
  clients: ClientProps[]
  name: string
  document: string
  phone: string
  phoneSecondary: string
  zipcode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  state: string
  city: string
  setId(param: number | null): void
  setModalOpen(param: boolean): void
  setClients(param: ClientProps[]): void
  setName(param: string): void
  setDocument(param: string): void
  setPhone(param: string): void
  setPhoneSecondary(param: string): void
  setZipcode(param: string): void
  setStreet(param: string): void
  setNumber(param: string): void
  setComplement(param: string): void
  setNeighborhood(param: string): void
  setState(param: string): void
  setCity(param: string): void
}

const ModalClient: React.FC<ModalProps> = ({
  id,
  modalOpen,
  clients,
  name,
  document,
  phone,
  phoneSecondary,
  zipcode,
  street,
  number,
  complement,
  neighborhood,
  state,
  city,
  setId,
  setClients,
  setModalOpen,
  setName,
  setDocument,
  setPhone,
  setPhoneSecondary,
  setZipcode,
  setStreet,
  setNumber,
  setComplement,
  setNeighborhood,
  setState,
  setCity,
}) => {
  const handleCreateClient = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      company_id: companyStorage(),
      name,
      document,
      phone,
      phone_secondary: phoneSecondary,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
    }

    try {
      const response = await api.post('/clients', data)
      setClients([response.data, ...clients])
      setModalOpen(!modalOpen)
      sweetAlert('Cadastrado com sucesso')
    } catch (err) {
      setModalOpen(!modalOpen)
      sweetAlert('Erro ao cadastrar', 'error')
    }
  }

  const handleUpdateClient = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      name,
      document,
      phone,
      phone_secondary: phoneSecondary,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
    }

    try {
      const response = await api.put(`/clients/${id}`, data)

      setClients(
        clients.map((client) => (client.id === id ? response.data : client)),
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
    setName('')
    setDocument('')
    setPhone('')
    setPhoneSecondary('')
    setZipcode('')
    setStreet('')
    setNumber('')
    setComplement('')
    setNeighborhood('')
    setState('')
    setCity('')
    setModalOpen(!modalOpen)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Modal toggle={handleClose} isOpen={modalOpen}>
            <div className=" modal-header">
              <h5 className=" modal-title" id="exampleModalLabel">
                {id === null ? 'Formulário de cadastro' : 'Formulário de atualização'}
              </h5>
            </div>
            <Form
              onSubmit={id === null ? handleCreateClient : handleUpdateClient}
            >
              <ModalBody>
                <FormGroup>
                  <Input
                    type="text"
                    id="name"
                    label="Nome *"
                    name="name"
                    placeholder="Maria da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="document"
                    label="CPF *"
                    name="document"
                    placeholder="999.999.999.99"
                    value={document}
                    onChange={(e) => {
                      setDocument(cpfMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="phone"
                    label="Telefone *"
                    name="phone"
                    placeholder="(86) 99999-9999"
                    value={phone}
                    onChange={(e) => {
                      setPhone(phoneMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="phone_secondary"
                    label="Telefone secundário"
                    name="phone"
                    placeholder="(86) 99999-9999"
                    value={phoneSecondary}
                    onChange={(e) => {
                      setPhoneSecondary(phoneMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="zipcode"
                    label="CEP"
                    name="cep"
                    placeholder="00.000-000"
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(cepMask(e.target.value))
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="street"
                    label="Rua"
                    name="street"
                    placeholder="Rua dos Alfineiros"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="number"
                    label="N°"
                    name="number"
                    placeholder="3"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="complement"
                    label="Complemento"
                    name="complement"
                    placeholder="Proximo ao mercadinho popular"
                    value={complement}
                    onChange={(e) => {
                      setComplement(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="neighborhood"
                    label="Bairro"
                    name="neighborhood"
                    placeholder="Dirceu Arcoverde"
                    value={neighborhood}
                    onChange={(e) => {
                      setNeighborhood(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="city"
                    label="Cidade"
                    name="city"
                    placeholder="Barras"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    id="state"
                    label="Estado"
                    name="state"
                    placeholder="Piaui"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value)
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

export default ModalClient
