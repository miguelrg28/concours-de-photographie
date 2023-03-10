import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from '@/styles/components/CompetitionImg.module.css'
import { poppins } from 'utils'
import axios from 'axios'

const Swal = withReactContent(swal)

const CompetitionImg = ({ id, author, classRoom, imgURL }) => {
    const onClick = () => {
        Swal.fire({
            title: <span className={poppins.className}>Vote</span>,
            html: <span className={poppins.className}>Voulez-vous voter pour cette photo?</span>,
            showCancelButton: true,
            confirmButtonText: 'Confirmer le vote',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isDismissed) {
                return
            }
            Swal.fire({
                title: <span className={poppins.className}>Vérifie qui tu es</span>,
                html: (
                    <span className={poppins.className}>Écrivez votre email institutionnel.</span>
                ),
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off',
                },
                customClass: {
                    validationMessage: poppins.className,
                },
                showCancelButton: true,
                confirmButtonText: 'Envoyer confirmation',
                cancelButtonText: 'Annuler',
                showLoaderOnConfirm: true,
                inputValidator: (email) => {
                    //Validate if textbox is empty.
                    if (!email || email.length === 0) {
                        Swal.showValidationMessage(`E-mail invalide!`)
                        return 'E-mail invalide!'
                    }

                    //Validate if email is invalid.
                    const regEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
                    if (!regEmail.exec(email)) {
                        Swal.showValidationMessage(`E-mail invalide!`)
                        return 'E-mail invalide!'
                    }

                    //Validate is email come from La Salle domain.
                    const emailSplitted = email.split('@').pop()
                    let parts = emailSplitted.split('.')
                    const emailDomain = parts.slice(-3).join('.')

                    if (emailDomain !== 'delasallesantiago.edu.do') {
                        Swal.showValidationMessage(`E-mail invalide!`)
                        return 'E-mail invalide!'
                    }

                    return false
                },
                preConfirm: async (email) => {
                    try {
                        const res = await axios.post('/api/send-email', { id, email })

                        if (res.status === 200) {
                            return Swal.fire({
                                icon: 'success',
                                html: (
                                    <>
                                        <p
                                            className={poppins.className}
                                        >{`L'email de vérification a été envoyé.`}</p>

                                        <span
                                            className={poppins.className}
                                            style={{ fontSize: '.8em' }}
                                        >
                                            Si no le llega su correo, revise su buzón de spam.
                                        </span>
                                    </>
                                ),
                            })
                        }
                    } catch (err) {
                        if (err.response.data.message === 'already-verified') {
                            return Swal.fire({
                                icon: 'error',
                                title: <span className={poppins.className}>Erreur!</span>,
                                html: <p className={poppins.className}>Vous avez déjà voté !</p>,
                            })
                        }

                        console.log(err)

                        return Swal.fire({
                            icon: 'error',
                            html: (
                                <p
                                    className={poppins.className}
                                >{`L'e-mail est en cours d'utilisation ou une erreur inattendue s'est produite.`}</p>
                            ),
                        })
                    }
                },
            })
        })
    }
    return (
        <img
            onClick={onClick}
            style={{ width: '100% !important', height: 'auto' }}
            className={styles.competition_image}
            src={imgURL}
            alt={`${author} | ${classRoom}`}
        />
    )
}

export default CompetitionImg
