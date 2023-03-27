import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { useState } from 'react'
import backend from '../services/backend'

const ModalExcloi = (props) => {
    const { obje, atualizaFixas } = props

    return (
        <div className="modal fade" id="modalExcloi" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-preto-fundo text-amarelo-flore">
                    <div className="modal-header">
                        <h5 className="modal-title">Deseja realmente excluir a Ficha: </h5>
                    </div>
                    <div className="modal-body">
                        <table className="table text-amarelo-flore">
                            <tbody>
                                <tr key={obje.id}>
                                    <th style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate'>{obje.dia}</th>
                                    <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate'>{obje.nome}</td>
                                    <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate'>{obje.obs}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer ">
                        <button type="button" className="btn  bg-amarelo-flore" data-bs-dismiss="modal">Não</button>
                        <button type="button" className="btn  bg-amarelo-flore" onClick={e => {
                            backend.delete(`fixa/${obje.id}`).then(res => {
                                atualizaFixas(Math.random())
                                const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modalExcloi'))
                                modal.hide()
                            })

                        }}>Sim</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalExcloi