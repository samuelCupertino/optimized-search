import { IUser } from '@/src/lib/interfaces'

export interface IStoreUserError {
  status: number
  data: { [key in keyof IUser]?: string[] }
}

export const useUsers = () => {
  const storeUser = async (
    newUser: Omit<IUser, 'id'>
  ): Promise<IUser | IStoreUserError> => {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    const data = await response.json()

    if (!response.ok) {
      const error: IStoreUserError = {
        status: response.status,
        data,
      }
      throw error
    }

    return data
  }

  const fetchUsers = async ({
    name = '',
    email = '',
  }: Pick<Partial<IUser>, 'name' | 'email'> = {}): Promise<IUser[]> => {
    const params = new URLSearchParams({ name, email })
    const response = await fetch(`http://localhost:3000/api/users?${params}`)
    const data = await response.json()

    if (!response.ok) throw new Error(response.statusText)

    return data
  }

  return { storeUser, fetchUsers }
}
