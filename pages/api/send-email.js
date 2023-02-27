import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import dbConnect from 'utils/dbConnect'
import User from 'utils/models/User'
import Picture from 'utils/models/Picture'

dbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { id, email } = req.body

            if (!id || id.length <= 0) {
                return res.status(400).json({ error: 'Invalid id.' })
            }

            //* Email validation
            if (!email || email.length === 0) {
                return res.status(400).json({ error: 'Invalid email.' })
            }

            //Validate if email is invalid.
            const regEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            if (!regEmail.exec(email)) {
                return res.status(400).json({ error: 'Invalid email.' })
            }

            //Validate is email come from La Salle domain.
            const emailSplitted = email.split('@').pop()
            let parts = emailSplitted.split('.')
            const emailDomain = parts.slice(-3).join('.')

            if (emailDomain !== 'delasallesantiago.edu.do') {
                return res.status(400).json({ error: 'Invalid email.' })
            }

            //* Picture
            const pictureFound = await Picture.findById(id)

            if (!pictureFound) {
                return res.status(404).json({ error: 'Picture not found!' })
            }

            //* User creation
            const newUser = new User({
                email,
            })

            await newUser.save()

            //* Sending the email
            const readHTMLFile = function (path, callback) {
                fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, html)
                    }
                })
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            })

            const htmlDirectory = path.join(process.cwd(), 'public')

            try {
                const userFound = await User.findOne({ email })

                readHTMLFile(htmlDirectory + '/emailTemplate.html', function (err, html) {
                    if (err) {
                        console.log('error reading file', err)
                        return
                    }
                    var template = handlebars.compile(html)

                    //Variables del HTML a reemplazar
                    var replacements = {
                        email: email,
                        concourseIMG: pictureFound.imgURL,
                        verifyLink: `https://concours-de-photographie.vercel.app/verify-email?id=${userFound._id.toString()}&voteId=${id}`,
                        author: pictureFound.author,
                        classRoom: pictureFound.classRoom,
                    }
                    var htmlToSend = template(replacements)
                    var mailOptions = {
                        from: 'miguelrodriguez@estudiantes.delasallesantiago.edu.do',
                        to: email,
                        subject: `Vérification de l'E-mail | Concours de photographie 2023`,
                        html: htmlToSend,
                    }

                    transporter.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error)
                        }

                        if (response) {
                            return res.status(200).json({ message: 'Sent!' })
                        }
                    })
                })
            } catch (err) {
                console.error(err)
            }
            break
        default:
            return res.status(404).json({ message: 'Not found!' })
    }
}
