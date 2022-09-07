import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/src/lib/interfaces'
import USERS from '@/src/data/users.json'

const delay = async (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('call api users')
  if (req.method === 'GET') {
    const name = String(req.query.name)
    const length = Number(req.query.length)

    const users = await getUsers({ name, length })
    await delay(5000)
    return res.status(200).json(users)
  }

  res.status(405).json({ message: 'Method not allowed' })
}

interface IGetUsersProps {
  name?: string
  email?: string
  length?: number
}
const getUsers = async ({
  name = '',
  length = 10,
}: IGetUsersProps): Promise<IUser[]> => {
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

  return orderedUsers.slice(0, length)
}
