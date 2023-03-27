import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

import { useState, useRef } from 'react'

import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import BtSenhaMostra from './componets/BtSenhaMostra'
import backend from './services/backend'

const AppCadastro = (props) => {
    const navigate = useNavigate()



    const [novoUsuario, setNovoUsuario] = useState()
    const [novaSenha, setNovaSenha] = useState()
    const [repitaSenha, setRepitaSenha] = useState()
    const txtNovoUsuario = useRef()
    const txtNovoSenha = useRef()
    const txtRepitaNovaSenha = useRef()

    const validarCampos = input => {
        if (input.value === "") {
            alert("Você precisa preencher os campos: usuario, senha e Repita a senha ");
            return false
        }
        return true
    }
    const validarSenhaIgual = () => {
        if (novaSenha !== repitaSenha) {
            alert("As senhas não se conhecidem");
            return false
        }
        return true
    }
    return (
        <div className="container bg-preto-fundo ">
            <div className='vh-100 text-amarelo-flore'>
                <div className="row">
                    <div className="mb-2 pt-3">
                        <h3 className='text-center mt-5 '>Cadastro</h3>
                        <hr />
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-lg-3 mb-2 mb-md-0'>
                        <label htmlFor="nome" className="text-amarelo-flore">Usuário:</label>
                        <input ref={txtNovoUsuario} type="text" className="col-lg-3 form-control" value={novoUsuario}
                            onChange={evento => {
                                setNovoUsuario(evento.target.value)
                            }} />
                    </div>
                </div>
                <div className='mt-2 row d-flex justify-content-center'>
                    <div className='col-lg-3'>
                        <label htmlFor="nome" className="text-amarelo-flore">Senha:</label>
                        <div className="input-group">
                            <input type="password" ref={txtNovoSenha} value={novaSenha}
                                onChange={evento => {
                                    setNovaSenha(evento.target.value)
                                }} className="rounded-end form-control" />
                            <BtSenhaMostra inputSenha={txtNovoSenha} />
                        </div>
                    </div>
                </div>
                <div className='mt-2 row d-flex justify-content-center'>
                    <div className='col-lg-3'>
                        <label htmlFor="nome" className="text-amarelo-flore">Confirme a Senha:</label>
                        <div className="input-group">
                            <input type="password" value={repitaSenha}
                                onChange={evento => {
                                    setRepitaSenha(evento.target.value)
                                }} ref={txtRepitaNovaSenha} className="rounded-end form-control" />
                            <BtSenhaMostra inputSenha={txtRepitaNovaSenha} />
                        </div>
                        <Link to={"/"} className='mt-1 text-amarelo-flore' >Voltar para tela de login?</Link>
                    </div>
                </div>
                <div className="mt-4 row d-flex justify-content-center">
                    <button className="col-5 col-sm-2 btn bg-amarelo-flore"
                        onClick={async evento => {
                            await backend.post(`usuarios/`, {
                                email: novoUsuario,
                                username:novoUsuario,
                                password: novaSenha
                            }).then(res => {
                                sessionStorage.setItem('Token', res.data.token)
                                setNovaSenha('')
                                setNovoUsuario('')
                                setRepitaSenha('')
                                if (!validarCampos(txtNovoUsuario.current) ||
                                    !validarCampos(txtNovoSenha.current) ||
                                    !validarCampos(txtRepitaNovaSenha.current) ||
                                    !validarSenhaIgual()) {
                                    return
                                } else {
                                    navigate('/piteroparker/')
                                }
                            }).catch(err => {
                                alert('Esse usuário já existe!')
                            })

                        }}>Cadastrar</button>
                </div>
            </div>
        </div>

    )
}

export default AppCadastro
