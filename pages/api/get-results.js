import dbConnect from 'utils/dbConnect'
import Picture from 'utils/models/Picture'
import User from 'utils/models/User'

dbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const { please } = req.body

                if (!please) {
                    return res.status(400).json({ message: 'needed arguments' })
                }

                const Pictures = await Picture.find({}).select('author imgURL classRoom votes')

                const voteRes = [] //* Results for the client

                for (let i = 0; i < Pictures.length; i++) {
                    console.log(
                        `Author: ${Pictures[i].author}, voteCount: ${Pictures[i].votes.length}`
                    )

                    voteRes.push({
                        author: Pictures[i].author,
                        imgURL: Pictures[i].imgURL,
                        classRoom: Pictures[i].classRoom,
                        voteCount: Pictures[i].votes.length,
                    })
                    for (let x = 0; x < Pictures[i].votes.length; x++) {
                        const verifiedUser = await User.exists({ _id: Pictures[i].votes[x] })

                        if (!verifiedUser) {
                            console.log(`Corrupted vote: ${Pictures[i].votes[x]}`)
                            return res.status(400).json({ message: 'Corrupt data!' })
                        }

                        console.log(`Verified vote: ${Pictures[i].votes[x]}`)
                    }
                }

                console.log(voteRes)

                return res.status(200).json({ message: 'Success!', results: voteRes })
            } catch (err) {
                console.log(err)
                return res.status(500)
            }
    }
}
