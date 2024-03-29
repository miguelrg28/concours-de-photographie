import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import CompetitionImg from '@/components/CompetitionImg'
import { poppins } from 'utils'
import axios from 'axios'
import Timer from '@/components/Timer'

export async function getServerSideProps() {
    try {
        const res = await axios.get(`${process.env.API_URL}/pictures`)

        return {
            props: { pictures: res.data.pictures },
        }
    } catch (err) {
        console.log(err)
    }

    return { props: { pictures: [] } }
}

export default function Home({ pictures }) {
    const [electionsStatus, setElectionsStatus] = useState(1)

    return (
        <>
            <main className={styles.main}>
                {electionsStatus === 1 && (
                    <div className={styles.image_list}>
                        {pictures.map(({ _id, author, classRoom, imgURL }, i) => (
                            <CompetitionImg
                                key={i}
                                id={_id}
                                author={author}
                                classRoom={classRoom}
                                imgURL={imgURL}
                                fontClass={poppins.className}
                            />
                        ))}
                    </div>
                )}

                {electionsStatus === 0 && (
                    <div className={styles.presentation_container}>
                        <span>Bientôt...</span>
                        <Timer />
                    </div>
                )}
            </main>
        </>
    )
}
