import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { useRef } from 'react'


const BtSenhaMostra = props => {
    const { inputSenha } = props
    const i = useRef()
    const btMostra = useRef()


    return (
        <button ref={btMostra} className='btn'
            onClick={(evento) => {
                if (inputSenha.current.type == 'text') {
                    inputSenha.current.type = 'password';
                    i.current.className = 'text-amarelo-flore bi bi-eye-fill';
                    return
                }

                inputSenha.current.type = 'text';
                i.current.className = 'text-amarelo-flore bi bi-eye-slash-fill';
            }}
        >
            <i ref={i} className="text-amarelo-flore bi bi-eye-fill" ></i>
        </button>

    )
}

export default BtSenhaMostra
