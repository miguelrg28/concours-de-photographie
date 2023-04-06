import styles from '@/styles/Home.module.css'
import axios from 'axios'

export async function getServerSideProps() {
    try {
        const { data } = await axios.get(`${process.env.API_URL}/voters`)
        return { props: { voters: data.voters } }
    } catch (err) {
        console.log(err)
    }
    return { props: { voters: [] } }
}

export default function Results({ voters }) {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.winners_container}>
                    <h2>Électeurs!</h2>
                    {voters.map((voter, i) => (
                        <div key={i} className={styles.voter}>
                            {voter.email}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
