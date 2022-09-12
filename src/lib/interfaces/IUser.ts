export interface IUser {
  id: string
  avatar: string
  name: string
  email: string
}

export function isIUser(object: any): object is IUser {
  return (
    typeof object.id === 'string' &&
    typeof object.avatar === 'string' &&
    typeof object.name === 'string' &&
    typeof object.email === 'string'
  )
}

export default IUser
