
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import ModalCria from './componets/ModalCriaFixa'
import ModalCadastro from './componets/ModalCadastro'
import ModalExcloi from './componets/ModalExcloi'

import backend from './services/backend'
import ModalVisualiza from './componets/ModalVisua'
import ModalEdita from './componets/ModalEditaRegistro'


const App = (props) => {
  const [objetoEX, setObjetoEX] = useState('')
  const [objetoVI, setObjetoVI] = useState('')

  const [numero, setNumero] = useState('')

  const [atualizaFixas, setAtualizaFixas] = useState(false)

  const [fixa, setFixa] = useState([])
  const navigate = useNavigate()

  const select = useRef()


  useEffect(() => {
    backend.get('fixa').then(res => {
      setFixa(res.data)
    })
    return // quando for destruído
  }, [atualizaFixas])
  //document.title = 'Teste'
  return (
    <div className="container bg-preto-fundo ">
      <div className='vh-100'>
        <div className=" d-flex justify-content-between mb-3 pt-3">
          <h3 className="title-decoration">Cadastre suas Fichas e seus Exercícios</h3>
          <div className='col-lg-1'>
            <button type="button" className="text-white w-100 btn bg-danger" onClick={evento => {
              sessionStorage.clear()
              navigate('/')
            }} >
              Sair
            </button>
          </div>
        </div>
        <div className='row mt-lg-5 mb-5'>
          <div className='col-lg-2 mt-4 '>
            <button type="button" className="w-100 btn bg-amarelo-flore" data-bs-toggle="modal" /*data-bs-target="#modalPrincipal" */
              onClick={evento => {
                setNumero(Math.random())
                const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalCriaFixa'))
                modal.show()
              }}>
              Crie sua Ficha
            </button>
          </div>
          <div className='col-lg-2 mt-4 '>
            <button type="button" className="w-100 btn bg-amarelo-flore" data-bs-toggle="modal" data-bs-target="#modalCadastro" >
              Cadastro de Exercício
            </button>
          </div>
          <div className='col-lg-2 mt-4 '>
            <button type="button" className="w-100 btn bg-amarelo-flore" data-bs-toggle="modal" data-bs-target="#modalEdita"
              onClick={evento => {
                setNumero(Math.random())
              }} >
              Editar Exercício
            </button>
          </div>
          <div className="col-lg-2 mt-4">
            <button type="button" className="btn"
              title='Caso não saiba realizar o exercício corretamente, busque ajuda de um profissional!'>
             <i className="bi bi-info-circle-fill text-amarelo-flore"></i>
            </button>
          </div>
        </div>
        <div className="row"><h1 className='text-center text-amarelo-flore'>FICHAS</h1></div>
        <div className="row mt-2 text-amarelo-flore">
          <table className=" table text-amarelo-flore">
            <thead>
              <tr>
                <th >Dia da semana</th>
                <th >Nome</th>
                <th className='d-none d-md-table-cell' >Observação</th>
                <th ></th>
              </tr>
            </thead>
            <tbody>

              {
                fixa.map(
                  e =>
                    <tr key={e.id}>
                      <th style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate '>{e.dia}</th>
                      <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate '>{e.nome}</td>
                      <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate d-none d-md-table-cell me-2'>{e.obs}</td>
                      <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-nowrap me-2'>
                        <div className="row d-flex flex-row-reverse">
                          <button className='col-3 btn me-2' data-bs-toggle="modal" onClick={evento => {

                            setObjetoEX(e)
                            const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalExcloi'))
                            modal.show()
                          }}>
                            <i className="text-amarelo-flore bi bi-x-lg" ></i>
                          </button>
                          <button className='col-3 btn  me-1' data-bs-toggle="modal" onClick={evento => {

                            setObjetoVI(e)
                            const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalVisualiza'))
                            modal.show()
                          }}>
                            <i className="text-amarelo-flore bi bi-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                )
              }

            </tbody>
          </table>

        </div>
      </div>

      <ModalVisualiza obj={objetoVI} />
      <ModalExcloi atualizaFixas={setAtualizaFixas} obje={objetoEX} />
      <ModalCria atualizaFixas={setAtualizaFixas} numero={numero} />
      <ModalEdita numero={numero} />
      <ModalCadastro />
    </div>

  )
}

export default App
