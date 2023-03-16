import styles from '@/styles/Home.module.css'
import { poppins } from 'utils'
import axios from 'axios'
import Winner from '@/components/Winner'

export async function getServerSideProps() {
    try {
        const { data } = await axios.post(`${process.env.API_URL}/get-results`, { please: true })
        return { props: { winners: data } }
    } catch (err) {
        console.log(err)
    }
    return { props: { winners: [] } }
}

export default function Results({ winners }) {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.winners_container}>
                    <h2>Gagnants du concours !</h2>
                    {winners.map((winner, i) => (
                        <Winner
                            key={i}
                            position={i + 1}
                            fullName={winner.author}
                            classRoom={winner.classRoom}
                            picture={winner.imgURL}
                            reverse={(i + 1) % 2 === 0}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}
