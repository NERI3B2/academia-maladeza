import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import { useEffect, useState } from 'react'
import backend from '../services/backend'

const ModalVisualiza = (props) => {
    const { obj } = props

    const [listaExercicio, setListaExercicios] = useState([])


    useEffect(() => {
        if (obj) {
            backend.get(`exercicio/?fixa=${obj.id}`).then(res => {
                setListaExercicios(res.data)
            })
            return
        }
        // quando for destruído
    }, [obj])

    return (
        <div className="modal fade" id="modalVisualiza" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-preto-fundo text-amarelo-flore">
                    <div className="modal-header">
                        <h5 className="modal-title">Sua ficha possui os seguintes exercícios: ({obj.dia}) </h5>
                    </div>
                    <div className="modal-body">
                        <table className="table text-amarelo-flore">
                            <thead>
                                <tr>
                                    <th>Exercício</th>
                                    <th className='d-none d-md-table-cell'>Séries/Repetições</th>
                                    <th className='d-none d-md-table-cell'>Descanso</th>
                                    <th>Membro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaExercicio.map(
                                        e =>
                                            <tr key={e.id}>
                                                <th style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate'>{e.nome_exercicio}</th>
                                                <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate d-none d-md-table-cell'>{e.serie}</td>
                                                <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate d-none d-md-table-cell'>{e.descanso}</td>
                                                <td style={{ maxWidth: "55px", minWidth: "55px" }} className='text-truncate'>{
                                                e.parte_corpo && e.parte_corpo === "BR"?"Braço":
                                                 e.parte_corpo === "PE"?"Perna":
                                                 e.parte_corpo === "PT"?"Peito":
                                                 e.parte_corpo === "CT"?"Costas":
                                                 "Abdomem"}</td>
                                            </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer ">
                        <button type="button" className="btn  bg-amarelo-flore" data-bs-dismiss="modal" >Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalVisualiza