import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { email } = req.body
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
                readHTMLFile(htmlDirectory + '/emailTemplate.html', function (err, html) {
                    if (err) {
                        console.log('error reading file', err)
                        return
                    }
                    var template = handlebars.compile(html)

                    //Variables del HTML a reemplazar
                    var replacements = {
                        email: email,
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
