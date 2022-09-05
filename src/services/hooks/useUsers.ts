import { IUser } from '@/src/lib/interfaces'

interface IFetchUsersProps {
  name?: string
  email?: string
  length?: number
}

const defaultProps: IFetchUsersProps = {
  name: '',
  email: '',
  length: 10,
}

export const useUsers = () => {
  const fetchUsers = async ({
    name = '',
    email = '',
    length = 10,
  }: IFetchUsersProps = defaultProps): Promise<IUser[]> => {
    const params = new URLSearchParams({ name, email, length: String(length) })
    const response = await fetch(`api/users?${params}`)
    const data = await response.json()

    if (!response.ok) throw new Error(response.statusText)

    return data
  }

  return { fetchUsers }
}
