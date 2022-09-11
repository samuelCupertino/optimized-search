import { IUser } from '@/src/lib/interfaces'

export interface IFetchUsersProps {
  name?: string
  email?: string
  length?: number
}

export interface IStoreUserProps {
  name: string
  email: string
  avatar: string
}

const defaultProps: IFetchUsersProps = {
  name: '',
  email: '',
  length: 10,
}

export const useUsers = () => {
  const storeUser = async (newUser: IStoreUserProps): Promise<IUser> => {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    const data = await response.json()

    if (response.status === 200) return data

    if (response.status === 422) {
      console.log(data)
    }
  }

  const fetchUsers = async ({
    name = '',
    email = '',
    length = 10,
  }: IFetchUsersProps = defaultProps): Promise<IUser[]> => {
    const params = new URLSearchParams({ name, email, length: String(length) })
    const response = await fetch(`http://localhost:3000/api/users?${params}`)
    const data = await response.json()

    if (!response.ok) throw new Error(response.statusText)

    return data
  }

  return { storeUser, fetchUsers }
}
