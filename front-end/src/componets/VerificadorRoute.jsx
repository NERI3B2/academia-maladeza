import { Route, Navigate, Outlet } from "react-router-dom"

const VerificadorRoute = () => {
    const logado = true
    return (
        <>
            {
                logado ? <Outlet /> : <Navigate to='/' />
            }
        </>
    )
}

export default VerificadorRoute