import { connect, set } from 'mongoose'

const connection = {}

async function dbConnect() {
    if (connection.isConnected) return

    set('strictQuery', true)
    const db = await connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )

    connection.isConnected = db.connections[0].readyState

    console.log(connection.isConnected)
}

export default dbConnect
