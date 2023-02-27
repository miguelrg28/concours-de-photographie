import { Schema, models, model } from 'mongoose'

const PictureSchema = new Schema(
    {
        author: { type: String, required: true },
        authorEmail: { type: String, lowercase: true, unique: true, required: true },
        imgURL: { type: String, unique: true, required: true },
        classRoom: { type: String, required: true },
        votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
)

export default models.Picture || model('Picture', PictureSchema)
