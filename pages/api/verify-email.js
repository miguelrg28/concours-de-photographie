import dbConnect from 'utils/dbConnect'
import User from 'utils/models/User'

dbConnect()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { id } = req.body
            console.log(id)

            if (id.length <= 0 || id === '' || id === null) {
                return res.status(404)
            }

            try {
                await User.findByIdAndUpdate(id, { verified: true })

                res.status(200).json({ message: '¡Email validado!' })
            } catch (err) {
                console.error(err)
                res.status(400).json({ error: 'Ha ocurrido un error.' })
            }

            break
        default:
            return res.status(404)
    }
}
