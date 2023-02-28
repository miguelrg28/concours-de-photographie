import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { poppins } from 'utils'

const Swal = withReactContent(swal)

export async function getServerSideProps({ query }) {
    return { props: { id: query.id, voteId: query.voteId } }
}

export default function VerifyEmail({ id, voteId }) {
    const router = useRouter()
    useEffect(() => {
        if (id.length <= 0 || id === '' || id === undefined) {
            return
        }

        if (voteId.length <= 0 || voteId === '' || voteId === undefined) {
            return
        }

        axios
            .post('/api/verify-email', { id, voteId })
            .then((res) => {

                if(res.status === 200 && res.data.message === 'already-verify-voted'){
                    Swal.fire({
                        icon: 'success',
                        title: <span className={poppins.className}>Vérifié !</span>,
                        html: (
                            <p className={poppins.className}>
                                Votre vote a été vérifié et enregistré avec succès !
                            </p>)
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: <span className={poppins.className}>Erreur!</span>,
                        html: <p className={poppins.className}>Quelque chose d'inattendu s'est produit !</p>,
                    })
                }

                }).then(() => {
                    router.push('/')
                })
            })
            .catch((err) => {
                if (err.response.data.message === 'was-verify') {
                    Swal.fire({
                        icon: 'error',
                        title: <span className={poppins.className}>Erreur!</span>,
                        html: <p className={poppins.className}>Cet E-mail est vérifié!</p>,
                    }).then(() => {
                        router.push('/')
                    })
                }
            })
    }, [])

    return <></>
}
