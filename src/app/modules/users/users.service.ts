import config from '../../config'
import { IUser } from './users.interface'
import { User } from './users.module'
import { generateUserId } from './users.utilities'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  return createdUser
}

export default {
  createUser,
}
