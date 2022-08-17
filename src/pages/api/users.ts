import type { NextApiRequest, NextApiResponse } from 'next'

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
    const name = req.query.name as string
    const users = await getUsers(name)
    return res.status(200).json({ data: users })
  }

  res.status(405).json({ message: 'Method not allowed' })
}


const getUsers = async (name:string):Promise<IUser[]> => {
  const usersRes = await fetch('https://randomuser.me/api/?inc=login,picture,name,email&results=5')
  const { results } = await usersRes.json()

  const searchName = name.toLowerCase()

  const filteredUsers = results.filter((user:Record<string, any>) => {
    const userFullName = `${user.name.first} ${user.name.last}`.toLowerCase()
    const matchName = userFullName.includes(searchName)
    return matchName
  })

  const formattedUsers:IUser[] = filteredUsers.map((user:Record<string, any>):IUser => ({
    id: user.login.uuid,
    avatar: user.picture.large,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email
  }))

  const sortedUsers = formattedUsers.sort((userA, userB) => {
    const indexA = userA.name.toLowerCase().indexOf(searchName)
    const indexB = userB.name.toLowerCase().indexOf(searchName)
    return indexA - indexB
  })

  return sortedUsers
}