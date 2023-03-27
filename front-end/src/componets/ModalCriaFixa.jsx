import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { useEffect, useRef, useState } from 'react';

import backend from '../services/backend';

import conversorMembro from '../funcoes/conversorMembro';



const ModalCria = (props) => {
    const { atualizaFixas, numero } = props

    const [dia, setDia] = useState('')
    const [nome, setNome] = useState('')
    const [obs, setObs] = useState('')
    const [parteCorpo, setParteCorpo] = useState('')

    const [selecionados, setSelecionados] = useState([])

    const [listaExercicio, setListaExercicios] = useState([])


    const diaTre = useRef()
    const nomeTre = useRef()
    const obsTre = useRef()

    const selectParteCorpo = useRef()

    const validarCampos = input => {
        if (input.value === "") {
            alert("Certifique-se de que preencheu os campos: Dia e Nome");
            return false
        }
        return true
    }


    useEffect(() => {
        backend.get(`exercicio/`).then(res => {
            setListaExercicios(res.data)
        })
        return // quando for destruído
    }, [numero])

    useEffect(() => {
        backend.get(`exercicio/?parte_corpo=${parteCorpo}`).then(res => {
            setListaExercicios(res.data)
        })
        return // quando for destruído
    }, [parteCorpo])



    return (
        <div className="modal fade" id="modalCriaFixa" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-xl ">
                <div className="modal-content bg-preto-fundo">
                    <div className="modal-header text-amarelo-flore">
                        <h1 className="modal-title fs-5" >Criação de Ficha:</h1>
                        <div className="col-lg-3 mb-2 mb-md-0">
                            <span className='text-amarelo-flore'>Filtro:</span>
                            <select ref={selectParteCorpo} value={parteCorpo} className="bg-preto-fundo text-amarelo-flore form-select" aria-label="Default select example" onChange={evento =>
                                setParteCorpo(evento.target.value)
                            }>
                                <option className='text-amarelo-flore' value="" defaultValue>Selecione a parte do corpo</option>
                                <option className='text-amarelo-flore' value="BR">Braço</option>
                                <option className='text-amarelo-flore' value="CT">Costas</option>
                                <option className='text-amarelo-flore' value="PE">Perna</option>
                                <option className='text-amarelo-flore' value="PT">Peito</option>
                                <option className='text-amarelo-flore' value="AB">Abdomem</option>
                            </select>
                        </div>
                    </div>
                    <span className='text-amarelo-flore ms-3 mt-1'>Selecione os exercícios que você quer colocar na sua ficha:</span>
                    <div className="modal-body">
                        <div style={{ 'height': '400px' }} className="w-100 overflow-auto">
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
                                                        <div className="d-flex justify-content-center">
                                                            <div className="form-check">
                                                                <input className="form-check-input" onChange={evento => {

                                                                    if (evento.target.checked) {
                                                                        const novoArray = selecionados.filter(i => i)
                                                                        novoArray.push(e.id)
                                                                        setSelecionados(novoArray)
                                                                    } else {
                                                                        setSelecionados(selecionados.filter(i => i !== e.id))
                                                                    }
                                                                }} type="checkbox" id="flexCheckDefault" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <span className='row m-2 text-amarelo-flore'>Preencha as informações para criar sua ficha.</span>
                        <div className='row'>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="nome" className="text-amarelo-flore">Dia:</label>
                                <input ref={diaTre} type="text" className="col-lg-3 form-control" value={dia} onChange={evento =>
                                    setDia(evento.target.value)
                                } />

                            </div>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="serieRep" className="text-amarelo-flore">Nome:</label>
                                <input ref={nomeTre} type="text" className="col-lg-3 form-control" value={nome} onChange={evento =>
                                    setNome(evento.target.value)
                                } />
                            </div>
                            <div className='col-lg-3 mb-2 mb-md-0'>
                                <label htmlFor="descanso" className="text-amarelo-flore">Obs:</label>
                                <input ref={obsTre} type="text" className="col-lg-3 form-control" value={obs} onChange={evento =>
                                    setObs(evento.target.value)
                                } />
                            </div>
                        </div>
                    </div>
                    <div id='teste-rafachera' className="modal-footer">
                        <button className="btn bg-amarelo-flore" data-bs-target="#modalPrincipal" data-bs-toggle="modal"
                            onClick={evento => {
                                setParteCorpo('')
                                setDia('')
                                setNome('')
                                setObs('')
                                for (let index = 0; index < selecionados.length; index++) {
                                }

                            }
                            }
                        >Voltar</button>
                        <button type="button" className="btn bg-amarelo-flore" onClick={async evento => {
                            if (!validarCampos(diaTre.current) || !validarCampos(nomeTre.current)) {
                                return
                            }
                            await backend.post(`fixa/`, {
                                dia: dia,
                                nome: nome,
                                obs: obs,
                            }).then( res => {
                                for (let index = 0; index < selecionados.length; index++) {
                                    backend.patch(`exercicio/${selecionados[index]}/`, {
                                        fixa: res.data.id,
                                    })
                                }  
                            })
                            atualizaFixas(Math.random())
                            setParteCorpo('1')
                            setDia('')
                            setNome('')
                            setObs('')
                            const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalCriaFixa'))
                            modal.hide()
                        }}>Criar Ficha</button>
                    </div>
                </div>
            </div>


        </div >
    )
}
export default ModalCria