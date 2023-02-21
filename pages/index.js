import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import CompetitionImg from '@/components/CompetitionImg'
import { poppins } from 'utils'

export default function Home() {
    const COMPETITION_IMG_DATA_MOCK = [
        {
            id: 0,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/1.jpg',
        },
        {
            id: 1,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/2.jpeg',
        },
        {
            id: 2,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/3.jpg',
        },
        {
            id: 3,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/4.jpg',
        },
        {
            id: 4,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/5.jpeg',
        },
        {
            id: 5,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/6.jpeg',
        },
        {
            id: 6,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/4.jpg',
        },
        {
            id: 7,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/5.jpeg',
        },
        {
            id: 8,
            author: 'Emil Rodríguez',
            classroom: '6to B',
            src: '/examples/6.jpeg',
        },
    ]

    const elections = true
    return (
        <>
            <main className={styles.main}>
                {elections && (
                    <div className={styles.image_list}>
                        {COMPETITION_IMG_DATA_MOCK.map(({ id, author, classroom, src }, i) => (
                            <CompetitionImg
                                key={i}
                                id={id}
                                author={author}
                                classroom={classroom}
                                src={src}
                                fontClass={poppins.className}
                            />
                        ))}
                    </div>
                )}

                {elections === false && (
                    <div>
                        <span>Bientôt sur ce site!</span>
                    </div>
                )}
            </main>
        </>
    )
}
