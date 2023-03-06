import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import CompetitionImg from '@/components/CompetitionImg'
import { poppins } from 'utils'
import axios from 'axios'
import Winner from '@/components/Winner'
import Timer from '@/components/Timer'

export async function getServerSideProps() {
    const WINNERS_MOCK = [
        {
            fullName: 'Francisco Ricardo',
            classRoom: '6to B',
            profileImg:
                'https://lh3.googleusercontent.com/a-/ACB-R5S20zpIMsoCdOWLLZWgf7ZMx2RZ-xverMuNtYkk=s600-p-k-rw-no',
            picture: 'https://concours-de-photographie.vercel.app/examples/5.jpeg',
        },
        {
            fullName: 'Francisco Sosa',
            classRoom: '6to A',
            profileImg:
                'https://lh3.googleusercontent.com/a-/ACB-R5S20zpIMsoCdOWLLZWgf7ZMx2RZ-xverMuNtYkk=s600-p-k-rw-no',
            picture: 'https://concours-de-photographie.vercel.app/examples/5.jpeg',
        },
        {
            fullName: 'Francisco Alvarez',
            classRoom: '6to B',
            profileImg:
                'https://lh3.googleusercontent.com/a-/ACB-R5S20zpIMsoCdOWLLZWgf7ZMx2RZ-xverMuNtYkk=s600-p-k-rw-no',
            picture: 'https://concours-de-photographie.vercel.app/examples/5.jpeg',
        },
    ]
    try {
        const res = await axios.get(`${process.env.API_URL}/pictures`)

        return {
            props: { pictures: res.data.pictures, winners: WINNERS_MOCK },
        }
    } catch (err) {
        console.log(err)
    }

    return { props: { pictures: [], winners: [] } }
}

export default function Home({ pictures, winners }) {
    const [electionsStatus, setElectionsStatus] = useState(0)

    return (
        <>
            <main className={styles.main}>
                {electionsStatus === 2 && (
                    <div className={styles.winners_container}>
                        <h2>Gagnants du concours !</h2>
                        {winners.map((winner, i) => (
                            <Winner
                                key={i}
                                position={i + 1}
                                fullName={winner.fullName}
                                classRoom={winner.classRoom}
                                picture={winner.picture}
                                profileImg={winner.profileImg}
                                reverse={(i + 1) % 2 === 0}
                            />
                        ))}
                    </div>
                )}
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
