import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import backend from '../services/backend';

import { useRef, useState } from 'react'


const ModalCadastro = (props) => {
    const [nomeExercicio, setNomeExercicio] = useState('')
    const [serieRepeticao, setSerieRepeticao] = useState('')
    const [descansoTempo, setDescansoTempo] = useState('')
    const [parteCorpo, setParteCorpo] = useState('')

    

    const nomeTreino = useRef()
    const serie = useRef()
    const descanso = useRef()
    const selectParteCorpo = useRef()


    const validarCampos = input => {
        if (input.value === "") {
            alert("Certifique-se de que preencheu os campos: Nome do treino e Dia da semana.");
            return false
        }

        return true
    }

    return (
        <div className="modal fade" id="modalCadastro" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content bg-preto-fundo">
                    <div className="modal-header text-amarelo-flore">
                        <h1 className="modal-title fs-5" >Cadastre seu exercício:</h1>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row mb-3">
                                <div className='col-lg-3 mb-2 mb-md-0'>
                                    <label htmlFor="nome" className="text-amarelo-flore">Nome do Exercício:</label>
                                    <input ref={nomeTreino} value={nomeExercicio} type="text" className="col-lg-3 form-control" onChange={evento =>
                                        setNomeExercicio(evento.target.value)
                                    } />
                                </div>
                                <div className='col-lg-3 mb-2 mb-md-0'>
                                    <label htmlFor="serieRep" className="text-amarelo-flore">Séries/Repetições:</label>
                                    <input ref={serie} value={serieRepeticao} type="text" className="col-lg-3 form-control" onChange={evento =>
                                        setSerieRepeticao(evento.target.value)
                                    } />

                                </div>
                                <div className='col-lg-3 mb-2 mb-md-0'>
                                    <label htmlFor="descanso" className="text-amarelo-flore">Tempo de Descanso:</label>
                                    <input ref={descanso} value={descansoTempo} type="text" className="col-lg-3 form-control" onChange={evento =>
                                        setDescansoTempo(evento.target.value)
                                    } />
                                </div>
                                <div className="col-lg-3 mb-2 mb-md-0">
                                    <span className='text-amarelo-flore'>Parte do corpo:</span>
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
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-amarelo-flore" data-bs-dismiss="modal"
                            onClick={evento => {
                                setNomeExercicio('')
                                setSerieRepeticao('')
                                setDescansoTempo('')
                                setParteCorpo('')
                            }}>Voltar</button>
                        <button type="button" className="btn bg-amarelo-flore" onClick={evento => {
                            
                            if (!validarCampos(selectParteCorpo.current) || !validarCampos(nomeTreino.current)) {
                                return
                            }
                            

                            backend.post(`exercicio/`, {
                                nome_exercicio: nomeExercicio,
                                serie: serieRepeticao,
                                descanso: descansoTempo,
                                parte_corpo: parteCorpo,
                               
                            }).then(res => {
                                setNomeExercicio('')
                                setSerieRepeticao('')
                                setDescansoTempo('')
                                setParteCorpo('')
                            })

                        }}>Cadastrar Exercício</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCadastro