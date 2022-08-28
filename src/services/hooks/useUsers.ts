import { IUser } from '@/src/lib/interfaces'

interface IFetchUsersProps {
  name?: string
  email?: string
}

export const useUsers = () => {
  const fetchUsers = async ({
    name = '',
    email = '',
  }: IFetchUsersProps): Promise<IUser[]> => {
    const params = new URLSearchParams({ name, email })
    const response = await fetch(`api/users?${params}`)
    const data = await response.json()

    if (!response.ok) throw new Error(response.statusText)

    return data
  }

  return { fetchUsers }
}
