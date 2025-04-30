import { create } from "zustand"
import { User } from "./types"

interface UserState {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}))

export default useUserStore
