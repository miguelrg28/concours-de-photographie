import { useState, useEffect } from 'react'
import styles from '@/styles/components/Timer.module.css'

const Timer = () => {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const deadline = 'March, 13, 2023'

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now()

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((time / 1000 / 60) % 60))
        setSeconds(Math.floor((time / 1000) % 60))
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000)

        return () => clearInterval(interval)
    }, [])

    if (Date.now() > Date.parse(deadline)) return <></>
    else
        return (
            <>
                <div className={styles.timer} role="timer">
                    <div>
                        <p id="day">{days < 10 ? '0' + days : days}</p>
                        <span className={styles.text}>Days</span>
                    </div>
                    <div>
                        <p id="hour">{hours < 10 ? '0' + hours : hours}</p>
                        <span className={styles.text}>Hours</span>
                    </div>
                    <div>
                        <p id="minute">{minutes < 10 ? '0' + minutes : minutes}</p>
                        <span className={styles.text}>Minutes</span>
                    </div>
                    <div>
                        <p id="second">{seconds < 10 ? '0' + seconds : seconds}</p>
                        <span className={styles.text}>Seconds</span>
                    </div>
                </div>
            </>
        )
}

export default Timer
