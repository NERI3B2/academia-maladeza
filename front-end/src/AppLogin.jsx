import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'

import { useState, useRef, useEffect } from 'react'

import { Routes, Route, Link, useNavigate, } from 'react-router-dom'

import BtSenhaMostra from './componets/BtSenhaMostra'
import backend from './services/backend'

function AppLogin() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const txtUsuario = useRef()
    const txtSenha = useRef()

    const navigate = useNavigate()


    const validarCampos = input => {
        if (input.value === "") { 
            alert("Você precisa preencher os campos: usuario e senha ");  
            return false                
        }    
        return true
    }

    return (
        <div className="container bg-preto-fundo ">
            <div className='vh-100 text-amarelo-flore'>
                <div className="row">
                    <div className="mb-2 pt-3">
                        <h3 className='text-center mt-5 '>Login</h3>
                        <hr />
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-3 mb-2 mb-md-0'>
                        <label htmlFor="nome" className="text-amarelo-flore">Usuário:</label>
                        <input ref={txtUsuario} type="text" className="col-lg-3 form-control" value={usuario}
                            onChange={evento => {
                                setUsuario(evento.target.value)
                            }} />
                    </div>
                </div>
                <div className='mt-2 row d-flex justify-content-center'>
                    <div className='col-lg-3'>
                        <label htmlFor="nome" className="text-amarelo-flore">Senha:</label>
                        <div className="input-group">
                            <input type="password" ref={txtSenha} value={senha}
                                onChange={evento => {
                                    setSenha(evento.target.value)
                                }} className=" rounded-end form-control" />
                            <BtSenhaMostra inputSenha={txtSenha} />
                        </div>
                        <Link to={"/cadastro/"} className='text-amarelo-flore' >É novo por aqui?</Link>
                    </div>
                </div>
                <div className="mt-2 row d-flex justify-content-center">
                    <button className="col-3 col-sm-2 btn bg-amarelo-flore"
                        onClick={async evento => {
                            await axios.post(`http://127.0.0.1:8000/api/v1/login/`, {
                                email: usuario,
                                username: usuario,
                                password: senha
                            }).then(res => {
                                sessionStorage.setItem('Token', res.data.token)
                                navigate('/piteroparker/')
                            }).catch(res => {
                                alert('Usuário ou Senha não existe!!')
                            })
                        }}>Entrar</button>
                </div>
            </div>
        </div>

    )
}

export default AppLogin
