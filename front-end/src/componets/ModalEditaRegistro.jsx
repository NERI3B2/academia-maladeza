import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { useEffect, useRef, useState } from 'react';

import backend from '../services/backend';

import conversorMembro from '../funcoes/conversorMembro';




const ModalEdita = (props) => {
    const { numero } = props

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [serie, setSerie] = useState('')
    const [descanso, setDescanso] = useState('')
    const [valor, setValor] = useState('')

    const [listaExercicio, setListaExercicios] = useState([])


    const idTre = useRef()
    const nomeTre = useRef()
    const serieTre = useRef()
    const descansoTre = useRef()


    useEffect(() => {
        backend.get('exercicio').then(res => {
            setListaExercicios(res.data)
        })
        return
    }, [numero])

    useEffect(() => {
        backend.get('exercicio').then(res => {
            setListaExercicios(res.data)
        })
        return
    }, [valor])


    return (
        <div className="modal fade " id="modalEdita" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-xl ">
                <div className="modal-content bg-preto-fundo">
                    <div className="modal-header text-amarelo-flore">
                        <h1 className="modal-title fs-5" >Editar Exercício:</h1>
                    </div>
                    <span className='text-amarelo-flore ms-3 mt-1'>Selecione o exercício que você quer Editar:</span>
                    <div className="modal-body">
                        <div style={{ 'height': '450px' }} className="w-100 overflow-auto">
                            <table className="table text-amarelo-flore h-100">
                                <thead>
                                    <tr>
                                        <th>Exercício</th>
                                        <th className='d-none d-md-table-cell'>Séries/Repetições</th>
                                        <th className='d-none d-md-table-cell'>Descanso</th>
                                        <th>Parte do corpo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        listaExercicio.map(
                                            e =>
                                                <tr key={e.id}>
                                                    <td>{e.nome_exercicio}</td>
                                                    <td className='d-none d-md-table-cell'>{e.serie}</td>
                                                    <td className='d-none d-md-table-cell'>{e.descanso}</td>
                                                    <td>{conversorMembro(e.parte_corpo)}</td>
                                                    <td>
                                                        <div className="d-flex flex-row-reverse">



                                                            <div className="btn-group">
                                                                <button type="button" className="btn  dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className=" text-amarelo-flore bi bi-trash3-fill" />
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <span className='text-nowrap px-3'>Deseja excluir o registro:</span>
                                                                    {/* <p className=' text-center m-1 text-danger text-truncate'>{e.nome_exercicio}</p> */}
                                                                    <li><a className="dropdown-item" onClick={evento => {
                                                                        backend.delete(`exercicio/${e.id}/`).then(res => {
                                                                            setValor(Math.random())
                                                                        })
                                                                    }}>Excluir</a></li>
                                                                    <li><a className="dropdown-item" href="#">Voltar</a></li>
                                                                </ul>
                                                            </div>

                                                            <button className='col-3 btn me-2' onClick={evento => {
                                                                setId(e.id)
                                                                setNome(e.nome_exercicio)
                                                                setSerie(e.serie)
                                                                setDescanso(e.descanso)
                                                            }}>
                                                                <i className=" text-amarelo-flore bi bi-pencil-square" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='row'>
                            <div className='col-3 col-sm-1 mb-2 mb-md-0'>
                                <label htmlFor="nome" className="text-amarelo-flore">Código:</label>
                                <input ref={idTre} type="text" disabled className="col-lg-3 form-control" value={id} onChange={evento =>
                                    setId(evento.target.value)
                                } />
                            </div>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="nome" className="text-amarelo-flore">Nome:</label>
                                <input ref={nomeTre} type="text" className="col-lg-3 form-control" value={nome} onChange={evento =>
                                    setNome(evento.target.value)
                                } />

                            </div>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="nome" className="text-amarelo-flore">Seríe/Repetições:</label>
                                <input ref={serieTre} type="text" className="col-lg-3 form-control" value={serie} onChange={evento =>
                                    setSerie(evento.target.value)
                                } />

                            </div>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="serieRep" className="text-amarelo-flore">Descanso:</label>
                                <input ref={descansoTre} type="text" className="col-lg-3 form-control" value={descanso} onChange={evento =>
                                    setDescanso(evento.target.value)
                                } />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-amarelo-flore" data-bs-dismiss="modal"
                            onClick={evento => {
                                setId('')
                                setNome('')
                                setSerie('')
                                setDescanso('')
                            }}>Sair</button>
                        <button type="button" className="btn bg-amarelo-flore" 
                            onClick={evento => {
                                backend.patch(`exercicio/${id}/`, {
                                    nome_exercicio: nome,
                                    serie: serie,
                                    descanso: descanso,
                                }).then(res => {
                                    setId('')
                                    setNome('')
                                    setSerie('')
                                    setDescanso('')
                                    setValor(Math.random())
                                }).catch(err => {
                                    alert('algo de errado nao esta certo')
                                })
                            }}>Salvar exercício editado</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalEdita