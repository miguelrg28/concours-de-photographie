import Head from 'next/head'
import { useEffect } from 'react'
import axios from 'axios'
import { poppins } from 'utils'
import { useRouter } from 'next/router'

export default function VerifyEmail() {
    const router = useRouter()

    useEffect(() => {
        axios.post('/api/verify-email', { id: router.query.id }).then((res) => {
            if (res.status !== 200) {
                return alert('Hubo un error inesperado...')
            }

            alert('¡Correo verificado satisfactoriamente!')
            return router.push('/')
        })
    }, [])

    return (
        <>
            <main></main>
        </>
    )
}
