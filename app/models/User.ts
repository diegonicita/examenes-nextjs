export type UserType = {
  id: number | null
  username: string | null
  email: string | null
  role: 'user-1' | 'user-2' | 'user-3' | 'admin' | null
  verify: number | null
}
