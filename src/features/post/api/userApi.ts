import { getMswUrl } from "../../../shared/constants/mswUrl"

export const fetchUsersApi = async () => {
  const res = await fetch(`${getMswUrl}/users?limit=0&select=username,image`)
  if (!res.ok) throw new Error("유저 불러오기 실패")
  return res.json() // { users: [...] }
}
