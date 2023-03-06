import Image from 'next/image'
import styles from '@/styles/components/Winner.module.css'

const Winner = ({
    fullName = 'Fulano Detal',
    classRoom = '6to B',
    profileImg,
    picture,
    position,
    reverse,
}) => {
    return (
        <>
            <div className={`${styles.winner} ${reverse ? styles.reverse : ''}`}>
                <div className={styles.picture_container}>
                    <Image
                        src="https://concours-de-photographie.vercel.app/examples/5.jpeg"
                        fill
                        objectFit="contain"
                        objectPosition={reverse ? 'right' : 'left'}
                        alt={fullName}
                    ></Image>
                </div>
                <span
                    className={styles.position}
                    style={{ justifyContent: `${reverse ? 'flex-start' : 'flex-end'}` }}
                >
                    #{position}
                </span>
                <span className={styles.author}>
                    {fullName} | {classRoom}
                </span>
                <div className={styles.profile_container}>
                    <Image
                        src="https://lh3.googleusercontent.com/a-/ACB-R5S20zpIMsoCdOWLLZWgf7ZMx2RZ-xverMuNtYkk=s600-p-k-rw-no"
                        fill
                        objectFit="cover"
                        alt={fullName}
                    ></Image>
                </div>
            </div>
        </>
    )
}

export default Winner
