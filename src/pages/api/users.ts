import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/src/lib/interfaces'

const delay = async (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const name = String(req.query.name)
    const users = await getUsers({ name })

    await delay(2000)
    return res.status(200).json(users)
  }

  if (req.method === 'POST') {
    const newUser: Pick<IUser, 'avatar' | 'name' | 'email'> = req.body

    // if (!newUser.name || !newUser.email) {
    return res.status(422).json({
      ...(newUser.name
        ? {
            name: [
              'O campo nome é obrigatório.',
              'O campo nome é obrigatório.',
              'O campo nome é obrigatório.',
            ],
          }
        : {}),
      ...(newUser.email ? { email: ['O campo email é obrigatório.'] } : {}),
    })
    // }

    const userExists = await getUser({ email: newUser.email })
    if (userExists) {
      return res
        .status(422)
        .json({ email: ['Já existe um usuário com esse email.'] })
    }

    const users = await postUsers(newUser)
    return res.status(201).json(users)
  }

  res.status(405).json({ message: `Method ${req.method} not allowed.` })
}

const getUser = async ({
  name,
  email,
}: Pick<Partial<IUser>, 'name' | 'email'>): Promise<IUser> => {
  const params = new URLSearchParams({
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
    _limit: '1',
  }).toString()

  const response = await fetch(`http://localhost:3000/users?${params}`)
  const [results]: IUser[] = await response.json()

  return results
}

const getUsers = async ({
  name = '',
  email,
}: Pick<Partial<IUser>, 'name' | 'email'>): Promise<IUser[]> => {
  const params = new URLSearchParams({
    ...(name ? { name_like: name } : {}),
    ...(email ? { email_like: email } : {}),
    _sort: 'createdAt',
    _order: 'desc',
  }).toString()

  const response = await fetch(`http://localhost:3000/users?${params}`)
  const results: IUser[] = await response.json()

  const sortUsersBySearchName = (users: IUser[], searchName: string) => {
    if (!searchName) return users

    const orderedUsers = users.sort(({ name: nameA }, { name: nameB }) => {
      const indexOfA = nameA.toLowerCase().indexOf(searchName)
      const indexOfB = nameB.toLowerCase().indexOf(searchName)

      return indexOfA - indexOfB || nameA.localeCompare(nameB)
    })

    return orderedUsers
  }

  const searchName = name.toLowerCase()
  const orderedUsers = sortUsersBySearchName(results, searchName)

  return orderedUsers
}

const postUsers = async (newUser: Omit<IUser, 'id'>): Promise<IUser> => {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newUser,
      createdAt: new Date().toISOString(),
    }),
  })
  const data = await response.json()

  return data
}
