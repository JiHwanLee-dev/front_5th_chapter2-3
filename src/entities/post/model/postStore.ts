import { create } from "zustand"
import { Post } from "./types"

interface PostState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
}))

export default usePostStore
