import config from '../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.uttilis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  return createdUser
}

export const UserService = {
  createUser,
}
