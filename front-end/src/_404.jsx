import { useState, useRef } from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import { Routes, Route, Link, useNavigate, } from 'react-router-dom'
import App from './App'
import BtSenhaMostra from './componets/BtSenhaMostra'

const Erro = (props) => {
    return (
        <div className=' vh-100 w-100'>
           <marquee behavior="alternate" scorrlamount="300">
                <marquee className='vh-100' behavior="alternate" scorrlamount="300" direction="down">
                    <h1 className='text-amarelo-flore'>_____404_____     </h1>
                    <span className='text-amarelo-flore me-5'>Ops.. Não encontramos essa página!</span>
                </marquee>
            </marquee>
        </div>
    )
}

export default Erro
