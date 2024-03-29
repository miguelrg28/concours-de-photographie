import styles from '@/styles/components/Layout.module.css'
import Image from 'next/image'
import LogoOIF from '../../public/img/logos/OIF.png'
import LogoSalle from '../../public/img/logos/salle.png'
import Head from 'next/head'
import { poppins } from 'utils'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Concours de photographie | 2023</title>
            <meta
                name="description"
                content="Concours de photographie 2023 | Francophonie au Collège De La Salle."
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.background}> </div>

        <div className={styles.general_contaiener}>
            <div className={`${poppins.className} ${styles.layout}`}>
                <header>
                    <div className={styles.logo_container}>
                        <a href="https://www.francophonie.org/">
                            <Image
                                width={160}
                                src={LogoOIF}
                                alt="Organisation Internationale De la francophonie"
                            />
                        </a>
                        <a href="https://delasallesantiago.edu.do/">
                            <Image
                                width={150}
                                src={LogoSalle}
                                alt="Colegio De La Salle de Santiago, República Dominicana"
                            />
                        </a>
                    </div>
                    <section>
                        <span>Concours de photographie | 2023</span>
                        <p>
                            Votez pour votre photo préférée au Concours photo de la Francophonie
                            <br /> <br />
                            <strong>Thème du concours:</strong> représentation de la France en
                            République Dominicaine.
                            <br /> <strong>Tema del concurso:</strong> representación de Francia en
                            República Dominicana.
                        </p>
                    </section>
                </header>
                {children}
                <footer></footer>
            </div>
        </div>
    </>
)

export default Layout
