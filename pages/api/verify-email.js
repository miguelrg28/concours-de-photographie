import dbConnect from 'utils/dbConnect'
import User from 'utils/models/User'
import Picture from 'utils/models/Picture'

dbConnect()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const { id, voteId } = req.body

                if (id.length <= 0 || id === '' || id === null) {
                    return res.status(404)
                }

                const userFound = await User.findById(id)

                if (userFound.verified === true) {
                    return res.status(400).json({ message: 'was-verify' })
                }

                await User.findByIdAndUpdate(id, { verified: true })

                await Picture.findByIdAndUpdate(voteId, {
                    $push: { votes: id },
                })

                res.status(200).json({ message: 'already-verify-voted' })
            } catch (err) {
                res.status(500).json({ error: 'Ha ocurrido un error.' })
            }

            break
        default:
            return res.status(404)
    }
}
