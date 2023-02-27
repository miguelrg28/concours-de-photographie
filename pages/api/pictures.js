import dbConnect from 'utils/dbConnect'
import Picture from 'utils/models/Picture'

dbConnect()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const { author, authorEmail, imgURL, classRoom } = req.body

                if (
                    author.length <= 0 ||
                    authorEmail.length <= 0 ||
                    imgURL.length <= 0 ||
                    classRoom.length <= 0
                ) {
                    return res.status(400).json('needed-arguments')
                }

                const newPicture = new Picture({
                    author,
                    authorEmail,
                    imgURL,
                    classRoom,
                })

                await newPicture.save()

                return res.status(200).json({ message: 'Picture saved!' })
            } catch (err) {
                console.log(err)
                return res.status(500)
            }
        case 'GET':
            try {
                const pictures = await Picture.find({})

                if (!pictures)
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay fotos para mostrar',
                    })

                return res.status(200).send({
                    status: 'success',
                    pictures,
                })
            } catch (err) {
                console.error(err)
                return res.status(500)
            }

        default:
            return res.status(404)
    }
}
