import { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
    {
        email: { type: String, lowercase: true, unique: true, required: true },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
)

export default models.User || model('User', UserSchema)
