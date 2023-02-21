import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from '@/styles/components/CompetitionImg.module.css'
import { poppins } from 'utils'

const Swal = withReactContent(swal)

const CompetitionImg = ({ id, author, classroom, src, fontClass }) => {
    const onClick = () => {
        Swal.fire({
            title: <span className={poppins.className}>Vérifie qui tu es</span>,
            html: <span className={poppins.className}>Écrivez votre email institutionnel.</span>,
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
            preConfirm: (email) => {
                //Validate if textbox is empty.
                if (!email || email.length === 0) {
                    Swal.showValidationMessage(`E-mail invalide!`)
                }

                //Validate if email is invalid.
                const regEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
                if (!regEmail.exec(email)) {
                    Swal.showValidationMessage(`E-mail invalide!`)
                }

                //Validate is email come from La Salle domain.
                const emailSplitted = email.split('@').pop()
                let parts = emailSplitted.split('.')
                const emailDomain = parts.slice(-3).join('.')

                if (emailDomain !== 'delasallesantiago.edu.do') {
                    Swal.showValidationMessage(`E-mail invalide!`)
                }
            },
        })
    }
    return (
        <img
            onClick={onClick}
            style={{ width: '100% !important', height: 'auto' }}
            className={styles.competition_image}
            src={src}
            alt={`${author} | ${classroom}`}
        />
    )
}

export default CompetitionImg
