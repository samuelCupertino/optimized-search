interface IFetchUsersProps {
  name?: string
  email?: string
}

export const useUsers = () => {
  const fetchUsers = async (where: IFetchUsersProps) => {
    const params = new URLSearchParams({
      name: where.name ?? '',
      email: where.email ?? '',
    })
    const response = await fetch(`api/users?${params}`)
    const data = await response.json()

    if (!response.ok) throw new Error(response.statusText)

    return data
  }

  return { fetchUsers }
}
