import { create } from "zustand"
import { Post } from "./types"

interface SelectedPostStore {
  selectedPost: Post | null
  setSelectedPost: (selectedPost: Post | null) => void
}

export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (selectedPost: Post | null) => set({ selectedPost }),
}))

export default useSelectedPostStore
