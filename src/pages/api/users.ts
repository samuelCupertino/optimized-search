import type { NextApiRequest, NextApiResponse } from 'next'
import USERS from '@/src/data/users.json'

type IUser = {
  id: string
  avatar: string
  name: string
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const name = (req.query.name as string) ?? ''
    const users = await getUsers(name)
    return res.status(200).json(users)
  }

  res.status(405).json({ message: 'Method not allowed' })
}

const getUsers = async (name: string): Promise<IUser[]> => {
  const searchName = name.toLowerCase()
  const results = USERS

  const filterUsersBySearchName = (users: IUser[], searchName: string) => {
    if (!searchName) return users

    const filteredUsers = users.filter((user: Record<string, any>) => {
      return user.name.toLowerCase().includes(searchName)
    })

    return filteredUsers
  }
  const sortUsersBySearchName = (users: IUser[], searchName: string) => {
    if (!searchName) return users

    const orderedUsers = users.sort(({ name: nameA }, { name: nameB }) => {
      const indexOfA = nameA.toLowerCase().indexOf(searchName)
      const indexOfB = nameB.toLowerCase().indexOf(searchName)

      return indexOfA - indexOfB || nameA.localeCompare(nameB)
    })

    return orderedUsers
  }

  const filteredUsers = filterUsersBySearchName(results, searchName)
  const orderedUsers = sortUsersBySearchName(filteredUsers, searchName)

  return orderedUsers
}
