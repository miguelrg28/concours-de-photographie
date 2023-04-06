import dbConnect from 'utils/dbConnect'
import User from 'utils/models/User'

dbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const voters = await User.find({ verified: true })

                res.status(200).json({ message: 'success!', voters })
            } catch (err) {
                console.log(err)
                return res.status(500)
            }
            break
    }
}
