import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      // eslint-disable-next-line no-undef
      set: (v: string | Buffer) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
    },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
